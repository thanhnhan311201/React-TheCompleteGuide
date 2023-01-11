// - Trong quá trình code dự án React, chúng ta sẽ dùng nhiều thẻ div để bọc những component ở bên trong, và những thẻ div đó
// có tính chất và css style tương tự như nhau, do đó để hạn chế tình trạng duplicate code, chúng ta có thể sử dụng thuộc tính
// props.children để tạo một wrapper component, và chúng ta sẽ sử dụng wrapper component đó thay cho thẻ div.
function Card(props) {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
