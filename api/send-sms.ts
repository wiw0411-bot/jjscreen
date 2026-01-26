
// 이 파일은 서버에서만 실행되는 코드로, 고객에게는 보이지 않습니다.
// 사장님의 카페24 API 정보를 안전하게 사용하여 문자 발송을 처리합니다.

export const config = {
  runtime: 'edge',
};

// 휴대폰 번호 형식(010-1234-5678)으로 변환하는 함수
function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      if (cleaned.startsWith('02')) {
          return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
      }
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return cleaned; // 10, 11자리가 아니면 그냥 반환
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

    // --- 배포 환경의 환경 변수에서 안전하게 API 정보 불러오기 ---
    const apiKey = process.env.CAFE24_API_KEY;
    const userId = process.env.CAFE24_USER_ID;
    const sender = '010-2846-9820'; // 카페24에 등록된 발신번호

    if (!apiKey || !userId) {
      console.error('환경 변수에 API 키 또는 사용자 ID가 설정되지 않았습니다.');
      return new Response(JSON.stringify({ message: '서버 설정 오류: API 정보가 누락되었습니다.' }), { status: 500 });
    }

    const senderParts = sender.split('-');
    if (senderParts.length !== 3) {
      console.error('발신번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
      return new Response(JSON.stringify({ message: '서버 설정 오류: 발신번호 형식 오류' }), { status: 500 });
    }
    
    // URLSearchParams 대신 수동으로 쿼리 문자열을 구성하여 인코딩 문제를 방지합니다.
    const bodyPayload = [
        `user_id=${encodeURIComponent(userId)}`,
        `secure=${encodeURIComponent(apiKey)}`,
        `sphone1=${encodeURIComponent(senderParts[0])}`,
        `sphone2=${encodeURIComponent(senderParts[1])}`,
        `sphone3=${encodeURIComponent(senderParts[2])}`,
        `rphone=${encodeURIComponent(formatPhoneNumber(to))}`,
        `msg=${encodeURIComponent(message)}`,
        'smsType=L', // LMS
        `subject=${encodeURIComponent('JJ방충망 견적 안내')}`
    ].join('&');


    // 카페24 SMS API 문서에 명시된 URL로 요청 보내기
    const apiResponse = await fetch('https://sslsms.cafe24.com/sms_sender.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyPayload,
    });

    const textResult = await apiResponse.text();
    
    // 카페24 응답 형식은 "resultcode=결과코드"와 같은 텍스트입니다.
    // 성공 시: success 또는 reserved
    // 실패 시: 음수 코드
    if (textResult.includes('success') || textResult.includes('reserved')) {
      return new Response(JSON.stringify({ success: true, message: '문자가 성공적으로 발송되었습니다.' }), { status: 200 });
    } else {
      console.error('Cafe24 API Error:', textResult);
      let errorMessage = `문자 발송에 실패했습니다. 관리자에게 문의해주세요. (응답: ${textResult})`;
      if (textResult.includes('-102')) {
        errorMessage = '인증 정보(API키 또는 아이디)가 올바르지 않습니다. Vercel 환경변수를 다시 확인해주세요.';
      } else if (textResult.includes('-114')) {
        errorMessage = '등록되지 않은 발신번호입니다. 카페24에서 발신번호를 등록해주세요.';
      } else if (textResult.includes('-201')) {
        errorMessage = '문자 잔여 건수가 부족합니다. 카페24에서 충전 후 다시 시도해주세요.';
      }
      return new Response(JSON.stringify({ success: false, message: errorMessage }), { status: 500 });
    }

  } catch (error) {
    console.error('SMS 발송 중 서버 오류 발생:', error);
    return new Response(JSON.stringify({ message: '내부 서버 오류가 발생했습니다.' }), { status: 500 });
  }
};
