import { useState } from "react";
import styled from "styled-components";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import BasicDateCalendar from "../../components/BasicDateCalendar";
import dayjs from "dayjs";
import Dropdown from "../../components/DropDown";

const AdminHome = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [isStatusSelectOpen, setIsStatusSelectOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isModeSelectOpen, setIsModeSelectOpen] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    setIsDatePickerOpen(true);
  };

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
    setSelectedMode(null);
    setIsDatePickerOpen(false);
    setIsStatusSelectOpen(false);
    setIsModeSelectOpen(false);
  };

  return (
    <Container>
      <H1Custom>Dashboard</H1Custom>
      <HeaderWrapper>
        <FilterAltOutlinedIcon sx={{ ml: 0.5 }} />
        <FilterName>Filter By</FilterName>

        <Filter>
          <FilterItem onClick={toggleDatePicker}>
            <DateSpan
              isSelected={!!selectedDate}
              isOpacityReduced={isDatePickerOpen}
            >
              {selectedDate ? selectedDate.format("DD MMM YYYY") : "Start Date"}
            </DateSpan>
            <ExpandMoreOutlinedIcon />
            {isDatePickerOpen && (
              <BasicDatePickerWrapper>
                <BasicDateCalendar
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </BasicDatePickerWrapper>
            )}
          </FilterItem>
        </Filter>

        <Dropdown
          label="Status"
          options={["draft", "ongoing"]}
          selectedValue={selectedStatus}
          onSelect={(value) => {
            setSelectedStatus(value);
            setIsStatusSelectOpen(true);
          }}
          isOpen={isStatusSelectOpen}
          toggleDropdown={() => setIsStatusSelectOpen((prev) => !prev)}
        />

        <Dropdown
          label="Mode"
          options={["practice", "test"]}
          selectedValue={selectedMode}
          onSelect={(value) => {
            setSelectedMode(value);
            setIsModeSelectOpen(true);
          }}
          isOpen={isModeSelectOpen}
          toggleDropdown={() => setIsModeSelectOpen((prev) => !prev)}
        />

        <ResetFilter onClick={resetFilters}>
          <ReplayOutlinedIcon fontSize="small" />
          <span>Reset Filters</span>
        </ResetFilter>
      </HeaderWrapper>
    </Container>
  );
};

export default AdminHome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  background-color: #f9f9f9;
  position: relative;
`;

const H1Custom = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  padding-right: 0;
  background-color: #fff;
  width: 100%;
  max-width: 680px;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
  border-right: 2px solid #d5d5d5;
`;

const FilterName = styled.span`
  color: #202224;
  border-left: 2px solid #d5d5d5;
  border-right: 2px solid #d5d5d5;
  margin: 0 12px;
  padding: 0 18px;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  margin-left: 10px;
  gap: 10px;
  cursor: pointer;
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  max-width: 120px;
`;

const DateSpan = styled.span<{
  isSelected: boolean;
  isOpacityReduced: boolean;
}>`
  font-size: ${({ isSelected }) => (isSelected ? "12px" : "16px")};
  font-weight: ${({ isSelected }) => (isSelected ? "700" : "500")};
  opacity: ${({ isOpacityReduced }) => (isOpacityReduced ? "0.5" : "1")};
`;

const ResetFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: red;
  margin-left: 10px;
  user-select: none;
  cursor: pointer;
  min-width: 100px;
  white-space: nowrap;
  &:hover {
    opacity: 0.8;
  }
`;

const BasicDatePickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  background: white;
  top: 30px;
  padding: 0 10px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
`;
