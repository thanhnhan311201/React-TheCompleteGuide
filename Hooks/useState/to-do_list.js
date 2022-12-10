import { useState } from "react";

function App() {
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) ?? []
  );

  const handleSubmit = () => {
    setCourses((prev) => {
      const newCourses = [...prev, course];

      localStorage.setItem("courses", JSON.stringify(newCourses));

      return newCourses;
    });
    setCourse("");
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Thêm khóa học</h2>
      <input value={course} onChange={(e) => setCourse(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {courses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
