import React from "react";

export default function TopBar() {
  return (
    <header style={styles.bar}>
      <div style={styles.left}>
        <img
          src="https://ires.ubc.ca/files/2019/10/ubc-logo.png"
          alt="UBC Logo"
          style={styles.logo}
        />

        <span style={styles.brandMain}>Opti</span>
        <span style={styles.brandSub}>Schedule</span>
      </div>

      <div style={styles.right}>
        <button style={styles.button}>
          Build your personalized schedule
        </button>
      </div>
    </header>
  );
}

const styles = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 24px",
    background: "#3B82F6", // lighter clean blue
    color: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 4, // ⭐ tighter spacing between logo & Opti
  },

  logo: {
    height: "60px",  // matches Opti text size
    width: "auto",
    objectFit: "contain",
    marginRight: "0px", // ⭐ removed extra spacing
  },

  brandMain: {
    fontSize: "24px",
    fontWeight: 700,
  },

  brandSub: {
    fontSize: "16px",
    opacity: 0.85,
    marginLeft: "2px", // small spacing between Opti & Schedule
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  button: {
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid #ffffff",
    background: "transparent",
    color: "#ffffff",
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

