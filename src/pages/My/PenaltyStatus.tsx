
import * as S from 'styles/my/penaltyStatus';

const PenaltyStatus = () => {
  const hasPenalties = false;

  return (
    <S.PenaltyStatusContainer>
      <S.Title>패널티 현황</S.Title>
      <S.Description>
        패널티 문의 또는 해제 요청 시 패널티 우측의 [문의하기] 버튼을 눌러 사유와 함께 증빙자료를 업로드해 주시면 빠른 시일 내에 확인하여 답변드리겠습니다.
      </S.Description>

      {hasPenalties ? (
        <div>패널티 목록</div>
      ) : (
        <S.NoPenaltyMessage>받은 패널티가 없습니다.</S.NoPenaltyMessage>
      )}
    </S.PenaltyStatusContainer>
  );
};

export default PenaltyStatus;