// メッセージ（chromeへの命令、リクエスト）の型を定義
import { MESSAGES } from "@/consts/messages";

export type UrlChangedMessage = {
  type: typeof MESSAGES.URL_CHANGED;
  url?: string;
};
