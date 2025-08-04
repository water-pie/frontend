import { useState } from "react";
import styled from "@emotion/styled";

const list = ["전체", "생활", "서비스", "유아", "식품", "디지털"];
const filter = ["블로그", "유튜브", "틱톡", "인스타그램"];
type Category = "전체" | "생활" | "서비스" | "유아" | "식품" | "디지털";

export const Categories = () => {
  const [listSelected, setListSelected] = useState<Category>("전체");
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  const handleFitler = (ele: string) => {
    if (filterSelected.includes(ele)) {
      setFilterSelected(filterSelected.filter(value => value !== ele));
    } else {
      setFilterSelected([...filterSelected, ele]);
    }
  }

  return (
    <Container>
      <CategoryBox>
        {list.map(ele => {
          return (
            <TextBox
              key={ele}
              onClick={() => setListSelected(ele as Category)}
              selected={listSelected === ele}
            >
              <span>
                {ele}
              </span>
            </TextBox>
          )
        })}
      </CategoryBox>
      <FilterBox>
        <SelectBox name="sorting">
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
          <option value="포인트순">포인트순</option>
          <option value="마감일순">마감일순</option>
        </SelectBox>
        {filter.map(ele => {
          return (
            <FilterTextBox
              key={ele}
              onClick={() => handleFitler(ele)}
              selected={filterSelected.includes(ele)}
            >
              <span>{ele}</span>
            </FilterTextBox>
          )
        })}
      </FilterBox>
    </Container>
  )
};

export default Categories;

const Container = styled.div`
  width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #AEAEAE;
`;

const TextBox = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: ${({ selected }) => selected ? "700" : "500"};
    color: ${({ selected }) => selected ? "#96d3ff" : "#656565"};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ selected }) => selected ? "#96d3ff" : "transparent"};
    transition: background-color 0.2s ease, height 0.2s ease;
  }
`;

const SelectBox = styled.select`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #656565;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #656565;
  background-color: white;
`;


const FilterBox = styled.div`
  display: flex;
  gap: 10px;
`

const FilterTextBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  font-size: 16px;
  font-weight: ${({ selected }) => selected ? "700" : "500"};
  border: 1px solid ${({ selected }) => selected ? "#96d3ff" : "#656565"};
  color: ${({ selected }) => selected ? "#96d3ff" : "#656565"};
  padding: 5px 10px;
  cursor: pointer;
`