import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import logger from "./logger";

const Provider = (props) => {
  const [state, dispatch] = useReducer(logger(reducer), initState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
