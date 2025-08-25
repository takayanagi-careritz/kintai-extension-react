import React from "react";
import { Select, MenuItem } from "@mui/material";

type TimeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

// 00:00から23:45まで15分刻みの時刻配列を生成
const times: string[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    const hour = h.toString().padStart(2, "0");
    const minute = m.toString().padStart(2, "0");
    times.push(`${hour}:${minute}`);
  }
}

export const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 120, height: 40 }}
    >
      {times.map((time) => (
        <MenuItem key={time} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  );
};
