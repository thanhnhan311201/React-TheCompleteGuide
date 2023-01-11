import React from "react";

// - Trong JSX chúng ta không thể có nhiều hơn một root element, do đó chúng ta không thể nào render 2 element nằm cạnh nhau,
// do đó để render nhiều element thì chúng ta phải đặt tất cả các element đó vào trong một wrapper element.
// - Tuy nhiên điều này sẽ dẫn tới một hạn chế là trong code html khi các component được render ra thì sẽ có rất nhiều wrapper
// element không cần thiết, điều đó sẽ làm ảnh hưởng tới perf khi browser cần render phải render tất cả các wrapper không cần
// thiết đó và ngoài ra khiến code của chúng ta sẽ không được "clean".
// - Một giải pháp để khắc phục vấn đề này là chúng ta sẽ tạo ra một component với tên là Wrapper, component sẽ trả về
// props.children và không tạo thêm bất cứ thẻ div nào, do đó component sẽ đóng vai trò là một wrapper tuy nhiên nó sẽ không
// tạo ra những thẻ div không cần thiết
const Wrapper = (props) => {
  return props.children;
};
// - Thư viện React cũng hỗ trợ cho chúng một element giống như vậy, đó là React.Fragment
const App = () => {
  return (
    <React.Fragment>
      <h1>Hello World!</h1>
      <p>Welcome to my world</p>
    </React.Fragment>
  );
};
