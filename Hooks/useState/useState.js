// - useState được sử dụng khi chúng ta cần thay đổi trạng thái của dữ liệu.
// - Thay vì chúng ta code js thuần là dùng DOM để get element, rồi dùng thuộc tính innerText hoặc Textcontent để thay đổi
// giá trị.
// - useState sẽ giúp chúng ta đơn giản hóa trong việc thay đổi dữ liệu, đồng thời khi dữ liệu thay đổi thì giao diện sẽ tự
// động cập nhật (render lại theo dữ liệu mới).
// - Cách sử dụng:
import { useState } from "react";

function Component() {
  const [state, setState] = useState(initState);
}
// - Ví dụ: chúng ta code một cái nút tăng số
function App() {
  const [counter, setCounter] = useState(1);

  const handleIncrease = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}
// - Khi chúng ta truyền vào initState là 1, thì hàm useState sẽ trả về biến counter có giá trị là 1 và một hàm setCounter.
// - Khi chúng ta nhấn vào nút button, thì hàm handleIncrease được chạy, do đó hàm setCounter được chạy.
// - Lúc này tham số truyền vào là counter + 1, thì trên giao diện sẽ render là giá trị 1 + 1 là 2.
// - Về cơ chế khi hàm setCounter được gọi, thì thư viện ReactJS sẽ chạy lại function App, gọi là useState nhưng giá trị
// truyền vô lúc này không phải là 1, mà là giá trị truyền vô của hàm setCounter trước đó, tức là ++counter (1+1), là 2. Sau
// đó vẫn sẽ tiếp tục trả về biến counter có giá trị là 2 và hàm setCounter, rồi vẫn tạo hàm handleIncrease, render lại giao
// diện với giá trị counter mới.
// - Nếu người dùng tiếp tục nhấn nút button thì hàm setCounter sẽ tiếp tục chạy, vẫn chạy lại function App, khởi tạo useState
// với giá trị mới.

// - Lưu ý:
//    - Component được re-render sau khi "setState".
//    - Initial State chỉ được dùng cho lần đầu.

// - Chúng ta có truyền vào callback function vào "setState":
{
  const handleIncrease = () => {
    setCounter((counter) => counter + 1);
  };
}
// - Khi chúng ta sử dụng callback trong "setState", thì callback sẽ nhận một đối số là state hiện tại, sau đó nó sẽ lấy giá
// trị được return trong callback để set lại state mới.
// - Trong trường hợp sử dụng callback, React sẽ đánh dấu giá trị hiện tại nếu chúng ta gọi "setState nhiều lần".
// - Ví dụ chúng ta muốn tăng một lần 3 giá trị bằng cách gọi "setState" 3 lần:
{
  const handleIncrease = () => {
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  };
}
// - Tuy nhiên cách trên sẽ không được, bởi vì lúc này cho dù chúng ta có gọi 3 lần thì biến counter cũng chỉ mang giá trị là
// 1, nên chỉ có 1 + 1.
// - Thay vào đó chúng ta sẽ sử dụng callback function.
{
  const handleIncrease = () => {
    setCounter((counter) => counter + 1);
    setCounter((counter) => counter + 1);
    setCounter((counter) => counter + 1);
  };
}

// - Ngoài việc sử dụng số để làm initial state, chúng ta vẫn có thể sử dụng callback function để thay thế.
// - Khi đó lúc này callback function sẽ không được sử dụng để làm initial state, mà giá trị trả về của callback sẽ được làm
// initial state của phương thức useState.
// - Cách này được ứng dụng khá nhiều trong thực tế, giả sử trong function App chúng ta thực hiện việc tính toán khá phức tạp,
// sau khi tính toán xong thì chúng ta gán vô một biến sau đó truyền biến đó vào useState làm giá trị mặc định, rồi sau khi
// chúng gọi hàm "setState" thì function App được gọi lại thì chúng ta lại thực hiện công việc tính toán lúc đầu. Điều dẫn là
// không cần thiết và tốn thời gian. Do đó chúng ta sẽ truyền thằng việc tính toán đó useState làm initial state thông qua
// callback.
{
  totals = [100, 200, 300];
  function App() {
    const [counter, setCounter] = useState(() => {
      return totals.reduce((total, cur) => total + cur);
    });
    const handleIncrease = () => {
      setCounter((counter) => counter + 1);
    };

    return (
      <div className="App" style={{ padding: 20 }}>
        <h1>{counter}</h1>
        <button onClick={handleIncrease}>Increase</button>
      </div>
    );
  }
}

// - Ví dụ tính năng update với useState
{
  function App() {
    const [cars, setCars] = useState(["Bugatti", "Rol-Royce", "Maybach"]);

    const handleUpdate = () => {
      setCars((prev) => [...prev, "Lamborghini"]);
    };

    return (
      <div className="App" style={{ padding: "20px" }}>
        <ul>
          {cars.map((car) => (
            <li>{car}</li>
          ))}
        </ul>

        <button onClick={handleUpdate}>Update</button>
      </div>
    );
  }
}
// - Một điều lưu ý là trong một project React sẽ có rất nhiều state của những component khác nhau, tuy nhiên mỗi state chỉ
// thuộc về duy nhất một component mà do component đó tạo ra, React sẽ quản lý độc lập những state đó.
// - Điều đó đồng nghĩa mỗi khi component update state, thì chỉ có duy nhất một component gọi "setState" đó được cập nhật,
// còn các component khác thì không.

// - Trong React, khi component thực hiện "setState" thì React sẽ thực hiện phép so sánh nghiệm ngặt === để kiểm tra trạng
// thái hiện tại và trạng thái mới có khác nhau hay không. Nếu 2 trạng thái khác nhau thì React mới re-render lại component,
// còn nếu không khác thì sẽ không re-render component.

// - Chúng ta có thể truyền data từ component cha xuống các component con thông qua props, vậy để có thể truyền data từ
// component con lên component cha thì chúng ta sẽ truyền hàm thông qua props.
// - Ở component cha chúng ta sẽ tạo một hàm nhận đối số truyền vào là dữ liệu và component con gửi lên, sau đó chúng ta sẽ
// truyền hàm đó cho component con thông qua props, sau đó ở component con chúng ta sẽ gọi hàm đó thông qua biến props và
// truyền vào đối số là dữ liệu cần gửi lên. Lúc này ở trên component cha thì chúng ta sẽ nhận được dữ liệu được component gửi
// lên thông qua đối số hàm nhận được.
// - Một quy ước cho đặt tên props để truyền hàm gửi dữ liệu là đặt theo sự kiện như (onClick, onChange,...), giả sử chúng ta
// cần gửi một form chứa data thì chúng ta sẽ đặt là onSubmitForm.

// - Ngoài ra chúng có thể sử dụng useState để làm dynamic style css, bằng cách chúng ta tạo một state với giá trị là
// true hoặc false, sau đó chúng ta dựa vào điều kiện mà chúng ta tạo cho user để có thể dynamic style css.
// - Dựa vào điều kiện true false của state đó, chúng ta có thể style css theo nhiều cách khác nhau. Chúng ta có thể style
// inline trực tiếp vào component, hoặc chúng ta thể style external bằng cách sử dụng class (ví dụ như class "invalid") rồi
// sau đó chúng ta thể dynamic add class cho component đó.
