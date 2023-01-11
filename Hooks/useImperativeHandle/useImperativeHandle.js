// - Như trong phần useRef đã giới thiệu, để một component cha có thể tham chiếu được một DOM element trong element con thì
// chúng ta sẽ sử dụng forwardRef của React để truyền một ref hook từ component cha sang component con.

/* import React from "react";

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

export default React.forwardRef(Input); */

// - Từ đó component có thể truy xuất hoàn toàn được DOM element trong component con, tuy nhiên việc chúng ta truy xuất toàn
// bộ DOM element như vậy trong một component con thì không hợp lý, nó sẽ vi phạm tính đóng gói trong thiết kế hướng đối tượng,
// thay vào đó chúng ta chỉ nên cho phép truy xuất những thuộc tính cũng như phương thức cần thiết của DOM element trong
// component con cho component cha sử dụng, để làm được việc đó chúng ta sẽ sử dụng hook useImperativeHandle.
// - Về ý nghĩa sử dụng, trong component chúng ta sẽ tạo ra một ref để tham chiếu tới DOM element trong component con, sau đó
// chúng ta sẽ sử dụng hook useImperativeHandle để trả về những dữ liệu hoặc phương thức mà chúng ta muốn truyền cho ref của
// component cha.
// - useImperativeHandle sẽ nhận đầu vào là 2 tham số, tham số đầu tiên là ref của component cha truyền xuống, tham số thứ là
// một callback function, callback functin này sẽ trả về một object chứa những dữ liệu hoặc phương thức cần thiết mà component
// cha muốn sử dụng của DOM element trong component con.
import React, { useImperativeHandle, useRef } from "react";

const App = () => {
  const inputRef = useRef();

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={inputRef.current.focus}>Focus</button>
    </div>
  );
};

const Input = (props, ref) => {
  const inputComponentRef = useRef();

  useImperativeHandle(ref, () => {
    return { focus: () => inputComponentRef.current.focus };
  });

  return <input ref={inputComponentRef} />;
};

export default React.forwardRef(Input);
// - Như trong ví dụ trên, ở trong component Input (component con) chúng ta tạo ra một ref inputComponentRef để tham chiếu tới
// thẻ html input, sau đó sử dụng hook useImperativeHandle để truyền cho component App phương thức focus để mỗi lần chúng ta
// nhấn nút Focus thì browser sẽ focus vào thẻ input bên trong component Input.
// - Việc làm này có ý nghĩa là chúng ta chỉ truyền những phương thức hoặc dữ liệu cần thiết của DOM element bên trong component
// con cho component cha, chứ chúng ta không hoàn toàn cho phép component cha truy cập hoàn toàn vào DOM element của component
// con.
// - Ở bên trong component App khi chúng ta log ra inputRef thì nó chỉ là một object chỉ chứa method focus, chứ không hoàn
// toàn là một DOM element (cụ thẻ là input element).
