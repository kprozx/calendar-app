import { saveEvents, loadEvents } from "./modules/storage.js";
import {
  handleEventClick,
  handleDateClick,
  showTooltip,
  hideTooltip,
} from "./modules/calendarHandlers.js";
import { loadHolidays } from "./modules/loadHolidays.js";
import { setupSearch } from "./modules/setupSearch.js";

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  const savedEvents = loadEvents();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
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
