import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as utilsFormat from "../../../../utilsFormat";
import "./UserOptions.scss";
import userAvatar from "../../../../Assets/images/user-avatar.png";
import { resetUser } from "../../../../redux/Slides/UserSlides";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../LoadingComponent/LoadingComponent";

function UserOptions() {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [isLoading, setIsLoading] = useState(false);
  // useEffect
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (user && user.displayName !== "") {
  //     setIsLoading(false);
  //   }
  // }, []);
  // function
  const handleLogout = async () => {
    await utilsFormat.logout();
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <div className="user-options-container" style={{ width: "100%" }}>
      {isLoading === true && <LoadingComponent />}
      {user && user.displayName && user.email ? (
        <div className="user-info" data-bs-toggle="dropdown" aria-expanded="false">
          <ul className="dropdown-menu">
            <li className="menu-item" onClick={() => navigate("/profile")}>
              <i className="fa-solid fa-id-card"></i> Thông tin cá nhân
            </li>
            <li className="menu-item" onClick={() => navigate("/todo")}>
              <i className="fa-solid fa-list-check"></i> Danh sách của tôi
            </li>

            {user && user.role === "R1" && (
              <li className="menu-item" onClick={() => navigate("/admin")}>
                <i className="fa-solid fa-gears"></i> Quản lý hệ thống
              </li>
            )}
            <li className="menu-item" onClick={() => handleLogout()}>
              <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
            </li>
          </ul>
          <div
            className="image"
            style={{ backgroundImage: `url(${user.image !== "" ? user.image : userAvatar})` }}
          ></div>
          <div className="user-name">{user.displayName}</div>
        </div>
      ) : (
        <div>
          <button type="button" className="btn btn-light me-3" onClick={() => navigate("/sign-in")}>
            Đăng nhập
          </button>

          <button type="button" className="btn btn-light" onClick={() => navigate("/sign-up")}>
            Đăng ký
          </button>
        </div>
      )}
    </div>
  );
}

export default UserOptions;
