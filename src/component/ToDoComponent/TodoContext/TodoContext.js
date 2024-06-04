import { createContext } from "react";

let TodoContext = createContext({
  updateTodoStatus: false,
  handleUpdateTodoStatus: () => {},
});

export default TodoContext;
