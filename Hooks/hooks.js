// - Hooks là những hàm được cung cấp sẵn bởi thư viện ReactJS, mỗi hàm có một tính năng riêng.
// - Khi mà chúng code những function component mà chúng cần thêm những tính năng mà hooks đã cung cấp sẵn, chúng ta sẽ lấy
// ra những hooks tương ứng dùng trong function component đó.
// - Thư viện ReactJS cung cấp sẵn nhưng method sau đây:
//      + useState
//      + useEffect
//      + useLayoutEffect
//      + useRef
//      + useCallback
//      + useMemo
//      + useReducer
//      + useContext
//      + useImperativeHandle
//      + useDebugValue

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useImperativeHandle,
  useDebugValue,
} from "react";

// - Cách sử dụng Hooks
// Chưa dùng Hooks, chỉ dùng UI Component
function ComponentA() {
  return <h1>Haven't used hooks yet</h1>;
}

// Sử dụng Hooks, hỗ trợ thêm nhiều tính năng
function ComponentB() {
  // useState
  const [state, setState] = useState[initState];

  // useEffect
  useEffect(() => {}, [deps]);

  // useLayoutEffect
  useLayoutEffect(() => {}, [deps]);

  // useRef
  const ref = useRef();

  // useCallback
  const fn = useCallback(() => {}, [deps]);

  // useMemo
  const result = useMemo(() => {
    // return results for memo
  }, [deps]);

  // useReducer
  const [state1, dispatch] = useReducer(reducer, initalArg, init);

  // useContext
  const value = useContext(MyContext);

  // useImperativeHandle
  useImperativeHandle(ref, createHandle, [deps]);

  // useDebugValue
  useDebugValue(isOnline ? "Online" : "Offline");

  return <h1>Hooks</h1>;
}

// - Component đơn giản và trở nên dễ hiểu
//    - Không bị chia logic ra như methods trong lifecycle của Class Component
//    - Không cần sử dựng "this"
// - Life cycle là khoảng thời gian từ khi component đó được thêm vào DOM, sau đó tương tác hoạt động trên browser cho đến
// khi được gõ khởi DOM.

// - Lưu ý:
//    + Tất cả các React Hook phải được sử dụng bên trong React Function Component và Custom React Hook Function.
//    + Chúng ta chỉ được phép call React Hook ở top level của React Function Component hoặc Custom React Hook Function,
//      không được call trong bất kỳ function hay block statements nào.
