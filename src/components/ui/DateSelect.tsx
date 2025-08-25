import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import "dayjs/locale/ja";

type DateSelectProps = {
  value: string; // "YYYY-MM-DD"形式
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const DateSelect: React.FC<DateSelectProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DatePicker
        open={open}
        onClose={() => setOpen(false)}
        value={value ? dayjs(value, "YYYY-MM-DD") : null}
        format="MM月DD日"
        onChange={(newValue: Dayjs | null) => {
          onChange(newValue ? newValue.format("YYYY-MM-DD") : "");
        }}
        slotProps={{
          textField: {
            size: "small",
            InputProps: { readOnly: true },
            onClick: () => !disabled && setOpen(true),
            onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.blur(),
            sx: { width: 120, height: 40 },
            disabled,
          },
          openPickerButton: { style: { display: "none" } },
          popper: {
            sx: {
              ".MuiPickersCalendarHeader-root": { display: "none" },
              ".MuiDateCalendar-root": { width: 250, height: 250 },
              ".MuiDayCalendar-weekContainer": { height: 30 },
              ".MuiButtonBase-root": { height: 30 },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
