// - Với việc mỗi lần chúng ta cập nhật state thì React sẽ re-render component lại, giả sử trong component chúng ta có một
// đoạn code xử lý logic phức tạp và được xử lý ở top level, thì mỗi khi component re-render chương trình sẽ chạy lại đoạn
// code phức tạp, điều đó vô tình gây ảnh hưởng tới hiệu suất của chương trình.
// - Để khắc phục tình trạng đó chúng ta sẽ sử dụng hook useMemo của thư viện React.
// - Về cơ bản useMemo sẽ hoạt động tương tự như useEffect, useMemo sẽ có 2 đối số là callback function và dependencies array,
// nếu dependencies array rỗng thì callback function chỉ được thực thi một lần khi mount component, còn nếu có dependencies
// thì mỗi lần re-render component và dependencies thay đổi thì callback function sẽ được gọi.
// - Một điều khác biệt của useMemo so với useEffect là useEffect được dùng để xử lý các side effect, còn useMemo sẽ được sử
// dụng để tính toán logic và trả về kết quả, sau đó chúng ta sẽ lưu lại kết quả đó trong một biến.
// - Ví dụ: ở đây chúng ta có một trường hợp tính tổng tiền của các sản phẩm trong giỏ hàng, trong component này chúng ta sẽ
// sử dụng useMemo có đoạn code tính toán tổng để tránh việc phải chạy code tính toán lại không cần thiết mỗi lần cập nhật
// state của thẻ input.
import { useState, useMemo, useRef } from "react";

const App = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [products, setProducts] = useState([]);
  const nameInputRef = useRef();

  const submitHandler = () => {
    setProducts((prev) => [...prev, { name, price: +price }]);
    setName("");
    setPrice("");
    nameInputRef.current.focus();
  };

  const total = useMemo(() => {
    const result = products.reduce((result, product) => {
      return result + product;
    }, 0);

    return result;
  });

  return (
    <div>
      <input
        value={name}
        placeholder="Enter name..."
        onChange={(e) => setName(e.target.value)}
        ref={nameInputRef}
      />
      <br />
      <input
        value={price}
        placeholder="Enter price..."
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <button onClick={submitHandler}>Add</button>
      <p>Total: {total}</p>
    </div>
  );
};
