import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as utilsFormat from "../../../utilsFormat";
import "./UserHeader.scss";
import UserOptions from "./UserOptions/UserOptions";
import userAvatar from "../../../Assets/images/user-avatar.png";
import { resetUser } from "../../../redux/Slides/UserSlides";

function UserHeader() {
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const handleLogout = async () => {
    await utilsFormat.logout();
    dispatch(resetUser());
    navigate("/");
  };

  const redirectPage = (name) => {
    if (name === "login") navigate("/sign-in");
    if (name === "signup") navigate("/sign-up");
  };
  return (
    <div className="user-header-container">
      <div className="user-header-mobile">
        {user && user?.email ? (
          <ul className="menu-mobile row">
            <li className="menu-item col-2">
              <i className="fa-solid fa-house" title="Trang chủ" onClick={() => navigate("/")}></i>
            </li>
            <li className="menu-item col-2">
              <i className="fa-solid fa-list" title="Danh sách công việc" onClick={() => navigate("/todo")}></i>
            </li>
            <li className="menu-item col-2">
              <div
                className="user-avatar"
                style={{ backgroundImage: `url(${user && user?.image ? user.image : userAvatar})` }}
                id="userOption"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>

              <ul className="dropdown-menu" aria-labelledby="userOption">
                <li className="dropdown-item">Thông tin cá nhân</li>
                <li className="dropdown-item">Quản lý hệ thống</li>
              </ul>
            </li>
            <li className="menu-item col-2">
              <i className="fa-solid fa-circle-info" title="About us" onClick={() => navigate("/about-us")}></i>
            </li>
            <li className="menu-item col-2">
              <i className="fa-solid fa-right-from-bracket" title="Đăng xuất" onClick={() => handleLogout()}></i>
            </li>
          </ul>
        ) : (
          <ul className="menu-mobile row">
            <li className="item-menu-login col col-5">
              <button type="button" className="btn" onClick={() => navigate("/sign-in")}>
                Đăng nhập
              </button>
            </li>
            <li className="item-menu-login col col-5">
              <button className="btn" onClick={() => navigate("/about-us")}>
                About us
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="user-header-logo col col-2">Jin</div>
          <div className="user-header-menu col col-6">
            <ul className="menu">
              <li className="menu-item" onClick={() => navigate("/")}>
                Trang chủn
              </li>
              <li className="menu-item" onClick={() => navigate("/todo")}>
                ToDo
              </li>
              <li className="menu-item" onClick={() => navigate("/about-us")}>
                About us
              </li>
            </ul>
          </div>
          <div className="user-header-option col col-4">
            <UserOptions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
