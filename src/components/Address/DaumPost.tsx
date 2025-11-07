import styled from "@emotion/styled";
import DaumPostcode from "react-daum-postcode"

const DaumPostBackground = styled.div`
  position :fixed;
  top : 0;
  left : 0;
  bottom : 0;
  right : 0;
  background : rgba(0, 0, 0, 0.8);
`

const DaumPostContainer = styled.div`
  width : 500px;
  position : absolute;
  left : 50%;
  top: 50%;
  transform : translate(-50%, -50%);
  z-index: 9999;
`

const CancelButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px gray solid;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`

export default function DaumPost(props : any){

  const complete = (data : any) =>{
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode)

    // 선택한 주소값을 상태값으로 설정
    props.setAddress({
      ...props.address,
      address:fullAddress,
    })

    // 팝업창 닫기(팝업창 'X' 표시)
    props.handleComplete();
  }
  return(
    <DaumPostBackground>
      <DaumPostContainer>
        <div style={{display : "flex", justifyContent : "space-between", alignItems: "center"}}>  
          <h1 style={{color : "#fff", height : "50px", width : "500px"}}>주소 검색</h1>
          <CancelButton onClick={()=> {props.handleComplete()}}>X</CancelButton>
        </div>
        <DaumPostcode
          autoClose
          style={{
          height : "500px", width : "500px"}}
          onComplete={complete} /> 
      </DaumPostContainer>   
    </DaumPostBackground>     
  )
}