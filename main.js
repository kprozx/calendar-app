    import { saveEvents, loadEvents } from "./storage.js";
    import {
        handleEventClick,
        handleDateClick,
        showTooltip,
        hideTooltip
    } from "./calendarHandlers.js";
    import { loadHolidays } from "./loadHolidays.js";
    import { setupSearch } from "./setpuSearch.js";
 
document.addEventListener("DOMContentLoaded", () => {
      const calendarEl = document.getElementById("calendar");
      const savedEvents = loadEvents();

      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "ja",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: savedEvents,
        eventClick: (info) => handleEventClick(info,calendar),
        dateClick: (info) => handleDateClick(info,calendar),
        eventDrop: () => saveEvents(calendar),
        eventMouseEnter: showTooltip,
        eventMouseLeave: hideTooltip
      });

      calendar.render();
      loadHolidays(calendar);
      setupSearch(calendar);

      // 初回のみ events.json を読み込む
      fetch("events.json")
        .then(res => res.json())
        .then(data => {
          if (!localStorage.getItem("savedEvents")) {
            localStorage.setItem("savedEvents", JSON.stringify(data));
            location.reload();
          }
        });

});