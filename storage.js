// localStorageからイベントを取得する関数
export function saveEvents(calendar) {
    const updated = calendar.getEvents().map(event => ({
        title: event.title,
        start: event.startStr,
        allDay: event.allDay,
        extendedProps: { location: event.extendedProps.location || "" }
    }));
    localStorage.setItem("savedEvents", JSON.stringify(updated));
}

export function loadEvents() {
    return JSON.parse(localStorage.getItem("savedEvents") || "[]");
}