import React from "react";

// fallback color function in case none is passed from CourseSearch
function defaultGetCourseColor(course) {
  const colors = [
    "#A7F3D0", // mint
    "#BFDBFE", // light blue
    "#FBCFE8", // pink
    "#FDE68A", // yellow
    "#C7D2FE", // soft indigo
    "#FCA5A5", // soft red
    "#FDBA74", // orange
  ];

  let hash = 0;
  for (let i = 0; i < course.length; i++) {
    hash = course.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ScheduleGrid({ selectedCourses = [], getCourseColor }) {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  // if parent passed getCourseColor, use that, otherwise use fallback
  const colorForCourse = getCourseColor || defaultGetCourseColor;

  // 8:00–21:00 in 30-min steps
  const times = [];
  for (let hour = 8; hour <= 21; hour++) {
    const hh = hour.toString().padStart(2, "0");
    times.push(`${hh}:00`);
    if (hour !== 21) times.push(`${hh}:30`);
  }

  const rowOffset = 2; // row 1 = headers, row 2 = 8:00

  const timeToIndex = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return (h - 8) * 2 + (m === 30 ? 1 : 0); // 8:00 -> 0
  };

  // simple fake slots just so you can SEE where courses will go
  const slotTemplates = [
    { day: "MON", start: "09:00", end: "10:30" },
    { day: "TUE", start: "10:00", end: "11:30" },
    { day: "WED", start: "11:00", end: "12:30" },
    { day: "THU", start: "13:00", end: "14:30" },
    { day: "FRI", start: "09:30", end: "11:00" },
    { day: "MON", start: "14:00", end: "15:30" },
    { day: "WED", start: "15:00", end: "16:30" },
  ];

  // one block per selected course (just for preview)
  const activeBlocks = selectedCourses.map((course, i) => {
    const slot = slotTemplates[i % slotTemplates.length];
    return {
      course,
      day: slot.day,
      start: slot.start,
      end: slot.end,
    };
  });

  return (
    <div style={styles.container}>
      {/* header / arrows (static for now) */}
      <div style={styles.controls}>
        <button type="button" style={styles.arrowButton} disabled>
          ❮
        </button>
        <span style={styles.scheduleLabel}>
          {activeBlocks.length > 0 ? "Preview schedule" : "No schedules generated yet"}
        </span>
        <button type="button" style={styles.arrowButton} disabled>
          ❯
        </button>
      </div>

      <div style={styles.grid}>
        {/* top-left corner */}
        <div
          style={{
            ...styles.emptyCorner,
            gridRow: 1,
            gridColumn: 1,
          }}
        ></div>

        {/* day headers */}
        {days.map((day, colIndex) => (
          <div
            key={day}
            style={{
              ...styles.dayHeader,
              gridRow: 1,
              gridColumn: colIndex + 2,
            }}
          >
            {day}
          </div>
        ))}

        {/* time labels & empty cells */}
        {times.map((time, rowIndex) => {
          const gridRow = rowIndex + rowOffset;
          return (
            <React.Fragment key={time}>
              {/* time label on the left */}
              <div
                style={{
                  ...styles.timeLabel,
                  gridRow,
                  gridColumn: 1,
                }}
              >
                {time.endsWith(":00") ? time : ""}
              </div>

              {/* cells for each day */}
              {days.map((day, colIndex) => (
                <div
                  key={day + time}
                  style={{
                    ...styles.cell,
                    gridRow,
                    gridColumn: colIndex + 2,
                  }}
                ></div>
              ))}
            </React.Fragment>
          );
        })}

        {/* course blocks */}
        {activeBlocks.map((block, idx) => {
          const dayIndex = days.indexOf(block.day);
          if (dayIndex === -1) return null;

          const rowStart = timeToIndex(block.start) + rowOffset;
          const rowEnd = timeToIndex(block.end) + rowOffset;

          return (
            <div
              key={block.course + idx}
              style={{
                ...styles.block,
                gridColumn: `${dayIndex + 2} / ${dayIndex + 3}`,
                gridRow: `${rowStart} / ${rowEnd}`,
                backgroundColor: colorForCourse(block.course), // 🔥 match chip color
              }}
            >
              {block.course}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    overflow: "auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginBottom: 12,
    padding: "6px 0",
  },
  arrowButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "default",
    fontSize: "28px",
    padding: "2px 8px",
    color: "#d1d5db",
  },
  scheduleLabel: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#374151",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "80px repeat(5, 1fr)",
    gridAutoRows: "30px",
    width: "100%",
    borderTop: "1px solid #d4d4d8",
    borderLeft: "1px solid #d4d4d8",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(15,23,42,0.15)",
  },
  emptyCorner: {
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#f3f4f6",
  },
  dayHeader: {
    textAlign: "center",
    fontWeight: 600,
    padding: "10px 0",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#f3f4f6",
    color: "#1f2933",
    fontSize: "13px",
    letterSpacing: "0.05em",
  },
  timeLabel: {
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #e5e7eb",
    paddingLeft: "10px",
    fontSize: "12px",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  cell: {
    borderRight: "1px solid #f3f4f6",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: "#ffffff",
  },
  block: {
    color: "#111827",
    fontSize: "11px",
    padding: "4px 6px",
    borderRadius: "10px",
    margin: "2px",
    boxShadow: "0 4px 8px rgba(15,23,42,0.25)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
};
