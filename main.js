import { saveEvents, loadEvents } from "./modules/storage.js";
import {
  handleEventClick,
  handleDateClick,
  showTooltip,
  hideTooltip,
  handleDateRangeSelect,
} from "./modules/calendarHandlers.js";
import { loadHolidays } from "./modules/loadHolidays.js";
import { setupSearch } from "./modules/setupSearch.js";
import { sendAllEventsToForm } from "./modules/sendEventToGAS.js";
import {
  initGoogleCalendarAPI,
  startGoogleLoginFlow,
  addGoogleCalendarEvent,
} from "./modules/googleApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  const savedEvents = loadEvents();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek", // ← 時間付きのビュー（重要）
    selectable: true, // ← 範囲選択を有効化
    select: handleDateRangeSelect, // ← この関数でモーダル開く
    locale: "ja",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: savedEvents,
    eventClick: (info) => handleEventClick(info, calendar),
    dateClick: (info) => handleDateClick(info, calendar),
    eventDrop: () => saveEvents(calendar),
    eventMouseEnter: showTooltip,
    eventMouseLeave: hideTooltip,
  });

  calendar.render();
  loadHolidays(calendar);
  setupSearch(calendar);

  const bulkSendBtn = document.getElementById("bulkSendBtn");
  if (bulkSendBtn) {
    bulkSendBtn.addEventListener("click", () => {
      sendAllEventsToForm();
    });
  }

  function renderCalendar(events) {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "ja",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek",
      },
      events: events,
    });

    calendar.render();
  }

  async function loadAndShowCalendarEvents() {
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.result.items.map((event) => ({
      title: event.summary || "(無題)",
      start: event.start.dateTime || event.start.date,
      end: event.end?.dateTime || event.end?.date,
      id: event.id,
      extendedProps: {
        description: event.description || "",
        location: event.location || "",
      },
    }));

    renderCalendar(events);
  }

  window.addEventListener("DOMContentLoaded", async () => {
    await initGoogleCalendarAPI();

    document.getElementById("loginButton").addEventListener("click", () => {
      startGoogleLoginFlow(loadAndShowCalendarEvents);
    });

    document.getElementById("addEventBtn").addEventListener("click", async () => {
      const newEvent = {
        summary: "ChatGPTとGoogle Calendar連携🎉",
        description: "これはAPI経由で作成したイベントです。",
        start: {
          dateTime: "2025-07-18T10:00:00+09:00",
          timeZone: "Asia/Tokyo",
        },
        end: {
          dateTime: "2025-07-18T11:00:00+09:00",
          timeZone: "Asia/Tokyo",
        },
      };
      try {
        const result = await addGoogleCalendarEvent(newEvent);
        calendar.addEvent({
          id: result.id,
          title: result.summary,
          start: result.start.dateTime || result.start.date,
          end: result.end?.dateTime || result.end?.date,
          extendedProps: {
            description: result.description || "",
            location: result.location || "",
          },
        });

        alert("Googleカレンダー＆カレンダーUIに追加完了！");
      } catch (err) {
        console.error("追加失敗:", err);
        alert("イベント追加に失敗しました");
      }
    });
  });

  // 初回のみ events.json を読み込む
  fetch("./data/events.json")
    .then((res) => res.json())
    .then((data) => {
      if (!localStorage.getItem("savedEvents")) {
        localStorage.setItem("savedEvents", JSON.stringify(data));
        location.reload();
      }
    });
});
