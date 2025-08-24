import { Button } from "@/components/ui/Button";
import { TimeSelect } from "@/components/ui/TimeSelect";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { injectScript } from "@/utils/chromeUtil";
import { MESSAGES } from "@/consts/messages";
import {
  clickRegisterButton,
  clickTodayIcon,
  inputWorkTime,
} from "@/utils/domUtil";

export const Popup = () => {
  // 開始・終了時刻のstate
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("19:00");

  // 登録処理中フラグのstate
  const [isRegistering, setIsRegistering] = useState(false);

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
   * 勤務時間を登録する処理
   */
  const registerWorkTime = async () => {
    // 詳細へ遷移をクリック、遷移後はURL変更を検知して勤務時間登録を行う
    injectScript(clickTodayIcon);
    // 登録処理中フラグを立てる
    setIsRegistering(true);
  };

  /**
   * URL変更時の処理を登録
   * リアクティブな値が更新されるたびに、リスナーを再設定する（最新の値を使用するため）
   */
  useEffect(() => {
    const handler = ({ type }: { type: string; url: string }) => {
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
    <Box sx={{ width: "300px", minHeight: "300px", p: 2 }}>
      <Stack spacing={2}>
        <Typography sx={{ fontSize: 14, color: "red" }}>
          {
            "カレンダーの画面を開いた状態で、「勤務時間を登録」ボタンを押してください！"
          }
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* <Button onClick={() => injectScript(clickTodayIcon)}>
          （試験）今日の詳細に遷移するボタン
        </Button> */}

        {/* 本日の月日 */}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {todayStr} の勤務時間
        </Typography>

        {/* 勤務時間入力 */}
        <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
          <TimeSelect value={startTime} onChange={setStartTime} />
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            ～
          </Typography>
          <TimeSelect value={endTime} onChange={setEndTime} />
        </Stack>

        <Button onClick={registerWorkTime}>勤務時間を登録</Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 12, color: "red" }}>
        {"TODO 1: 日付選択機能"}
      </Typography>
      <Typography sx={{ fontSize: 12, color: "red" }}>
        {"TODO 2: 日付範囲選択・連続登録機能"}
      </Typography>
      <Typography sx={{ fontSize: 12, color: "red" }}>
        {"TODO 3: 土日スキップ機能"}
      </Typography>
      <Typography sx={{ fontSize: 12, color: "red" }}>
        {"TODO 4: デフォルト時間をCookie等に保存"}
      </Typography>
      <Typography sx={{ fontSize: 12, color: "red" }}>
        {"TODO 5: 登録済みスキップ機能"}
      </Typography>
    </Box>
  );
};
