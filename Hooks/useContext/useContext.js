// - Trong React, để chúng ta có thể truyền dữ liệu hoặc truyền state giữa các component với nhau thì chúng ta sẽ tạo các
// "prop chain" xuyên suốt giữa các component, tuy nhiên cách này chỉ phù hợp khi chúng ta cần truyền dữ liệu hoặc state giữa
// các component nó liên kết trực tiếp với nhau (UserList - UserDetail), trong những trường hợp giữa các component không liên
// quan với nhau thì sẽ rất phức tạp trong quá trình truyền dữ liệu, điều đó sẽ gây ra việc dư thừa props khi chúng ta phải
// truyền thông qua các component không liên quan, dẫn đến tạo ra các chuỗi "props chain" rất dài.
// - Để khắc phục vấn đề đó chúng ta sẽ sử dụng React Context API, React Context cho phép chúng ta tạo ra và quản lý các state
// "ngầm" (có thể hiểu là global state cho toàn bộ chương trình) bên trong React và tất cả component trong toàn bộ chương
// trình có thể truy cập trực tiếp và có thể cập nhật state đó mà không cần phải tạo ra các "prop chain".
// - Chúng ta sẽ tạo global state bằng cách tạo ra phạm vi (context) cho state đó, những component nào muốn truy cập và sử
// dụng state đó thì phải nằm bên trong phạm vi đó.

// - Để có thể tạo context (phạm vi sử dụng state), chúng ta sẽ làm như sau:
//    + Chúng ta sẽ tạo file chứa các context, sau đó chúng ta định nghĩa các context bằng phương thức createContext của thư
//      viện React.

/* import React from "react";

const AuthContext = React.createContext();

export default AuthContext; */

//    + Phương thức createContext sẽ nhận đầu vào là một "global state" do chúng ta tự định nghĩa (có thể không có tham số đầu
//      vào, lúc này chỉ đơn giản là tạo ra phạm vi).
//    + Phương thức sẽ trả về cho chúng ta một object, trong đó có chứa các component (AuthContext.Provider,
//      AuthContext.Consumer). Các component này sẽ được sử dụng như wrapper container cho các component mà muốn truy cập
//      context đó.
//    + Việc tạo context giống như chúng ta đang tạo một phạm vi, các component muốn truy cập tới giá trị của context đó thì
//      phải nằm trong phạm vi đó, do đó các component muốn sử dụng được thì phải được wrap bên trong context provider component.
{
  <AuthContext.Provider value={{ isLoggedIn: false }}>
    <MainHeader />
    <main>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Home />}
    </main>
  </AuthContext.Provider>;
}
//    + Trong đoạn code trên do component MainHeader, Login và Home đều muốn truy cập tới isLoggedIn nên sẽ được wrap bởi
//      component AuthContext.Provider.
//    + Trong AuthContext.Provider có một prop là value và chúng ta sẽ truyền vào "global state", toàn bộ các component
//      con bên trong AuthContext.Provider sẽ có thể sử dụng được giá trị của context đó mà không cần phải tạo prop chain.
//    + Để các component có thể truy cập được giá trị của context, thì bên trong các component chúng ta sẽ wrap các JSX code
//      bằng context consumer component.
{
  <AuthContext.Consumer>
    {(ctx) => (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={props.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    )}
  </AuthContext.Consumer>;
}
//    + Bên trong context consumer component sẽ là một function, trong đó tham số đầu vào là giá trị context mà context
//      provider component truyền tới, và hàm này sẽ return toàn bộ đoạn code JSX có sử dụng context đó.
//    + Tuy nhiên có một điều lưu ý do bên trên AuthContext.Provider chúng ta truyền vào value là một giá trị cứng nên giá
//      trị context được truyền về AuthContext.Consumer sẽ là undefined, do đó chúng ta nên truyền một giá trị có thể cập
//      thể cập nhật vào trong prop value của context provider component (có thể là một state).
//    + Ngoài cách sử dụng context consumer component, chúng ta có thể một hook của React để các component có thể truy cập
//      giá trị của context mà không cần phải wrap bởi context consumer component.
import { useContext } from "react";

{
  const Navigation = (props) => {
    const ctx = useContext(AuthContext);

    return (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={props.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    );
  };
}
//    + Chúng ta sẽ sử dụng phương thức useContext của thư viện React, đầu vào là context chúng ta đã định nghĩa. Phương thức
//      sẽ trả về cho chúng ta giá trị của context được truyền ở context provider component thông qua prop value.
//    + Giá trị của context không chỉ là state, mà chúng ta có thể truyền vô một function để các component nằm trong context
//      (phạm vi) đó có thể sử dụng được function đó.
{
  const App = () => {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: false, onLogout: () => setIsLoggedIn(false) }}
      >
        <MainHeader />
        <main>
          {!isLoggedIn && <Login />}
          {isLoggedIn && <Home />}
        </main>
      </AuthContext.Provider>
    );
  };

  const Navigation = (props) => {
    const ctx = useContext(AuthContext);

    return (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    );
  };
}

// - Thông thường chúng ta sẽ tạo context trong một file riêng biệt, đồng thời trong file đó chúng ta cũng sẽ tạo và quản lý
// các global state bên trong đó, cũng như là tạo ra wrapper provider component. Điều này sẽ có ý nghĩa các component khác
// chỉ tập trung để render ra JSX UI Code.
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");

    if (isUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// - Lúc này chúng ta chỉ cần wrap App component bởi AuthContextProvider component là các component nằm trong phạm vi App sẽ
// có thể sử dụng được giá trị của context AuthContext.

// - Lưu ý:
//    + Không nên sử dụng context cho các component có tính tái sử dụng mà nên sử dụng props chain. Ví dụ như component Button,
//      bởi vì component sẽ có nhiều logic chức năng để tái sử dụng cho nhiều mục đích khác nhau nên việc sử dụng context là
//      không hợp lý. Do đó chúng ta chỉ nên sử dụng context cho các component có 1 chức năng cụ thể.
//    + Không nên sử dụng context cho các component có có tần suất cập nhật state liên tục, bởi vì context cập nhật state sẽ
//      chậm hơn so với việc sử dụng prop chain để cập nhật state bằng cách phương thức setState, do đó context không tối ưu
//      hóa cho các component có tần suất cập nhật state liên tục.
//    + Tuy nhiên trong trường chúng ta cần sử dụng context cho các component có tần suất liên tục để tránh phải tạo long prop
//      chain, thì thay vì sử dụng phương thức createContext của React, chúng ta sẽ sử dụng một thư viện tối ưu hơn đó là
//      Redux.
//    + Một điều lưu ý quan trọng là chúng ta nên linh động trong việc chuyển đổi sử dụng prop chain và context, do nhược điểm
//      của context nên chúng ta không thể nào thay thế tất cả các component đều sử dụng context, ngoài ra chúng ta cũng nên
//      sử dụng context cho các component trong trường hợp phải tạo prop chain quá dài.
