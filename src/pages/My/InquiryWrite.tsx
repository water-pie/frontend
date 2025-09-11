import { useState } from 'react';
import * as S from 'styles/my/inquiryWrite';
import { Input } from 'components/Input/Input';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const InquiryWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    alert('문의가 등록되었습니다.');
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