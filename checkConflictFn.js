import { courseData } from "./coursedata.js";
const newArray = Object.values(courseData).flat();

// UBC classes end 10 mins early so time intervals are open (no equality conflict)
function timeHasConflict(Start1, End1, Start2, End2) {
  const s1 = timeToMinutes(Start1);
  const e1 = timeToMinutes(End1);
  const s2 = timeToMinutes(Start2);
  const e2 = timeToMinutes(End2);
  return !(e2 < s1 || s2 > e1);
}

function timeToMinutes(timeStr) {
  const [hour, min] = timeStr.split(":").map(Number);
  return hour * 60 + min;
}

function dayHasConflict(dayArray1, dayArray2) {
  return dayArray1.some(day => dayArray2.includes(day));
}

// conflict only if: same day + overlapping time
function hasConflict(course1, course2) {
  return dayHasConflict(course1.days, course2.days) &&
         timeHasConflict(course1.start, course1.end, course2.start, course2.end);
}

// get all sections of given course name
function getCourseSections(name) {
  return newArray.filter(item => item.name === name);
}

// one course cannot pick two sections of same type
function eachTypeNoConflict(selectedArray) {
  for (let i = 0; i < selectedArray.length; i++) {
    for (let j = i + 1; j < selectedArray.length; j++) {
      if (selectedArray[i].name === selectedArray[j].name &&
          selectedArray[i].type === selectedArray[j].type) {
        return false;
      }
    }
  }
  return true;
}

// full conflict check among every selected section
function checkAllConflicts(selectedArray) {
  for (let i = 0; i < selectedArray.length; i++) {
    for (let j = i + 1; j < selectedArray.length; j++) {
      if (hasConflict(selectedArray[i], selectedArray[j])) {
        return false;
      }
    }
  }
  return true;
}

// get selected classes based on user input
function getUserSelectedCourses() {
  const selected = [];

  while (true) {
    const input = prompt("Enter course name (DONE to stop):");
    if (input === "DONE") break;

    if (courseData[input]) {
      selected.push(...courseData[input]);
    } else {
      console.log("Invalid course name:", input);
    }
  }
  return selected;
}

// Final evaluation function
function validateSchedule(selectedCourses) {
  if (!eachTypeNoConflict(selectedCourses)) {
    return "Invalid: cannot take two sections of same type for same course";
  }

  if (!checkAllConflicts(selectedCourses)) {
    return "Invalid: time conflict exists";
  }

  return "Valid schedule!";
}

const selectedCourses = getUserSelectedCourses();
console.log(validateSchedule(selectedCourses));
