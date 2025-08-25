import { Button } from "@/components/ui/Button";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { injectScript } from "@/utils/chromeUtil";
import { MESSAGES } from "@/consts/messages";
import type { UrlChangedMessage } from "@/types/MessageTypes";
import {
  clickDateIcon,
  clickRegisterButton,
  inputWorkTime,
} from "@/utils/domUtil";
import { DateSelect } from "@/components/ui/DateSelect";
import { CalendarIcon, TimeIcon } from "@mui/x-date-pickers";

export const Popup = () => {
  // 日付のstate、"YYYY-MM-DD"形式
  const now = new Date();
  const [startDate, setStartDate] = useState(now.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(now.toISOString().slice(0, 10));

  // 開始・終了時刻のstate、"HH:MM"形式
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("19:00");

  // 登録処理中フラグのstate
  const [isRegistering, setIsRegistering] = useState(false);

  /** 本日の月日曜日（例: "8月24日(日)"）をリアクティブに生成 */
  const todayStr = useMemo(() => {
    const now = new Date();
    return (
      `${now.getMonth() + 1}月` +
      `${now.getDate()}日` +
      `(${["日", "月", "火", "水", "木", "金", "土"][now.getDay()]})`
    );
  }, []);

  /**
   * 勤務時間を登録する処理
   */
  const registerWorkTime = async () => {
    // 詳細へ遷移をクリック、遷移後はURL変更を検知して勤務時間登録を行う
    injectScript(clickDateIcon, [startDate]);
    // 登録処理中フラグを立てる
    setIsRegistering(true);
  };

  /**
   * URL変更時の処理を登録
   * リアクティブな値が更新されるたびに、リスナーを再設定する（最新の値を使用するため）
   */
  useEffect(() => {
    const handler = ({ type }: UrlChangedMessage) => {
      // URL変更通知を受け取ったとき かつ 登録処理中フラグが立っているとき
      if (type === MESSAGES.URL_CHANGED && isRegistering) {
        // 勤務時間を入力
        injectScript(inputWorkTime, [startTime, endTime]);
        // 登録ボタンをクリック
        injectScript(clickRegisterButton);
        // 登録処理中フラグを下ろす
        setIsRegistering(false);
      }
    };
    chrome.runtime.onMessage.addListener(handler);
    return () => chrome.runtime.onMessage.removeListener(handler);
  }, [startTime, endTime, isRegistering]);

  return (
    <Box sx={{ minWidth: "300px", minHeight: "300px", p: 2 }}>
      <Stack spacing={2}>
        <Typography sx={{ fontSize: 14, color: "red" }}>
          {"HRMOS勤怠の一覧画面で、「勤務時間を登録」ボタンを押してください！"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* 本日の月日 */}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {`今日の日付：${todayStr}`}
        </Typography>

        {/* 日付選択 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarIcon />
          <DateSelect value={startDate} onChange={setStartDate} />
          <Typography>{"〜"}</Typography>
          <DateSelect value={endDate} onChange={setEndDate} disabled />
        </Stack>

        {/* 勤務時間入力 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <TimeIcon />
          <TimeSelect value={startTime} onChange={setStartTime} />
          <Typography>{"〜"}</Typography>
          <TimeSelect value={endTime} onChange={setEndTime} />
        </Stack>

        <Button onClick={registerWorkTime}>{"勤務時間を登録"}</Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* TODO一覧 */}
      {[
        "コンポーネント分割",
        "デフォルト日を今日にする機能",
        "登録後スクロール機能",
        "日付範囲選択・連続登録機能",
        "土日スキップ機能",
        "デフォルト時間をCookie等に保存",
        "登録済みスキップ機能",
        "備考入力機能",
        "クリア機能",
        "詳細にいても機能するよう変更",
      ].map((todo, index) => (
        <Typography key={index} sx={{ fontSize: 12, color: "red" }}>
          {`TODO ${index + 1}: ${todo}`}
        </Typography>
      ))}
    </Box>
  );
};
