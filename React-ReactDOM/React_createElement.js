// - Đối với DOM, khi chúng ta createElement thì sẽ tạo ra được thành phần nhỏ nhất trong DOM, đó chính là DOM element.
// - Còn đối với React, thì sẽ tạo ra được phần tử nhỏ nhất của React là React element.

// - Về mặt cú pháp thì phương thức createElement của React sẽ có sự khác biệt so với DOM.
// - Đối với DOM thì chúng ta sẽ sử dụng phương thức set để thêm các thuộc tính cũng như là thêm giá trị.
// - Ví dụ:
const h1DOM = document.createElement("h1");
h1.title = "Hello";
h1.id = "heading";
h1.className = "heading";
h1.style = "color: red, fontSize: 30px";
h1.innerText = "Hello world!";
// - Còn đối với React, thì chúng ta sẽ thêm các thuộc tính bằng một object, và object đó sẽ được truyền trực tiếp vào phương thức createElement như một
// tham số.
// - Khi chúng ta tạo một element React, thì thư viện React sẽ không có cung cấp cho chúng ta tham số giá trị (innerText, textContext,...), và sẽ có tham
// số duy nhất là children, chúng ta có thể truyền vào bất kì kiểu dữ liệu nào (string, array, object,...).
// - Cú pháp: React.createElement(type, props, children, children-n, ...) từ tham số thứ ba trở đi sẽ là các children
const h1React = React.createElement(
  "h1",
  {
    title: "Hello",
    id: "heading",
    className: "heading",
    style: "color: red, fontSize: 30px",
  },
  "Hello guys!"
);
// - Khi tạo xong React element, thì children cũng được xem là thuộc tính của React element, nếu element có nhiều children thì các children sẽ được chứa
// trong một mảng.
// - Ví dụ: tạo một thẻ ul như sau với DOM và React
// <ul>
//    <li>JavaScript</li>
//    <li>ReactJS</li>
// </ul>
// DOM:
const ulDOM = document.createElement("ul");
const liDOM1 = document.createElement("li");
liDOM1.innerText = "JavaScript";
const liDOM2 = document.createElement("li");
liDOM2.innerText = "ReactJS";
ulDOM.appendChild(liDOM1);
ulDOM.appendChild(liDOM2);
// React:
const ulReact = React.createElement(
  "ul",
  null,
  React.createElement("li", null, "JavaScript"),
  React.createElement("li", null, "ReactJS")
);
// Một điều lưu ý là React không cho phép chúng ta tạo các element cùng một lúc, mà bắt buộc phải có 1 element bọc lại các
// element con đấy.
// Ví dụ: Trường hợp sai
const ulReact2 =
  (React.createElement("div", null, "JavaScript"),
  React.createElement("div", null, "ReactJS"));
// Trường hợp đúng
const ulReact3 = React.createElement(
  "div",
  null,
  React.createElement("div", null, "JavaScript"),
  React.createElement("div", null, "ReactJS")
);
