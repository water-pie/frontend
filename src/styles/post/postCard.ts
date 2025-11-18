import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { borderColor2, textColor } from "../common"

export const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 15px 40px; /* Default padding */
  border: 1px solid ${borderColor2};
  box-sizing: border-box; /* Ensure padding is included in width */

  @media (max-width: 768px) {
    padding: 10px 20px; /* Reduce padding for tablet/mobile */
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack title and info vertically */
    align-items: flex-start; /* Align items to start when stacked */
    padding: 10px 15px; /* Further reduce padding for small mobile */
    gap: 5px; /* Add a small gap between stacked items */
  }
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${textColor};
  white-space: nowrap; /* Prevent title from wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Show ellipsis for hidden text */
  flex-shrink: 1; /* Allow title to shrink */

  @media (max-width: 480px) {
    font-size: 14px; /* Reduce font size for small mobile */
  }
`

export const Info = styled.div`
  display: flex;
  gap: 50px; /* Default gap */
  flex-shrink: 0; /* Prevent info from shrinking too much */

  @media (max-width: 768px) {
    gap: 20px; /* Reduce gap for tablet/mobile */
  }

  @media (max-width: 480px) {
    gap: 10px; /* Further reduce gap for small mobile */
    flex-direction: column; /* Stack created and watch vertically */
    align-items: flex-start;
  }
`

export const Created = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${borderColor2};

  @media (max-width: 480px) {
    font-size: 12px; /* Reduce font size for small mobile */
  }
`

export const Watch = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${borderColor2};

  @media (max-width: 480px) {
    font-size: 12px; /* Reduce font size for small mobile */
  }
`