// setupSearch.js
import { loadHolidays } from "./loadHolidays.js";

export function setupSearch(calendar) {
    document.getElementById("searchBox").addEventListener("input", function () {
        const keyword = this.value.toLowerCase();
        calendar.getEvents().forEach(event => event.remove());

        const filtered = JSON.parse(localStorage.getItem("savedEvents") || "[]").filter(event =>
            event.title.toLowerCase().includes(keyword) ||
            (event.extendedProps?.location || "").toLowerCase().includes(keyword)
        );

        filtered.forEach(event => calendar.addEvent(event));

        if (!keyword) loadHolidays(calendar);
    });
}