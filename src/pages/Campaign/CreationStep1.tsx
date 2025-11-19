import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";
import { useRef } from "react";
import { formatPhoneNumber } from "utils/formatters";

const CampaignCreationStep1Page = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 1;
  const navigate = useNavigate();
  const { company_name, manager_call_num, president_image, images, title, set } = useCampaignCreationStore();

  const presidentImageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const handlePresidentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      set({ president_image: e.target.files[0] });
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      set({ images: [...images, ...newImages].slice(0, 5) }); // Limit to 5 images
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    set({ images: images.filter((_, index) => index !== indexToRemove) });
  };

  const canProceed = (
    company_name.trim() !== '' &&
    manager_call_num.trim() !== '' &&
    title.trim() !== '' &&
    president_image !== null
  );

  const handleNextStep = () => {
    if (canProceed) {
      navigate("/campaign/creation/step2");
    } else {
      alert("필수 정보를 모두 입력하고 대표 사진을 등록해주세요.");
    }
  };

  return (
    <S.Wrapper>
      <S.LeftPanel>
        <h2>캠페인 등록</h2>
        <S.StepIndicator>
          {steps.map((step) => (
            <S.StepItem key={step.id} active={step.id === activeStep} completed={step.id < activeStep}>
              <S.StepCircle active={step.id === activeStep} completed={step.id < activeStep}>
                {step.id < activeStep ? "✓" : step.id}
              </S.StepCircle>
              <S.StepLabel active={step.id === activeStep}>{step.label}</S.StepLabel>
            </S.StepItem>
          ))}
        </S.StepIndicator>
      </S.LeftPanel>
      <S.RightPanel>
        <S.FormSection>
          <h3>대표 사진 등록 *</h3>
          <p>해당 체험단에 맞는 대표 사진을 업로드 해주세요.</p>
          <p>사이즈 : 300 X 400 이상 / 파일 형식 : PNG, JPG</p>
          <S.ImageUploadArea onClick={() => !president_image && presidentImageRef.current?.click()}>
            {president_image ? (
              <S.ImagePreviewItem>
                <S.ImagePreview src={URL.createObjectURL(president_image)} alt="대표 이미지" />
                <S.RemoveImageButton onClick={() => set({ president_image: null })}>X</S.RemoveImageButton>
              </S.ImagePreviewItem>
            ) : (
              <span>사진 등록</span>
            )}
          </S.ImageUploadArea>
          <input type="file" ref={presidentImageRef} onChange={handlePresidentImageChange} style={{ display: "none" }} accept="image/png, image/jpeg" />
        </S.FormSection>

        <S.FormSection>
          <h3>추가 사진 등록 (선택)</h3>
          <p>체험단에 대한 추가 사진을 업로드 해주세요. (최대 5개)</p>
          <S.ImageUploadArea onClick={() => imagesRef.current?.click()}>
            <span>{images.length > 0 ? `${images.length}개 사진 선택됨` : "사진 등록"}</span>
          </S.ImageUploadArea>
          <input type="file" ref={imagesRef} onChange={handleImagesChange} style={{ display: "none" }} accept="image/png, image/jpeg" multiple />
          {images.length > 0 && (
            <S.ImagePreviewContainer>
              {images.map((image, index) => (
                <S.ImagePreviewItem key={index}>
                  <S.ImagePreview src={URL.createObjectURL(image)} alt={`추가 이미지 ${index + 1}`} />
                  <S.RemoveImageButton onClick={() => handleRemoveImage(index)}>X</S.RemoveImageButton>
                </S.ImagePreviewItem>
              ))}
            </S.ImagePreviewContainer>
          )}
        </S.FormSection>

        <S.FormSection>
          <h3>캠페인 제목 *</h3>
          <Input placeholder="캠페인 제목을 입력해주세요." value={title} onChange={(e) => set({ title: e.target.value })} />
        </S.FormSection>

        <S.FormSection>
          <h3>상호명 *</h3>
          <Input placeholder="매장의 경우 네이버 플레이스 등록 기준으로 입력해주세요." value={company_name} onChange={(e) => set({ company_name: e.target.value })} />
        </S.FormSection>

        <S.FormSection>
          <h3>담당자 연락처 *</h3>
          <Input
            placeholder="예) 010-1234-5678"
            value={manager_call_num}
            onChange={(e) => set({ manager_call_num: formatPhoneNumber(e.target.value) })}
            maxLength={13}
          />
        </S.FormSection>

        <S.ButtonGroup>
          <S.SubmitButton onClick={handleNextStep}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep1Page;