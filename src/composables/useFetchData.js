export const useFetchData = () => {
  const fetchData = async () => {
    let data = [];

    try {
      const httpResponse = await fetch(`${import.meta.env.BASE_URL}data.json`);
      data = await httpResponse.json();
    } catch (error) {
      console.error(`Failed to load data:`, error);
    }

    return data;
  };

  const getSemesters = async () => {
    const semestersData = await fetchData();
    return semestersData;
  };

  const getClasses = async (semesterId) => {
    const data = await fetchData();
    const semester = data.find((semester) => semester.id == semesterId);
    const classesData = semester?.classes;
    return classesData;
  };

  const getStudents = async (classId) => {
    const data = await fetchData();
    const classes = data.map((semester) => semester.classes);
    const currentClass = classes.find((current) => current.id == classId);
    const classesData = currentClass?.students;
    return classesData;
  };

  return { getSemesters, getClasses, getStudents };
};
