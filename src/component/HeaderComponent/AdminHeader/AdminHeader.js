import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { resetUser } from "../../../redux/Slides/UserSlides";
import * as utilsFormat from "../../../utilsFormat";
import AdminPageContext from "../../../context/AdminPageContext";
import "./AdminHeader.scss";
function AdminHeader() {
  let user = useSelector((state) => state.user);
  let changeContent = useContext(AdminPageContext);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // function
  const handleLogout = async () => {
    await utilsFormat.logout();
    dispatch(resetUser());
    navigate("/");
  };
  return (
    <div className="admin-header-container">
      <input type="checkbox" id="sidebar-tb-checkbox" className="sidebar-tb-checkbox" hidden />
      <div className="admin-header-pc">
        <div className="container">
          <div className="row">
            <div className="close-container col col-12">
              <label htmlFor="sidebar-tb-checkbox" className="btn btn-lg btn-close btn-close-white"></label>
            </div>
            <label htmlFor="sidebar-tb-checkbox" className="user-info col-12">
              <div
                className="user-image"
                style={{ backgroundImage: `url(${user && user?.image ? user.image : ""})` }}
              ></div>
              <div className="user-text">
                <div className="display-name">Tên: {user && user?.displayName}</div>
                <div className="gender">Giới tính: {user && user?.gender}</div>
              </div>
            </label>
            <div className="admin-sidebar col-12">
              <ul className="menu-sidebar">
                <li className="menu-item" onClick={() => changeContent.handleChangeContent("GeneralManagement")}>
                  Tổng quát
                </li>
                <li className="menu-item" onClick={() => changeContent.handleChangeContent("UserManagement")}>
                  Quán lý người dùng
                </li>
                <li className="menu-item" onClick={() => navigate("/profile")}>
                  Thông tin cá nhân
                </li>
                <li className="menu-item" onClick={() => navigate("/")}>
                  Trang chủ
                </li>
                <li className="menu-item" onClick={() => handleLogout()}>
                  Đăng xuất
                </li>
              </ul>
            </div>
            <div className="admin-sidebar-icon col-12">
              <ul className="menu-sidebar-icon">
                <li className="menu-item-icon" onClick={() => changeContent.handleChangeContent("GeneralManagement")}>
                  <i className="fa-solid fa-list"></i>
                </li>
                <li className="menu-item-icon" onClick={() => changeContent.handleChangeContent("UserManagement")}>
                  <i className="fa-solid fa-user-pen"></i>
                </li>
                <li className="menu-item-icon" onClick={() => navigate("/profile")}>
                  <i className="fa-solid fa-address-card"></i>
                </li>
                <li className="menu-item-icon" onClick={() => navigate("/")}>
                  <i className="fa-solid fa-house"></i>
                </li>
                <li className="menu-item-icon" onClick={() => handleLogout()}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-header-mobile">
        <div className="container">
          <ul className="mobile-menu row">
            <li className="mobile-menu-item col col-sm-2">
              <i
                className="fa-solid fa-chart-simple"
                title="Tổng quan"
                onClick={() => changeContent.handleChangeContent("GeneralManagement")}
              ></i>
            </li>
            <li className="mobile-menu-item col col-sm-2">
              <i
                className="fa-solid fa-users"
                title="Quản lý người dùng"
                onClick={() => changeContent.handleChangeContent("UserManagement")}
              ></i>
            </li>
            <li className="mobile-menu-item col col-sm-2">
              <i className="fa-solid fa-house-chimney" title="Trang chủ" onClick={() => navigate("/")}></i>
            </li>
            <li className="mobile-menu-item col col-sm-2">
              <i
                className="fa-solid fa-address-card"
                title="Thông tin cá nhân"
                onClick={() => navigate("/profile")}
              ></i>
            </li>
            <li className="mobile-menu-item col col-sm-2">
              <i className="fa-solid fa-right-from-bracket" title="Đăng xuất" onClick={() => handleLogout()}></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
