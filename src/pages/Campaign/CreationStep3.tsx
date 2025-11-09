import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "styles/campaign/creation";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const CampaignCreationStep3Page = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 3;
  const navigate = useNavigate();
  const {
    available_days,
    available_time_start,
    available_time_end,
    application_start_date,
    application_end_date,
    member_announcement_time,
    experience_start_date,
    experience_end_date,
    end_review_time,
    possible_visit_now,
    notices_to_visit,
    promotionType,
    set 
  } = useCampaignCreationStore();

  const handleDayChange = (day: string) => {
    const newDays = available_days.includes(day)
      ? available_days.filter((d) => d !== day)
      : [...available_days, day];
    set({ available_days: newDays });
  };

  const canProceed = (
    application_start_date &&
    application_end_date &&
    member_announcement_time &&
    experience_start_date &&
    experience_end_date &&
    end_review_time &&
    ((promotionType === "visiting" || promotionType === "take-out") ? (
      available_days.length > 0 &&
      available_time_start &&
      available_time_end &&
      notices_to_visit !== undefined && // Check if it's been touched, not necessarily filled
      possible_visit_now !== undefined // Check if it's been touched
    ) : true)
  );

  const handleNextStep = () => {
    if (canProceed) {
      navigate("/campaign/creation/step4");
    } else {
      alert("모든 필수 항목을 입력하거나 선택해주세요.");
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '30'];

  useEffect(() => {
    if (promotionType === "shipping" || promotionType === "purchase") {
      set({
        available_days: [],
        available_time_start: "",
        available_time_end: "",
        possible_visit_now: false,
        notices_to_visit: "",
      });
    }
  }, [promotionType, set]);

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
          <h3>체험단 신청 기간 *</h3>
          <S.DateGroup>
            <DatePicker
              selected={application_start_date ? new Date(application_start_date) : null}
              onChange={(date: Date | null) => set({ application_start_date: date ? formatDate(date) : '' })}
              dateFormat="yyyy-MM-dd"
              customInput={<S.DateInput />}
              minDate={new Date()}
            />
            <span>~</span>
            <DatePicker
              selected={application_end_date ? new Date(application_end_date) : null}
              onChange={(date: Date | null) => set({ application_end_date: date ? formatDate(date) : '' })}
              dateFormat="yyyy-MM-dd"
              customInput={<S.DateInput />}
              minDate={application_start_date ? new Date(application_start_date) : new Date()}
            />
          </S.DateGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>인플루언서 선정일 *</h3>
          <DatePicker
            selected={member_announcement_time ? new Date(member_announcement_time) : null}
            onChange={(date: Date | null) => set({ member_announcement_time: date ? formatDate(date) : '' })}
            dateFormat="yyyy-MM-dd"
            customInput={<S.DateInput />}
            minDate={application_end_date ? new Date(application_end_date) : new Date()}
          />
        </S.FormSection>

        <S.FormSection>
          <h3>체험단 진행 기간 *</h3>
          <S.DateGroup>
            <DatePicker
              selected={experience_start_date ? new Date(experience_start_date) : null}
              onChange={(date: Date | null) => set({ experience_start_date: date ? formatDate(date) : '' })}
              dateFormat="yyyy-MM-dd"
              customInput={<S.DateInput />}
              minDate={member_announcement_time ? new Date(member_announcement_time) : new Date()}
            />
            <span>~</span>
            <DatePicker
              selected={experience_end_date ? new Date(experience_end_date) : null}
              onChange={(date: Date | null) => set({ experience_end_date: date ? formatDate(date) : '' })}
              dateFormat="yyyy-MM-dd"
              customInput={<S.DateInput />}
              minDate={experience_start_date ? new Date(experience_start_date) : new Date()}
            />
          </S.DateGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>리뷰 마감일 *</h3>
          <DatePicker
            selected={end_review_time ? new Date(end_review_time) : null}
            onChange={(date: Date | null) => set({ end_review_time: date ? formatDate(date) : '' })}
            dateFormat="yyyy-MM-dd"
            customInput={<S.DateInput />}
            minDate={experience_end_date ? new Date(experience_end_date) : new Date()}
          />
        </S.FormSection>

        {(promotionType === "visiting" || promotionType === "take-out") && (
          <>
            <S.FormSection>
              <h3>체험 가능 요일 *</h3>
              <S.CheckboxGroup>
                {days.map((day) => (
                  <S.Checkbox key={day}>
                    <input type="checkbox" checked={available_days.includes(day)} onChange={() => handleDayChange(day)} />
                    <span>{day}</span>
                  </S.Checkbox>
                ))}
              </S.CheckboxGroup>
            </S.FormSection>

            <S.FormSection>
              <h3>체험 가능 시간 *</h3>
              <S.TimeInputGroup>
                <S.Select value={available_time_start.split(':')[0]} onChange={(e) => set({ available_time_start: `${e.target.value}:${available_time_start.split(':')[1] || '00'}` })}>
                  {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </S.Select>
                :
                <S.Select value={available_time_start.split(':')[1]} onChange={(e) => set({ available_time_start: `${available_time_start.split(':')[0] || '00'}:${e.target.value}` })}>
                  {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </S.Select>
                <span>~</span>
                <S.Select value={available_time_end.split(':')[0]} onChange={(e) => set({ available_time_end: `${e.target.value}:${available_time_end.split(':')[1] || '00'}` })}>
                  {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </S.Select>
                :
                <S.Select value={available_time_end.split(':')[1]} onChange={(e) => set({ available_time_end: `${available_time_end.split(':')[0] || '00'}:${e.target.value}` })}>
                  {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </S.Select>
              </S.TimeInputGroup>
            </S.FormSection>

            <S.FormSection>
              <h3>즉시 방문 가능 여부</h3>
              <S.Checkbox>
                <input
                  type="checkbox"
                  checked={possible_visit_now}
                  onChange={(e) => set({ possible_visit_now: e.target.checked })}
                />
                <span>즉시 방문 가능</span>
              </S.Checkbox>
            </S.FormSection>

            <S.FormSection>
              <h3>방문 안내사항</h3>
              <S.FullWidthTextarea
                placeholder="방문 시 유의사항을 입력해주세요."
                value={notices_to_visit}
                onChange={(e) => set({ notices_to_visit: e.target.value })}
              />
            </S.FormSection>
          </>
        )}

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step2")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={handleNextStep}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep3Page;