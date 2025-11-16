import { courseData } from "./coursedata.js";

// ---- Time Helpers ----
function timeToMinutes(timeStr) {
  const [hour, min] = timeStr.split(":").map(Number);
  return hour * 60 + min;
}

function timeHasConflict(s1, e1, s2, e2) {
  const a1 = timeToMinutes(s1);
  const a2 = timeToMinutes(e1);
  const b1 = timeToMinutes(s2);
  const b2 = timeToMinutes(e2);
  return !(b2 <= a1 || b1 >= a2);
}

// ---- Day + Course conflict ----
function dayHasConflict(d1, d2) {
  return d1.some(day => d2.includes(day));
}

function hasConflict(a, b) {
  return dayHasConflict(a.days, b.days) &&
         timeHasConflict(a.start, a.end, b.start, b.end);
}

function checkAllConflicts(schedule) {
  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      if (hasConflict(schedule[i], schedule[j])) return false;
    }
  }
  return true;
}

function validateSchedule(schedule) {
  return checkAllConflicts(schedule) ? "Valid schedule!" : "Invalid";
}

// ---- Generate Valid Schedules ----
function generateScheduleArrays(selectedCourses) {
  const results = [];

  function backtrackCourse(courseIndex, current) {
    if (courseIndex === selectedCourses.length) {
      if (validateSchedule(current) === "Valid schedule!") {
        results.push([...current]);
      }
      return;
    }

    const courseName = selectedCourses[courseIndex];
    const sections = courseData[courseName];

    const typeGroups = {};
    for (let sec of sections) {
      if (!typeGroups[sec.type]) typeGroups[sec.type] = [];
      typeGroups[sec.type].push(sec);
    }

    const types = Object.keys(typeGroups);

    function backtrackType(typeIndex) {
      if (typeIndex === types.length) {
        backtrackCourse(courseIndex + 1, current);
        return;
      }

      for (let sec of typeGroups[types[typeIndex]]) {
        current.push(sec);
        if (checkAllConflicts(current)) backtrackType(typeIndex + 1);
        current.pop();
      }
    }

    backtrackType(0);
  }

  backtrackCourse(0, []);
  return results;
}

function optimizeSchedules(selectedCourses) {
  const all = generateScheduleArrays(selectedCourses);
  console.log(`Generated ${all.length} valid schedules`);

  // ---- Fisher–Yates Shuffle ----
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return all.slice(0, 20);  // return random 20
}

// ---- expose to window ----
window.optimizeSchedules = optimizeSchedules;

// expose runSchedule with optional return
window.runSchedule = function (courseList, returnResult = false) {
  const result = optimizeSchedules(courseList);
  console.log("Top 5:", result);

  if (!returnResult) alert(`Generated ${result.length} schedules. Check console.`);
  
  return result;
};