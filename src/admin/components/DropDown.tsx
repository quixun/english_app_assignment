import styled from "styled-components";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

type DropdownProps = {
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
};

const Dropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  isOpen,
  toggleDropdown,
}: DropdownProps) => (
  <Filter>
    <FilterItem onClick={toggleDropdown}>
      <Span isSelected={selectedValue !== null}>{selectedValue || label}</Span>
      <ExpandMoreOutlinedIcon />
      {isOpen && (
        <DropdownWrapper>
          {options.map((option) => (
            <SubMenuItem key={option} onClick={() => onSelect(option)}>
              {option}
            </SubMenuItem>
          ))}
        </DropdownWrapper>
      )}
    </FilterItem>
  </Filter>
);

export default Dropdown;

const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
  border-right: 2px solid #d5d5d5;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  margin-left: 10px;
  gap: 10px;
  cursor: pointer;
  position: relative;
`;

const Span = styled.span<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? "700" : "500")};
`;

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  background: white;
  top: 30px;
  padding: 0;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
`;

const SubMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
