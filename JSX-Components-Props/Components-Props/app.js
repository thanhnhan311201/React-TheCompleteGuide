const courseAPI = "http://localhost:3000/courses";

(function start() {
  getCourses(renderCourse);
})();

// Functions
// function CourseItem(props) {
//   return (
//     <div className={`course__item-${props.courseID}`}>
//       <img
//         className="course__item__image"
//         src={props.image_url}
//         alt="Course Image"
//       />
//       <h4
//         className="course__item__title"
//         style={{ cursor: "pointer" }}
//         onClick={() => {
//           alert(props.title);
//         }}
//       >
//         {props.title}
//       </h4>
//       <p className="course__item__des">{props.description}</p>
//     </div>
//   );
// }
// Trong thực tế, trong function component chúng ta chỉ nên code về mặt UI, còn về phía xử lý logic thì chúng ta nên viết
// ở bên dưới hàm tái sử dụng function component đó.
function CourseItem(props) {
  return (
    <div className={`course__item-${props.courseID}`}>
      <img
        className="course__item__image"
        src={props.image_url}
        alt="Course Image"
      />
      <h4
        className="course__item__title"
        style={{ cursor: "pointer" }}
        onClick={() => props.onClick(props.title)}
      >
        {props.title}
      </h4>
      <p className="course__item__des">{props.description}</p>
    </div>
  );
}

function getCourses(callback) {
  fetch(courseAPI)
    .then((response) => response.json())
    .then(callback)
    .catch((err) => {
      console.log(`Cant not get data. Message erro: ${err}`);
    });
}

function renderCourse(courses) {
  const listCourses = document.querySelector(".courses");

  const handleClick = (data) => {
    alert(data);
  };

  const htmls = (
    <div className="courses__lists">
      {courses.map((course) => {
        return (
          <CourseItem
            key={course.id}
            courseID={course.id}
            image_url={course.image_url}
            title={course.title}
            description={course.description}
            onClick={handleClick} // Hạn chế cách viết sử dụng arrow function để truyền biến vào một function khác: onClick={() => handleClick(course.title)}, vì điều này có thể làm ảnh hưởng tới perf.
          />
        );
      })}
    </div>
  );
  ReactDOM.render(htmls, listCourses);
}
