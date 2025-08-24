/**
 * Chromeタブにてスクリプトを実行する関数
 *
 * 第一引数に実行したい関数、第二引数にその関数の引数を配列で渡す
 * そうしないと、関数内で外部変数を参照できない
 *
 * @param func 実行したい関数
 * @param args 関数の引数
 */
export const injectScript = <T extends unknown[]>(
  func: (...args: T) => void,
  args?: T
) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    if (typeof tabId === "number") {
      chrome.scripting.executeScript({ target: { tabId }, func, args });
    }
  });
};
