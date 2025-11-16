import React, { useState } from "react";

const UBC_COURSES = [
  // CPSC
  "CPSC 100", "CPSC 103", "CPSC 107", "CPSC 110", "CPSC 121",
  "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 259", "CPSC 304",
  "CPSC 310", "CPSC 311", "CPSC 312", "CPSC 313", "CPSC 314",
  "CPSC 317", "CPSC 319", "CPSC 320", "CPSC 322", "CPSC 330",
  "CPSC 340", "CPSC 344",

  // MATH
  "MATH 100", "MATH 101", "MATH 102", "MATH 103",
  "MATH 104", "MATH 105", "MATH 110", "MATH 200",
  "MATH 215", "MATH 221",

  // STAT
  "STAT 200", "STAT 201", "STAT 203", "STAT 241",

  // BIOL / CHEM
  "BIOL 111", "BIOL 112", "BIOL 121",
  "CHEM 121", "CHEM 123",

  // SCIE
  "SCIE 113",
];

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hovered, setHovered] = useState(null); // which delete button is hovered

  const filteredCourses = UBC_COURSES.filter((course) =>
    course.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
    setQuery(""); // clear search after selection
  };

  const handleRemoveCourse = (courseToRemove) => {
    setSelectedCourses(selectedCourses.filter((c) => c !== courseToRemove));
  };

  return (
    <div style={styles.page}>
      {/* LEFT: search + selected courses */}
      <div style={styles.leftColumn}>
        {/* Search bar */}
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

        {/* Search results */}
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

        {/* Selected courses */}
        {selectedCourses.length > 0 && (
          <div style={styles.selectedWrapper}>
            <div style={styles.selectedTitle}>Selected courses</div>
            <div style={styles.selectedList}>
              {selectedCourses.map((course) => (
                <div key={course} style={styles.selectedChip}>
                  <span>{course}</span>

                  <button
                    type="button"
                    style={{
                      ...styles.deleteButton,
                      color: hovered === course ? "red" : "white",
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
      </div>

      {/* RIGHT: calendar placeholder (empty for now) */}
      <div style={styles.rightColumn}>
        {/* Later you can put your calendar component here */}
        {/* <Calendar /> */}
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
  },

  leftColumn: {
    flex: "0 0 360px", // fixed-ish width for search area
  },

  rightColumn: {
    flex: 1, // takes the remaining space (for your future calendar)
    minHeight: "200px",
    // optional: uncomment this to see the area
    // border: "1px dashed #e5e7eb",
    // borderRadius: "8px",
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 16px",
    borderRadius: "999px",
    backgroundColor: "#dcdcdc",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  },
  icon: {
    marginRight: "8px",
    fontSize: "16px",
    color: "#777",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#333",
  },

  resultsList: {
    marginTop: "8px",
    padding: "4px 0",
    listStyle: "none",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    maxHeight: "220px",
    overflowY: "auto",
  },
  resultItem: {
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #f1f1f1",
  },
  noResult: {
    padding: "8px 14px",
    fontSize: "14px",
    color: "#888",
  },

  selectedWrapper: {
    marginTop: "16px",
  },
  selectedTitle: {
    fontSize: "14px",
    fontWeight: 600,
},
selectedList: {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
},
selectedChip: {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "999px",
  backgroundColor: "#3B82F6",
  color: "#ffffff",
  fontSize: "13px",
},
deleteButton: {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "14px",
  padding: 0,
  lineHeight: 1,
},
};