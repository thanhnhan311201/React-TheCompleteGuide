// - Two-way binding là ràng buộc 2 chiều, có nghĩa ở đây là tương tác dữ liệu 2 chiều giữa browser và server.
// - Đối với code js thuần, chúng ta sử dụng DOM để lấy dữ liệu của element, sau đó gán dữ liệu mới cho element đó thì được
// gọi là two-way binding.
// - Đối với các framework thì có sẽ có những ràng buộc khác nhau, như ReactJS là one-way binding, còn VueJS là two-way binding.
// - Ví dụ one-way binding:
import { func } from "prop-types";
import { useState } from "react";

{
  function App() {
    const [name, setName] = useState("");

    return (
      <div style={{ padding: 32 }}>
        <input onChange={(e) => setName(e.target.value)} />
      </div>
    );
  }
}
// - Tuy ReactJS là one-way binding (tức là nếu chúng ta có thay đổi biến name thì trên giao diện cũng không thay đổi), nhưng
// chúng ta có thể biến thành two-way binding bắt cách như sau:
{
  function App() {
    const [name, setName] = useState("");

    return (
      <div style={{ padding: 32 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setName("Two-way binding")}>Change</button>
      </div>
    );
  }
}

// - Ví dụ áp dụng two-way binding làm form submit:
{
  function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
      // CALL API
      console.log(name, email);
    };

    return (
      <div style={{ padding: 32 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleSubmit}>Register</button>
      </div>
    );
  }
}

// - Ví dụ: làm input type radio
{
  const courses = [
    {
      id: 1,
      name: "HTML, CSS",
    },
    {
      id: 2,
      name: "JavaScript",
    },
    {
      id: 3,
      name: "ReactJS",
    },
  ];

  function App() {
    const [checked, setChecked] = useState(1); // Chọn thẻ input đầu tiên làm mặc định

    const handleSubmit = () => {
      // CALL API
      console.log({ id: checked });
    };

    return (
      <div style={{ padding: 32 }}>
        {courses.map((course) => (
          <div key={course.id}>
            <input
              type="radio"
              checked={checked === course.id} // Biến checked là id của thẻ input được check, nếu trong một lúc chỉ có thể input được set props checked bằng true
              onChange={() => setChecked(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmit}>Register</button>
      </div>
    );
  }
}
// - Chúng ta có thể sử dụng props name trong thẻ input để cho phép lựa chọn 1 thằng, tuy nhiên việc đó chỉ có ý nghĩa về mặt
// thay đổi giao diện.
// - Chúng ta có thể sử dụng useState để làm cho phép lựa chọn 1 thằng, bằng cách mỗi lần chọn chúng ta sẽ lắng nghe sự kiện
// onChange, sau đó chúng ta cần lấy được id của thẻ input đã được checked, dùng "setState" cho biến checked là id của thẻ
// input đã được checked, sau đó chúng ta set props checked của thẻ input đó bằng true.

// - Ví dụ cho thẻ input type checkbox
{
  const courses = [
    {
      id: 1,
      name: "HTML, CSS",
    },
    {
      id: 2,
      name: "JavaScript",
    },
    {
      id: 3,
      name: "ReactJS",
    },
  ];

  function App() {
    const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {
      setChecked((prev) => {
        if (checked.includes(id)) {
          return checked.filter((item) => item !== id);
        } else {
          return [...prev, id];
        }
      });
    };

    const handleSubmit = () => {
      console.log({ ids: checked });
    };

    return (
      <div style={{ padding: 32 }}>
        {courses.map((course) => (
          <div key={course.id}>
            <input
              type="checkbox"
              checked={checked.includes(course.id)}
              onChange={() => handleCheck(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmit}>Register</button>
      </div>
    );
  }
}
