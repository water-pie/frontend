import styled from "@emotion/styled"

export default function NotFound() {
  return (
    <NotText>
      404 현재 페이지는 존재하지 않습니다.
    </NotText>
  )
};

const NotText = styled.span`
  font-size: 24px;
  font-weight: 600;
`