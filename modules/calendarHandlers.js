import { showModal, showAddModal } from "./modal.js";
import { saveEvents } from "./storage.js";

export function handleEventClick(info, calendar) {
  info.jsEvent.preventDefault();
  const location = info.event.extendedProps.location || "場所未設定";

  const contentHTML = `
        <h3>📅 ${info.event.title}</h3>
        <p>🗓 日時: ${info.event.start.toLocaleString()}</p>
        <p>📍 場所: ${location}</p>
        <button id="deleteBtn" style="background:#e74c3c; color:white; margin-top:10px;">🗑 削除</button>
    `;

  showModal(contentHTML);

  document.getElementById("deleteBtn").onclick = () => {
    info.event.remove();
    saveEvents(calendar);
    modal.style.display = "none";
  };
}

export function handleDateClick(info, calendar) {
  showAddModal(() => {
    const title = document.getElementById("newTitle").value;
    const location = document.getElementById("newLocation").value;
    if (!title) return;
    calendar.addEvent({
      title,
      start: info.dateStr,
      allDay: true,
      extendedProps: { location },
    });
    saveEvents(calendar);
  });
}

export function showTooltip(info) {
  info.el.style.backgroundColor = "#ffe066";
  info.el.style.cursor = "pointer";
  const tooltip = document.createElement("div");
  tooltip.className = "fc-tooltip";
  tooltip.innerText = `${info.event.title}\n${info.event.extendedProps.location || "場所なし"}`;
  Object.assign(tooltip.style, {
    position: "absolute",
    background: "#333",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    zIndex: 1000,
    top: `${info.jsEvent.pageY}px`,
    left: `${info.jsEvent.pageX}px`,
  });
  tooltip.id = "custom-tooltip";
  document.body.appendChild(tooltip);
}

export function hideTooltip() {
  const tooltip = document.getElementById("custom-tooltip");
  if (tooltip) tooltip.remove();
}
