import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Dayjs } from "dayjs";

interface BasicDateCalendarProps {
  selectedDate: Dayjs | null;
  onDateChange: (newValue: Dayjs | null) => void;
}

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={onDateChange}
      />
    </LocalizationProvider>
  );
};

export default BasicDateCalendar;
