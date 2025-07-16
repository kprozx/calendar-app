import { loadEvents } from "./storage.js"; // 追加

export function sendAllEventsToForm() {
  const events = loadEvents();

  if (!events || events.length === 0) {
    alert("送信するイベントがありません！");
    return;
  }

  events.forEach((event) => {
    const title = event.title;
    const date = event.date || (event.start ? event.start.split("T")[0] : null); // 日付だけ取り出す
    const memo = event.location || event.extendedProps?.location || "場所未設定";

    sendEventToForm(title, date, memo);
  });

  alert("一括送信が完了しました！");
}

export function sendEventToForm(title, dateStr, memo) {
  const formUrl =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdvSUomhDDw6OtfceQdK5ux6p2kli9wXvl9fCKry6tlChnuBA/formResponse";
  const formData = new FormData();

  const [year, month, day] = dateStr.split("-");

  formData.append("entry.64834011", title); // タイトル
  formData.append("entry.871901049", memo); // メモ
  formData.append("entry.1304539431_year", year); // 年
  formData.append("entry.1304539431_month", month); // 月
  formData.append("entry.1304539431_day", day); // 日

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then(() => console.log("送信完了！"))
    .catch((err) => console.error("送信失敗:", err));
}
