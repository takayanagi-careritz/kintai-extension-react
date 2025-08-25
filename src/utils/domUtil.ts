/**
 * 本日日付のアイコンをクリックする処理
 */
export const clickTodayIcon = () => {
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

/**
 * 指定日付のアイコンをクリックする処理
 * @param string "YYYY-MM-DD"
 */
export const clickDateIcon = (dateStr: string) => {
  // "YYYY-MM-DD"形式でないならエラー
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. expected 'YYYY-MM-DD'");
  }
  const dayStr = dateStr.split("-")[2];
  const trElements = [...document.getElementsByTagName("tr")];
  const targetTr = trElements.find((tr) => {
    const dateElement = tr.querySelector(".date");
    if (dateElement instanceof HTMLElement) {
      const formattedDate = dateElement.innerText.replace(/ /g, "");
      return formattedDate === dayStr;
    }
  });
  targetTr?.querySelector("a")?.click();
};

/**
 * 開始時刻、終了時刻を入力する処理
 * @param startTime 開始時刻
 * @param endTime 終了時刻
 */
export const inputWorkTime = (startTime: string, endTime: string) => {
  const startNameQuery = 'input[name="work[start_at_str]"]';
  const endNameQuery = 'input[name="work[end_at_str]"]';

  const startInput = document.querySelector(startNameQuery);
  const endInput = document.querySelector(endNameQuery);

  if (startInput instanceof HTMLInputElement) {
    startInput.value = startTime;
  }
  if (endInput instanceof HTMLInputElement) {
    endInput.value = endTime;
  }
};

/**
 * 登録するボタンをクリックする処理
 */
export const clickRegisterButton = () => {
  const registerButton = document.querySelector('input[value="登録する"]');
  if (registerButton instanceof HTMLInputElement) {
    registerButton.click();
  }
};
