import { Button } from "@/components/ui/Button";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { injectScript } from "@/utils/chromeUtil";
import {
  clickRegisterButton,
  clickTodayIcon,
  inputWorkTime,
} from "@/utils/domUtil";

export const Popup = () => {
  // 開始・終了時刻のstate
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("19:00");

  /**
   * 本日の月日曜日（例: "8月24日(日)"）をリアクティブに生成
   */
  /* TODO: デフォルトの値はcookieから取得 */
  const todayStr = useMemo(() => {
    const now = new Date();
    return (
      `${now.getMonth() + 1}月` +
      `${now.getDate()}日` +
      `(${["日", "月", "火", "水", "木", "金", "土"][now.getDay()]})`
    );
  }, []);

  /**
   * 今日のアイコンをクリックする処理
   */
  const goToToday = () => {
    injectScript(clickTodayIcon);
  };

  /**
   * 勤務時間を登録する処理
   */
  const registerWorkTime = () => {
    injectScript(inputWorkTime, [startTime, endTime]);
    injectScript(clickRegisterButton);
  };

  return (
    <Box sx={{ width: "300px", height: "300px", p: 2 }}>
      <Stack spacing={2}>
        <Button onClick={goToToday}>（試験）今日の詳細に遷移するボタン</Button>

        <Divider />

        {/* 本日の月日 */}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {todayStr} の勤務時間
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
          <TimeSelect value={startTime} onChange={setStartTime} />
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            ～
          </Typography>
          <TimeSelect value={endTime} onChange={setEndTime} />
        </Stack>

        <Button onClick={registerWorkTime}>登録</Button>
      </Stack>
    </Box>
  );
};
