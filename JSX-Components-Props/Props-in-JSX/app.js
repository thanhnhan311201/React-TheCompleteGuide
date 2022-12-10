// - Trong JSX, chúng ta có thể truyền bất kể giá trị gì vào trong props
// <YourComponent
//      propname="String literals"
//      propname={{object}}
//      propname={expression}
// />
// - Tuy nhiên chúng ta không thể truyền vào if/else, switch/case,...
// - Chúng ta chỉ có thể truyền vào một kiểu dữ liệu hoặc một biểu thức.
// - Nếu một prop truyền vô mà hong gán giá trị, thì giá trị prop sẽ được truyền vào là một boolean với giá trị là true
function Button({ title, primary }) {
  console.log(primary); // true

  return <button>{title}</button>;
}

function App() {
  const title = "Hello World!";

  return (
    <div>
      <Button primary title={title} />
    </div>
  );
}
// - Trong trường hợp có quá nhiều props, chúng ta có thể sử dụng toán tử spread/rest của JS ES6 để tạo component.
function Input({ label, ...inputProps }) {
  console.log(inputProps);
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}
function App() {
  return (
    <div id="wrapper">
      <Input
        label="Full Name"
        type="text"
        placholder="Enter name..."
        title="Đây là input"
        onFocus={() => {
          console.log(Math.random());
        }}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
// - Trong react, children khi mà render cũng sẽ là một prop, so đó chúng ta có thể lấy children thông qua toán tử prop.
function Button(props) {
  return <button>{props.children}</button>;
}

function App() {
  const title = "Hello World!";

  return (
    <div>
      <Button>{title}</Button>
      <Button />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
