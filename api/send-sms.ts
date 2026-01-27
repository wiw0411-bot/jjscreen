
// 이 파일은 서버에서만 실행되는 코드로, 고객에게는 보이지 않습니다.
// 사장님의 솔라피(Solapi) API 정보를 안전하게 사용하여 문자 발송을 처리합니다.

export const config = {
  runtime: 'edge',
};

// Solapi API 인증을 위한 HMAC-SHA256 시그니처 생성 함수 (Web Crypto API 사용)
async function getSolapiSignature(apiSecret: string, date: string, salt: string): Promise<string> {
    const message = date + salt;
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(apiSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
    // ArrayBuffer를 hex 문자열로 변환
    return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}


export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'POST 메서드만 허용됩니다.' }), { status: 405 });
  }

  try {
    const { to, message } = await req.json();

    if (!to || !message) {
      return new Response(JSON.stringify({ message: '수신자 번호와 메시지 내용은 필수입니다.' }), { status: 400 });
    }

    // --- Vercel 환경 변수에서 Solapi API 정보 불러오기 ---
    const apiKey = process.env.SOLAPI_API_KEY;
    const apiSecret = process.env.SOLAPI_API_SECRET;
    const sender = process.env.SOLAPI_SENDER_NUMBER;

    if (!apiKey || !apiSecret || !sender) {
      console.error('환경 변수에 Solapi 정보가 설정되지 않았습니다.');
      return new Response(JSON.stringify({ message: '서버 설정 오류: Vercel 환경변수(SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER_NUMBER)가 설정되지 않았습니다.' }), { status: 500 });
    }

    const date = new Date().toISOString();
    const salt = crypto.randomUUID().replace(/-/g, '');
    const signature = await getSolapiSignature(apiSecret, date, salt);
    
    const authorizationHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

    const response = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Authorization': authorizationHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          to: to.replace(/-/g, ''),
          from: sender.replace(/-/g, ''),
          text: message,
          // Solapi는 문자 길이에 따라 SMS/LMS/MMS를 자동으로 결정합니다.
        },
      }),
    });

    const result = await response.json();

    // Solapi 성공 코드 '2000' 확인
    if (response.ok && result.statusCode === '2000') {
      return new Response(JSON.stringify({ success: true, message: '문자가 성공적으로 발송되었습니다.' }), { status: 200 });
    } else {
      console.error('Solapi API Error:', result);
      const errorMessage = result.statusMessage || '문자 발송에 실패했습니다. 관리자에게 문의해주세요.';
      return new Response(JSON.stringify({ success: false, message: errorMessage }), { status: response.status });
    }

  } catch (error) {
    console.error('SMS 발송 중 서버 오류 발생:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ message: `내부 서버 오류가 발생했습니다: ${errorMessage}` }), { status: 500 });
  }
};
