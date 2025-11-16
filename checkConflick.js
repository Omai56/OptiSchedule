import {courseData} from "./coursedata.js"
const newArray = Object.values(courseData).flat();
function noConflictSchedule(){
    if(!(otherEndTime < oneStartTime || otherStartTime > oneEndTime)){
        return false
    }else{
        return true
    }
}
var user_typein_name = "CPSC110"
function getName(){
    var typein_name = prompt()
    return typein_name
}
function getCorrespondingInformation(){
    for (let i=0; i<newArray.length;i++){
    if (getName() === newArray[i]){
        console.log(newArray[i])
    }else{
        console.log("Error")
    }
    }
}