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
  
        const typeName = types[typeIndex];
        const candidates = typeGroups[typeName];
  
        for (let sec of candidates) {
          current.push(sec);
          if (checkAllConflicts(current)) {
            backtrackType(typeIndex + 1);
          }
          current.pop();
        }
      }
  
      backtrackType(0);
    }
  
    backtrackCourse(0, []);
    return results;
  }
  
    window.generateScheduleArrays = generateScheduleArrays;
    export { validateSchedule, generateScheduleArrays };