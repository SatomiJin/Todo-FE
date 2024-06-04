import { useState } from "react";

import UserManagement from "./ComponentAdmin/UserManagement/UserManagement";
import GeneralManagement from "./ComponentAdmin/GeneralManagement/GeneralManagement";
import AdminPageContext from "../../context/AdminPageContext";
import AdminHeader from "../../component/HeaderComponent/AdminHeader/AdminHeader";
import "./AdminPage.scss";
function AdminPage() {
  let [contentPage, setContentPage] = useState("GeneralManagement");

  // function
  const handleChangeContent = (name) => {
    setContentPage(name);
  };

  const handleRenderComponent = () => {
    if (contentPage === "GeneralManagement") return <GeneralManagement />;
    if (contentPage === "UserManagement") return <UserManagement />;
  };
  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <AdminPageContext.Provider value={{ handleChangeContent }}>
          <AdminHeader />
        </AdminPageContext.Provider>
      </div>
      <div className="content">{handleRenderComponent()}</div>
    </div>
  );
}

export default AdminPage;
