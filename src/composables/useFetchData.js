export const useFetchData = () => {
  const fetchData = async () => {
    let data = [];
    let direction = "ltr";

    try {
      const httpResponse = await fetch(`${import.meta.env.BASE_URL}data.json`);
      const httpData = await httpResponse.json();
      data = httpData.data;
      direction = httpData.direction;
    } catch (error) {
      console.error(`Failed to load data:`, error);
    }

    return { data, direction };
  };

  const getSemesters = async () => {
    const { data, direction } = await fetchData();

    return { data, direction };
  };

  const getClasses = async (semesterId) => {
    const { data, direction } = await fetchData();
    const semester = data.find((semester) => semester.id == semesterId);
    const classesData = semester?.classes;

    return { classesData, direction };
  };

  const getStudents = async (semesterId, classId) => {
    const { data, direction } = await fetchData();
    const semester = data.find((semester) => semester.id == semesterId);
    const currentClass = semester?.classes.find(
      (current) => current.id == classId
    );
    const studentsData = currentClass?.students;

    return { studentsData, direction };
  };

  return { getSemesters, getClasses, getStudents };
};
