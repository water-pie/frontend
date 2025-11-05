import { useState, useEffect } from 'react';
import * as S from 'styles/my/inquiryWrite';
import { Input } from 'components/Input/Input';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { createInquiry, getInquiryById, updateInquiry } from 'apis/inquires';
import useUserStore from 'store/useUserStore';

const InquiryWrite = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (location.state && location.state.inquiry) {
      const { inquiry } = location.state;
      setTitle(inquiry.title);
      setContent(inquiry.content);
    } else if (id && userInfo?.token) {
      // If navigating directly to /my/inquiry/write/:id without state
      const fetchInquiry = async () => {
        try {
          const response = await getInquiryById(Number(id), userInfo.token);
          if (response.status === "success" && response.data) {
            setTitle(response.data.title);
            setContent(response.data.content);
          }
        } catch (error) {
          console.error("Failed to fetch inquiry for editing:", error);
        }
      };
      fetchInquiry();
    }
  }, [id, location.state, userInfo?.token]);

  const handleSubmit = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      let response;
      if (id) {
        // Editing existing inquiry
        response = await updateInquiry(Number(id), { title, content }, userInfo.token);
      } else {
        // Creating new inquiry
        response = await createInquiry({ title, content }, userInfo.token);
      }

      if (response.status === "success") {
        alert(id ? '문의가 성공적으로 수정되었습니다.' : '문의가 성공적으로 등록되었습니다.');
        navigate(-1);
      } else {
        alert(`${id ? '문의 수정' : '문의 등록'} 실패: ${response.message}`);
      }
    } catch (error) {
      console.error(`${id ? '문의 수정' : '문의 등록'} 중 오류 발생:`, error);
      alert(`${id ? '문의 수정' : '문의 등록'} 중 오류가 발생했습니다.`);
    }
  };

  return (
    <S.InquiryWriteContainer>
      <S.Title>1:1 문의</S.Title>
      <S.FormGroup>
        <Input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </S.FormGroup>

      <S.MarkdownEditorContainer>
        <S.Toolbar>
          <S.ToolbarButton onClick={() => setContent(content + '**텍스트**')}>B</S.ToolbarButton>
          <S.ToolbarButton onClick={() => setContent(content + '*텍스트*')}>I</S.ToolbarButton>
          <S.ToolbarButton onClick={() => setContent(content + '~~텍스트~~')}>S</S.ToolbarButton>
          <S.ToolbarButton onClick={() => setContent(content + '<u>텍스트</u>')}>U</S.ToolbarButton> {/* Underline is not standard markdown, might need custom renderer */}
          <S.ToolbarButton onClick={() => setContent(content + '![alt text](image.jpg)')}>🖼️</S.ToolbarButton>
        </S.Toolbar>
        <S.Textarea
          placeholder="워터파이에 문의하고 싶은 내용을 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* Markdown Preview - optional, could be a separate section or toggle */}
        {/* <S.MarkdownPreview>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </S.MarkdownPreview> */}
      </S.MarkdownEditorContainer>

      <S.SubmitButton onClick={handleSubmit}>작성</S.SubmitButton>
    </S.InquiryWriteContainer>
  );
};

export default InquiryWrite;