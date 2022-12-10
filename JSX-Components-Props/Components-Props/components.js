// - Trong React chúng ta có thể tạo một component bằng: string, function/class.
// - Với việc sử dụng function/class để tạo components, sẽ giúp chúng ta dễ dàng tái sử dụng.
// - Ví dụ:
// Cách code thuần:
const app = (
  <div className="wrapper">
    <div className="header">Header</div>
    <div className="content">Content</div>
    <div className="footer">Footer</div>
  </div>
);
// Cách sử dụng function để tạo component:
function Header() {
  return <div className="header">Header</div>;
}

const app1 = (
  <div className="wrapper">
    <Header></Header>
    <div className="content">Content</div>
    <div className="footer">Footer</div>
  </div>
);
// - Một điều lưu ý là khi chúng ta sử dụng function/class để tạo component, thì tên component phải được viết hoa chữ cái đầu.
// - Khi component không có children thì chúng chỉ cần viết thẻ đóng ngay lập tức <Header />.
const app2 = (
  <div className="wrapper">
    <Header />
    <div className="content">Content</div>
    <div className="footer">Footer</div>
  </div>
);
// - Trong thực tế, người ta sẽ tách các component thành một file js riêng, sau đó sẽ import vào để sử dụng.
// Cách sử dụng class để tạo component:
class Content extends React.Component {
  render() {
    return <div className="content">Content</div>;
  }
}

const app3 = (
  <div className="wrapper">
    <Header />
    <Content />
    <div className="footer">Footer</div>
  </div>
);

// - Chúng ta có thể tạo method trong một object, sau đó dùng object để render ra component
const Form = {
  Input() {
    return <input />;
  },
  Checkbox() {
    return <input type="checkbox" />;
  },
};
function App() {
  return (
    <div id="wrapper">
      <Form.Checkbox />
      <Form.Input />
    </div>
  );
}
// - Khi chúng ta muốn render linh động của method trong một object, thì chúng ta không thể render như thế này:
// function App1() {
//   const type = "Checkbox"
//   return (
//     <div id="wrapper">
//       <Form[Checkbox] /> Vi phạm cách trình bày của JSX vì có ngoặc vuông
//     </div>
//   );
// }
// - Thay vào đó chúng ta sẽ tạo một biến component ở ngoài để render linh động
function App1() {
  const checkboxType = "Checkbox";
  const inputType = "Checkbox";

  const CheckboxComponent = Form[checkboxType];
  const InputComponent = Form[inputType];
  return (
    <div id="wrapper">
      <CheckboxComponent />
      <InputComponent />
    </div>
  );
}
// - Một điều lưu ý là kiểu dữ liệu boolean, null và undefined sẽ không được render.
// - Chúng ta có thể sử dụng biểu thức logic để render ra nội dung
function App2() {
  const firstAccess = true;
  return <div id="wrapper">{firstAccess && <h1>Welcome to F8</h1>}</div>;
}

function App3({ title }) {
  const firstAccess = true;
  return (
    <div id="wrapper">
      <h1>{title || "Giá trị mặc định"}</h1>
    </div>
  );
}

// - Trong ReactJS, chúng ta có 2 thuật ngữ Mounted và Unmounted
// - Mounted là chúng ta đưa vào một component vào sử dụng, còn Unmounted là gỡ nó ra.
// - Ví dụ:
import { useState } from "react";
{
  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <h1>Hello World</h1>}
      </div>
    );
  }
}
