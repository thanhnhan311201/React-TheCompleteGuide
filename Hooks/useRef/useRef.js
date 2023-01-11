import { useRef } from "react";

// - Trong React, useRef sẽ trả về một object với thuộc tính current được khởi tạo thông qua tham số truyền vào.
// - Object được trả về sẽ tồn tại xuyên suốt vòng đời của component.
// - Ví dụ:
// const value = useRef(initialValue)
const value = useRef(100);
console.log(value);
// {current: 100}

// - Trong React, ref là một thuộc tính của một element đại diện cho chính nó, ref cho phép chúng ta truy cập đến DOM element
// hoặc React element đã được mount.
// - Trong JavaScript, chúng ta làm việc với DOM element bằng cách gọi document.getElementById(), trong React chúng ta sẽ sử
// dụng ref để tham chiếu chính xác với element cần dùng.
// - Ví dụ:
(() => {
  const textInput = useRef();
  console.log(textInput);
  return (
    <div>
      <input type="text" ref={textInput} />
      <button
        onClick={() => {
          console.log(textInput);
          console.log(textInput.current);
          console.log(textInput.current.value);
        }}
      ></button>
    </div>
  );
})();
// - Kết quả:
// {current: input}
// <input type="text">
// ""
// - Khi chúng ta sử dụng useRef để tham chiếu tới một html element thì chúng ta sẽ nhận được một DOM element được lưu trong
// biến được khởi tạo.
// - Khi chúng ta nhận được DOM element chúng ta có thể thao tác với dữ liệu bằng thuộc tính value.
// - Do đó chúng ta có thể sử dụng ref để lấy dữ liệu và sửa dữ liệu, hoạt động tương tự như cách chúng ta sử dụng useState.
// - Chúng ta có thể sử dụng useRef để thay thế useState cho thẻ input, bởi vì chúng ta sẽ không cần lắng nghe sự kiện onChange
// của thẻ input để set state, do đó sẽ không có re-render lại component mỗi lần người dùng nhập vào thẻ input.
// - Một lợi ích khi sử dụng useRef so với useState là chúng ta có thể thao tác two-way binding mà không cần re-render lại
// component. Tuy nhiên chúng ta chỉ nên sử dụng useRef cho one-way binding, nên hạn chế sử dụng useRef cho two-way binding.
// - Một điều lưu ý là khi sử dụng useRef để tạo ref thì chúng ta chỉ nhận được giá trị giá trị mặc định ban đầu, nếu không
// truyền gì hết thì sẽ là underfined, chỉ khi nào component được mount thì ref mới nhận được DOM element.

// - Tuy nhiên property ref chỉ có thể sử dụng được cho các DOM element (HTML element), chúng ta không thể nào sử dụng ref cho
// một React function component. Để có thể sử dụng ref truyền vô cho một React function component thì component đó (tức là
// component con) phải được bọc bởi React.forwardRef.
// - forwardRef là một HOC (Higher Order Component) được React thiết kế để truyền ref giữa các function component.
// - Khi chúng ta sử dụng forwardRef, component con ngoài đối số là props chúng ta sẽ có thêm một đối số thứ hai là ref,
// chính là ref của component cha truyền xuống.
import React from "react";

const App = () => {
  const inputRef = useRef();

  return (
    <div>
      <Input ref={inputRef} />
    </div>
  );
};

const Input = (props, ref) => {
  return <input ref={ref} />;
};

export default React.forwardRef(Input);
