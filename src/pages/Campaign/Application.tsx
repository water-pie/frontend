import { useState } from "react";
import * as S from "styles/campaign/application";
import { insta } from "utils/importing";
import WidgetNoticeImage from "assets/guideBlog.png";
import { useNavigate, useParams } from "react-router-dom";
import DaumPost from "components/Address/DaumPost";
import { applyExperienceApi } from "apis/experience";
import useUserStore from "store/useUserStore";

interface postCode {
  address : string,
}

export default function Application() {
  const { id } = useParams<{ id: string }>();
  const { userInfo } = useUserStore();
  const navigator = useNavigate();
  const [applicationText, setApplicationText] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [popup, setPopup] = useState(false);

  const [form, setForm] = useState<postCode>({
    address : '',
  });

  const handleComplete = () => {
    setPopup(!popup);
  };

  const handleApply = async () => {
    if (!id) {
      alert("캠페인 ID를 찾을 수 없습니다.");
      return;
    }
    if (!form.address) {
      alert("주소를 입력해주세요.");
      return ;
    }
    if (!detailAddress) {
      alert("상세 주소를 입력해주세요.");
      return ;
    }
    if (!term1 || !term2) {
      alert("필수 동의 사항에 체크해주세요.");
      return ;
    }

    try {
      const response = await applyExperienceApi(Number(id), {
        pitchText: applicationText,
      }, userInfo!.token);

      if (response.status === "success") {
        alert("신청이 완료되었습니다.");
        navigator("/");
      } else {
        alert(`신청 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("체험 신청 중 오류 발생:", error);
      alert("체험 신청 중 오류가 발생했습니다.");
    }
  };

  return (    <S.Wrapper>
      <S.LeftContent>
        <S.Title>체험단 신청</S.Title>

        <S.Section>
          <h2>신청 한마디 (선택)</h2>
          <p>신청 시 광고주가 참고할 수 있는 내용이 있다면 작성해 주세요.</p>
          <S.StyledTextarea
            placeholder="내용 입력"
            value={applicationText}
            onChange={(e) => setApplicationText(e.target.value)}
          />
        </S.Section>

        <S.Section>
          <h2>주소</h2>
          <S.AddressInputs>
            <S.AddressBox>
              <S.FullWidthInput
                type="text"
                name="address"
                placeholder="예) 판교역로 167, 분당 주공211, 분평동 123"
                value={form.address}
                disable={true}
              />
              <S.SearchButton
                onClick={handleComplete}
              >
                찾기
              </S.SearchButton>
            </S.AddressBox>
            <S.FullWidthInput
              type="text"
              name="detailAddress"
              placeholder="상세 주소를 입력해주세요."
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </S.AddressInputs>
        </S.Section>
        <S.Section>
          <S.NoticeBox>
            <h3>잠깐! 방문자 위젯 설정하셨나요?</h3>
            <p>
              방문자 위젯이 등록되지 않은 블로그는 방문자 수 확인이 불가능하며, 광고주에게 '알 수 없음'으로 표시되어 선정에 불이익이 있을 수 있습니다. 신청 전 방문자 위젯 등록을 권장드립니다.
            </p>
            <S.ImageNotice src={WidgetNoticeImage} alt="위젯 설정 안내" />
            <a>위젯 설정 방법 바로가기 &gt;</a>
          </S.NoticeBox>
        </S.Section>
      </S.LeftContent>

      <S.RightContent>
        <S.StickyCard>
          <S.CafeImage src="/card/card1.png" alt="캠페인 이미지" />
          <S.DetailRow>
            <img src={insta} alt="인스타그램" />
            <span>방문형</span>
          </S.DetailRow>
          <S.CampaignTitle>[충북] 컵빙수가 맛있는 동네 카페</S.CampaignTitle>
          <S.CampaignDescription>컵빙수 무료 제공</S.CampaignDescription>
          <S.Point>12,000P</S.Point>
          <S.CheckboxSection>
            <S.RightCheckboxWrapper>
              <input
                type="checkbox"
                id="terms1"
                checked={term1}
                onChange={() => setTerm1(!term1)}
              />
              <label htmlFor="terms1">체험단 유의사항, 개인정보 및 콘텐츠 제3자 제공, 저작물 이용에 동의합니다.</label>
            </S.RightCheckboxWrapper>
            <S.RightCheckboxWrapper>
              <input
                type="checkbox"
                id="terms2"
                checked={term2}
                onChange={() => setTerm2(!term2)}
              />
              <label htmlFor="terms2">체험단 미션을 모두 확인했습니다.</label>
            </S.RightCheckboxWrapper>
          </S.CheckboxSection>
          <S.ApplyButton onClick={handleApply}>신청하기</S.ApplyButton>
        </S.StickyCard>
      </S.RightContent>

      {popup && <DaumPost address={form} setAddress = {setForm} handleComplete={handleComplete}/>}
    </S.Wrapper>
  );
};