// - Trong JavaScript mỗi khi chúng ta định nghĩa kiểu dữ liệu Object như object, array, function thì chúng ta sẽ nhận được
// tham chiếu đến kiểu dữ liệu đó, cho nên khi chúng ta thực hiện phép so sánh thì giữa kiểu dữ liệu này là chúng ta đang
// so sánh tham chiếu, và dĩ nhiên kết quả nhận lại sẽ là false.
const a = {};
const b = {};
console.log(a === b);
// false
// - Điều đó dẫn đến việc khi chúng ta thực hiện re-render lại component thì React sẽ chạy lại toàn bộ code khởi tạo object,
// array, function,... thì chúng ta sẽ vô tình tạo ra thêm một tham chiếu mới cho các kiểu dữ liệu đó.
// - Trong trường hợp chúng ta khởi tạo một function để cập nhật state trong component cha, chúng ta truyền function đó
// xuống cho component con, và trong component chúng ta sử dụng memo để tránh cập nhật khi không thay đổi props, tuy nhiên
// khi React re-render lại component cha thì component con cũng bị re-render lại mặc dù props của component con không có prop
// nào thay đổi. Đó là bởi vì khi re-render component cha thì function cập nhật state đã được tạo lại mới và trả về một
// tham chiếu khác, rồi khi chúng ta truyền function với tham chiếu mới thông qua props thì lúc này memo sẽ nhận thấy sự thay
// đổi props do sự thay đổi tham chiếu của function cập nhật state (mặc dù code vẫn giữ nguyên) cho nên function con cũng bị
// re-render lại.
// - Để khắc phục tình trạng đó chúng ta sẽ sử dụng hook useCallback của thư viện React. UseCallback có nhiệm vụ là khi được
// gọi lần đầu nó sẽ tạo một callback function, sau đó nó sẽ nhận được một tham chiếu, nó sẽ lưu lại tham chiếu đó đồng thời
// sẽ trả về tham chiếu đó. UseCallback sẽ có một dependencies array, nếu dependencies array trống thì mỗi re-render component
// nó sẽ trả về lại tham chiếu cũ chứ không hề tạo lại callback mới và một tham chiếu mới, trong trường hợp trong callback
// function có sử dụng biến hoặc state có khả năng cập nhật thì chúng ta sẽ truyền biến hoặc state đó vào dependencies array,
// mỗi khi re-render và đồng thời biến hoặc state đó cập nhật thì nó sẽ tạo ra một callback mới với một tham chiếu mới.
// - UseCallback sẽ có 2 tham số đầu vào, tham số đầu tiên là callback function (đây là sẽ function useCallback sẽ tạo ra và
// và trả về tham chiếu), tham số thứ hai là dependencies array.
import React, { useState, useCallback } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increaseHandler = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <Content onIncrease={increaseHandler} />
      <h1>{count}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <>
      <h2>Counter</h2>
      <button onClick={props.onIncrease}>Increase</button>
    </>
  );
};

export default React.memo(Content);
