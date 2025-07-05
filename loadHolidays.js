// loadHolidays.js

export function loadHolidays(calendar) {
    fetch("https://holidays-jp.github.io/api/v1/date.json")
        .then(res => res.json())
        .then(data => {
            const holidayEvents = Object.entries(data).map(([date, title]) => ({
                title,
                start: date,
                allDay: true,
                color: "#ff9999"
            }));
            calendar.addEventSource(holidayEvents);
        });
}