import { Button } from "@/components/ui/Button";

export const Popup = () => {
  /**
   * クリックイベントハンドラ
   */
  const onClickToDetail = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabId = tabs[0].id;
      if (typeof currentTabId === "number") {
        chrome.scripting.executeScript({
          target: { tabId: currentTabId },
          func: clickTodayIcon,
        });
      }
    });
  };

  /**
   * 本日日付のアイコンをクリックする処理
   */
  const clickTodayIcon = () => {
    // 本日日付を2桁で取得（"01","02"..."31"）
    const today = new Date().getDate().toString().padStart(2, "0");

    const trElements = [...document.getElementsByTagName("tr")];
    const targetTr = trElements.find((tr) => {
      const dateElement = tr.querySelector(".date");
      if (dateElement instanceof HTMLElement) {
        const formattedDate = dateElement.innerText.replace(/ /g, "");
        return formattedDate === today;
      }
    });
    targetTr?.querySelector("a")?.click();
  };

  return (
    <div>
      <Button onClick={onClickToDetail}>今日の詳細に遷移するボタン</Button>
    </div>
  );
};
