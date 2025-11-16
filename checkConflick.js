import {courseData} from "./coursedata.js"
const newArray = Object.values(courseData).flat();
function timeHasConflict(Start1, End1, Start2, End2) {
    const s1 = timeToMinutes(Start1)
    const e1 = timeToMinutes(End1)
    const s2 = timeToMinutes(Start2)
    const e2 = timeToMinutes(End2)
    return !(e2 < s1 || s2 > e1);
}
function timeToMinutes(timeStr) {

    const [hour, min] = timeStr.split(":").map(Number);
    return hour * 60 + min;
  }
  function dayHasConflict(dayArray1, dayArray2) {
    return dayArray1.some(day => dayArray2.includes(day));
  }
  
function hasConflict(course1, course2) {
    return (timeHasConflict(course1.start, course1.end, course2.start, course2.end)
    && dayHasConflict(course1.days, course2.days))

}
function getCourseSections (name){
    return newArray.filter(item => item.name === name)
}

function getCorrespondingInformation() {
    const inputName = getName();
    return newArray.filter(item => item.name === inputName);
  }