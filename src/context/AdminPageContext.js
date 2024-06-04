import { createContext } from "react";

const AdminPageContext = createContext({
  handleChangeRenderPage: (name) => {},
});

export default AdminPageContext;
