import { createContext, useReducer, useEffect } from "react";

const StoreContext = createContext(null);
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return { type: "reset", key: "reset", data: state.data };
    case "add":
      return {
        type: action.type,
        key: action.key,
        data: { ...state.data, [action.key]: action.value },
      };
    case "delete":
      const data = { ...state.data };
      delete data[action.key];
      return {
        type: action.type,
        key: action.key,
        data: { data },
      };
    case "action":
      return {
        type: action.type,
        key: action.key,
        value: action.value,
        data: state.data,
      };
    default:
      throw new Error();
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { type: "reset", data: {} });
  const obj = {
    state,
    dispatch,
  };

  useEffect(() => {
    dispatch({ type: "reset" });
  }, []);
  return <Provider value={obj}>{children}</Provider>;
};

export { StoreContext, StoreProvider };
