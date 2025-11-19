import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure container fills the viewport height */

  @media (max-width: 480px) {
    padding-bottom: 60px; /* Make space for the fixed bottom navigation bar */
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
`;