// - JSX là JavaScript XML.
// - JSX sinh ra để hỗ trợ chúng ta viết XML và HTML trong file JavaScrip.
// - Mục đích chính của JSX là hạn chế viết sử dụng phương thức React.createElement() để tạo một element rồi render ra html,
// bởi vì làm như vậy sẽ rất thời gian và không hợp lý trong một project khi chúng ta cần tạo nhiều element.
// - Do đó JSX sinh ra để cho phép chúng ta có thể viết code html một cách bình thường, sau đó sử dụng thư viện Babel để chuyển
// đổi thành một ReactElement, sau đó sử dụng phương thức render của ReactDOM để render ra UI.
// - Babel là một thư viện của JavaScript, Babel chuyên được sử dụng để phân tích cú pháp và chuyển đổi cú pháp, một công dụng
// thường thấy nhất của Babel đó chính là chuyển đổi các cú pháp của JavaScript ES6 sang JavaScript ES5 để tương thích một
// số trình duyệt không hỗ trợ ES6 hơn.
// - Một trong những tính năng mà Babel hỗ trợ đó là phân tích cú pháp và chuyển đổi JSX sang JS.
// - Demo: https://bit.ly/2VOIMN7
// - Một điều lưu ý là khi chúng ta cần viết code JavaScript đan xen code JSX, thì chúng ta nên viết code JavaScript trong cặp
// dấu ngoặc {}.
// - Ví dụ:
const reactCourse = "ReactJS - F8";
const ul = (
  <ul>
    <li>JavaScrip</li>
    <li>{reactCourse}</li>
  </ul>
);
// - Điều lưu ý tiếp theo là khi chúng cần thêm thuộc tính thì vẫn phải tuân thủ như cách viết React.createElement, như muốn
// thêm class thì phải sử dụng thuộc tính là className, các thuộc tính CSS phải viết theo quy tắc camelCase,...
// - Ví dụ:
const postItem = (
  <div className="post-item">
    <h2 title="Học React tại F8">Học ReactJS</h2>
    <p styles="color: red; fontSize: 16px">
      Học ReactJS từ cơ bản đến nâng cao
    </p>
  </div>
);
// - Điều lưu ý tiếp theo là khi viết một JavaScript Object thì phải cần 2 cặp dấu ngoặc nhọn, cặp dấu ngoặc nhọn ở ngoài là
// để viết code JavaScript, còn dấu ngoặc nhọn ở trong để là biểu diễn kiểu dữ liệu Object.
// - Ví dụ:
const postItem2 = (
  <div className="post-item">
    <h2 title="Học React tại F8">Học ReactJS</h2>
    <p style={{ color: "red" }}>Học ReactJS từ cơ bản đến nâng cao</p>
  </div>
);
// - Khi sử dụng Babel, nên chọn type cho thẻ script code JSX là text/babel (giá trị mặc định là text/javascript).
// - Trong trường hợp chúng ta muốn tạo 2 element cùng cấp mà không cần sử dụng một element ở bên ngoài để bọc, thì chúng ta
// sẽ sử dụng <React.Fragment>.
// - <React.Fragment> đóng vai trò như mộ thẻ wrappe ở ngoài.
// - Ví dụ:
const jsx = (
  <React.Fragment>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </React.Fragment>
);
// - Khi chúng ta gặp warning "Each child in a list should have a unique "key" prop.", thì chúng ta nên thêm prop key.
