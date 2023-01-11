// - memo là một HOC (Higher Order Component) của thư viện React, memo có nhiệm vụ là ghi nhớ props của function component
// để quyết định xem có cần thiết phải re-render component hay không.
// - Cụ thể khi một component được wrap bởi memo thì mỗi lần React nhận thấy được 1 prop trong tất cả các props thay đổi thì
// component sẽ được re-render lại.
import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Content />
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
    </div>
  );
};

const Content = (props) => {
  return <h2>Counter</h2>;
};

export default React.memo(Content);
// - Như trong ví dụ trên do component Content không có truyền state count và đồng thời cũng được wrap bởi memo, nên mỗi lần
// state count được cập nhật thì chỉ có component App được re-render còn component Content thì không.
// - Memo được ứng dụng trong những trường hợp khi component cha có quá nhiều component con, và mỗi lần cập nhật state nào đó
// thì tất cả component con bị re-render mặc dù không cần thiết, điều đó dẫn đến giảm hiệu suất của chương trình, do đó chúng
// ta sẽ wrap các component con bởi memo. Hoặc trong trường hợp chúng ta có một component có nhiều state, UI hoặc xử lý logic
// phức tạp nên việc re-render khi không cần thiết cũng sẽ giảm hiệu suất chương trình, thì lúc đó chúng ta cũng sẽ wrap
// component đó bằng memo.
