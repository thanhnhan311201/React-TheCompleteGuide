// - Về mặt ứng dụng, thì useReducer sẽ được sử dụng tương tự như useState. Tuy nhiên useReducer sẽ được ứng dụng nhiều trong
// các trường hợp phức tạp như quản lý nhiều state cùng lúc, những state lại phụ thuộc liên quan tới nhau (để cập nhật state
// này thì phải cần lấy các state khác để xử lý logic rồi mới cập nhật - nên dùng useReducer vì nó sẽ ra trường hợp state để
// xử lý logic chưa được cập nhật ở phiên bản mới nhất do hàm setState của useState là bất đồng bộ) và được cập nhật cùng một
//  lúc với nhau, ngoài ra những state lại được sử dụng như "trigger" cho nhiều các component khác,... nên useState sẽ khó để
//  mà sử dụng cũng như quản lý những state đó.
// - Quan trọng: chúng ta sẽ sử dụng useReducer khi chúng ta cần update state A dựa vào state B, bởi vì chúng ta cần xử lý
// logic dựa trên lastest state B, tuy nhiên đối với hàm setState của state A thì không thể nào lấy được lastest state B, do
// đó useReducer là lựa chọn tốt nhất để làm việc này.

// - Để sử dụng useReducer, đầu tiên chúng ta sẽ định nghĩa một reducer function, hàm này sẽ nhận 2 đối số đầu vào lastest
// state và action (action có thể hiểu ở đây là phương thức cập nhật state). Hàm này sẽ có nhiệm vụ là xử lý logic dựa vào
// lastest state và action được truyền vào, sau đó trả về state mới.
// - Sau đó chúng ta sẽ sử dụng phương thức useReducer được cung cấp bởi thư viện ReactJS, nó sẽ nhận vào 3 đối số:
//    + Đối số 1: là hàm reducer do chúng ta tự định nghĩa ở trên.
//    + Đối số 2: là initial state do chúng ta tự định nghĩa.
//    + Đối số 3: là initial function, hàm này được sử dụng khi chúng ta cần set initial state phức tạp, hàm này optional.
import { useReducer } from "react";

const reducerFunction = (prevState, action) => {
  return;
};
const initialState = 1;
const initFunction = () => {
  return;
};
const [state, dispatchFunction] = useReducer(
  reducerFunction,
  initialState,
  initFunction
);
// - Khi đó lúc này hàm useReducer sẽ trả về cho chúng ta một mảng có 2 phần tử tương tự như useState:
//    + Phần tử đầu tiên là  tate hiện tại.
//    + Phần tử thứ hai là một hàm cập nhật state, hàm này sẽ truyền vào 1 đối số là action. Khi hàm này được gọi, React sẽ
//      gọi reducerFunction và truyền vào 2 đối số là lastest state và action được gửi đi trong hàm dispatchFunction. Từ đó
//      reducerFunction sẽ xử lý logic và trả về state mới.
// - Ví dụ: ở đây chúng ta sẽ sử dụng useReducer để quản lý cho 2 state (là một object có 2 thuộc tính là value và isValid)
// của email và password trong một form đăng nhập, chúng ta sẽ định nghĩa 2 reducerFunction cho email state và password state,
// cả 2 reducerFunction này đều xử lý logic để trả về state mới dựa vào 2 action:
//    + USER_INPUT: là action khi người dùng nhập vào email hoặc password, lúc này chúng ta sẽ kiểm tra email hay password đó
//                  valid hay không.
//    + INPUT_BLUR: là action khi người dùng không nhập email hoặc password nữa, chúng ta cũng sẻ kiểm tra valid.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; // Ở đây chúng ta sử dụng state vì action này không có value, do đó chúng ta cần lấy lastest state
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }; // Ở đây chúng ta sử dụng state vì action này không có value, do đó chúng ta cần lấy lastest state
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={emailState.isValid === false ? classes.invalid : ""}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
      </div>
      <div className={passwordState.isValid === false ? classes.invalid : ""}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
      </div>
      <div className={classes.actions}>
        <Button type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </div>
    </form>
  );
};
// - Như trong ví dụ trên action là một object bao gồm 2 thuộc tính là type và value, và action sẽ được React truyền vào
// reducerFunction để xử lý logic dựa vào type của action là gì. Do đó chúng ta có thể hiểu action là một phương thức để cập
// nhập state mới, tùy vào từng bài toán chúng ta sẽ định nghĩa ra các action khác nhau và các cách xử lý khác nhau.
