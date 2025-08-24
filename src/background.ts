/**
 * 裏で動くスクリプトを記述するファイル
 */
import { MESSAGES } from "@/consts/messages";
import type { UrlChangedMessage } from "@/types/MessageTypes";

/**
 * タブのURLが変わったときに、UIコンポーネントに通知する
 */
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.runtime.sendMessage<UrlChangedMessage>({
      type: MESSAGES.URL_CHANGED,
      url: tab.url,
    });
  }
});
