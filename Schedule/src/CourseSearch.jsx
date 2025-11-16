import React, { useState } from "react";
import ScheduleGrid from "./ScheduleGrid.jsx";

const UBC_COURSES = [
  "CPSC 100", "CPSC 103", "CPSC 107", "CPSC 110", "CPSC 121",
  "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 259", "CPSC 304",
  "CPSC 310", "CPSC 311", "CPSC 312", "CPSC 313", "CPSC 314",
  "CPSC 317", "CPSC 319", "CPSC 320", "CPSC 322", "CPSC 330",
  "CPSC 340", "CPSC 344",
  "MATH 100", "MATH 101", "MATH 102", "MATH 103",
  "MATH 104", "MATH 105", "MATH 110", "MATH 200",
  "MATH 215", "MATH 221",
  "STAT 200", "STAT 201", "STAT 203", "STAT 241",
  "BIOL 111", "BIOL 112", "BIOL 121",
  "CHEM 121", "CHEM 123",
  "SCIE 113",
];

function getCourseColor(course) {
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

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [generatedCourses, setGeneratedCourses] = useState([]);

  const filteredCourses = UBC_COURSES.filter((course) =>
    course.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
    setQuery("");
  };

  const handleRemoveCourse = (courseToRemove) => {
    setSelectedCourses(selectedCourses.filter((c) => c !== courseToRemove));
  };

  const handleGenerateSchedule = () => {
    setGeneratedCourses(selectedCourses); 
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftColumn}>

        {/* ==== SEARCH AREA ==== */}
        <div style={styles.searchArea}>
          <div style={styles.searchWrapper}>
            <span style={styles.icon}>🔍</span>
            <input
              type="text"
              placeholder="Search UBC courses (e.g. CPSC 110)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.input}
            />
          </div>

          {query !== "" && (
            <ul style={styles.resultsList}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <li
                    key={course}
                    style={styles.resultItem}
                    onClick={() => handleSelectCourse(course)}
                  >
                    {course}
                  </li>
                ))
              ) : (
                <li style={styles.noResult}>No matching course found</li>
              )}
            </ul>
          )}
        </div>

        {/* ==== SELECTED COURSES ==== */}
        {selectedCourses.length > 0 && (
          <div style={styles.selectedWrapper}>
            <div style={styles.selectedTitle}>Selected courses</div>
            <div style={styles.selectedList}>
              {selectedCourses.map((course) => (
                <div
                  key={course}
                  style={styles.selectedChip(course)} // 🔥 USE DYNAMIC COLOR
                >
                  <span>{course}</span>
                  <button
                    type="button"
                    style={{
                      ...styles.deleteButton,
                      color: hovered === course ? "red" : "#333",
                      fontWeight: hovered === course ? 700 : 400,
                    }}
                    onMouseEnter={() => setHovered(course)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleRemoveCourse(course)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== GENERATE BUTTON ==== */}
        <div style={styles.generateButtonWrapper}>
          <button
            onClick={handleGenerateSchedule}
            style={{
              ...styles.generateButton,
              opacity: selectedCourses.length === 0 ? 0.5 : 1,
              cursor: selectedCourses.length === 0 ? "not-allowed" : "pointer",
            }}
            disabled={selectedCourses.length === 0}
          >
            Generate schedule
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: CALENDAR */}
      <div style={styles.rightColumn}>
        <ScheduleGrid selectedCourses={generatedCourses} getCourseColor={getCourseColor} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "24px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "32px",
    background:
      "radial-gradient(circle at top left, #f0f9ff, #fefce8 40%, #f9fafb 80%)",
    minHeight: "calc(100vh - 60px)",
  },

  leftColumn: {
    flex: "0 0 360px",
    display: "flex",
    flexDirection: "column",
  },

  searchArea: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #f1f5f9, #ffffff)",
    border: "1px solid #d3d3d3",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  icon: { marginRight: "8px" },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#333",
  },

  resultsList: {
    marginTop: "10px",
    padding: "4px 0",
    listStyle: "none",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 20px rgba(15,23,42,0.15)",
    maxHeight: "220px",
    width: "100%",
    overflowY: "auto",
  },
  resultItem: {
    padding: "10px 14px",
    cursor: "pointer",
    fontSize: "15px",
    borderBottom: "1px solid #f1f1f1",
  },

  selectedWrapper: { marginTop: "18px" },
  selectedTitle: { fontSize: "14px", fontWeight: 600, marginBottom: "16px" },

  selectedList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  // 🔥 SELECTED COURSE CHIP — dynamic color
  selectedChip: (course) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "999px",
    background: getCourseColor(course),
    color: "#1f2937",
    fontSize: "13px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
  }),

  deleteButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    padding: 0,
    lineHeight: 1,
  },

  generateButtonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "80px",
  },

  generateButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #22C55E, #3B82F6)",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "14px",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
    width: "fit-content",
  },

  rightColumn: {
    flex: 1,
    minHeight: "400px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    backdropFilter: "blur(6px)",
  },
};
