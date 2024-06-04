import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/Slides/UserSlides";
import * as utilsFormat from "../../utilsFormat";
import * as UserService from "../../Service/UserService";
import { useMutationHook } from "../../Hook/useMutationHook";
import userImage from "../../Assets/images/user-avatar.png";
import "./ProfileUserComponent.scss";
function ProfileUserComponent() {
  let user = useSelector((state) => state.user);
  let [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    image: "",
  });
  let [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  // call APIs
  let mutationUpdateUser = useMutationHook((data) => UserService.updateUserInfo(data));
  let dataUpdate = mutationUpdateUser.data;
  // function
  const handleOnchange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;
    setUserInfo({
      ...copyState,
    });
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    await mutationUpdateUser.mutate({
      email1: userInfo.email,
      email: userInfo.email,
      token: user.access_token,
      displayName: userInfo.displayName,
      phoneNumber: userInfo.phoneNumber,
      gender: userInfo.gender,
      image: userInfo.image,
    });
  };

  const handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await utilsFormat.getBase64(file);
      setUserInfo({
        ...userInfo,
        image: base64,
      });
    }
  };

  const handleGetDetailUser = async () => {
    let res = await UserService.getDetailUser({ email: user?.email, access_token: user?.access_token });
    dispatch(updateUser({ ...res?.user, access_token: user?.access_token, refresh_token: user?.re }));
  };
  // useEffect
  useEffect(() => {
    setUserInfo({
      displayName: user && user?.displayName,
      email: user && user?.email,
      phoneNumber: user && user?.phoneNumber,
      gender: user && user?.gender,
      image: user && user?.image,
    });
  }, [user]);
  useEffect(() => {
    if (dataUpdate && dataUpdate.status === "OK") {
      setIsLoading(false);
      toast.success("Cập nhật thông tin thành công");
      handleGetDetailUser();
    }
    if (dataUpdate && dataUpdate.status === "ERROR") {
      setIsLoading(false);
      toast.error("Cập nhật thông tin thất bại!");
      handleGetDetailUser();
    }
  }, [dataUpdate]);
  return (
    <div className="profile-container">
      {isLoading === true && <LoadingComponent />}
      <div className="info-user row">
        <div className="user-avatar col col-lg-6 col-md-6 col-sm-4">
          <div
            className="image"
            style={{ backgroundImage: `url(${userInfo && userInfo?.image ? userInfo?.image : userImage})` }}
          ></div>

          <div className="form-group">
            <button className="btn btn-danger">
              <label htmlFor="image">Chọn ảnh</label>
            </button>
            <input hidden type="file" id="image" name="image" onChange={(e) => handleOnchangeImage(e)} />
          </div>
        </div>

        <div className="user-information col col-lg-6 col-md-6 col-sm-8">
          <ul className="list-info">
            <li className="list-item">
              <i className="fa-solid fa-user"></i> : {userInfo && userInfo.displayName}
            </li>
            <li className="list-item">
              <i className="fa-solid fa-mobile"></i> : {userInfo && userInfo.phoneNumber}
            </li>
            <li className="list-item">
              <i className="fa-solid fa-venus-mars"></i> : {utilsFormat.formatGender(userInfo && userInfo.gender)}
            </li>
          </ul>
        </div>
      </div>
      <div className="update-info row">
        <div className="form-group col col-12">
          <label>Địa chỉ email:</label>
          <input type="email" value={userInfo && userInfo?.email} className="form-control" disabled />
        </div>
        <div className="form-group col col-12">
          <label htmlFor="name">Tên người dùng:</label>
          <input
            type="text"
            value={userInfo && userInfo?.displayName}
            onChange={(e) => handleOnchange(e)}
            className="form-control"
            name="displayName"
            id="displayName"
          />
        </div>

        <div className="form-group col col-6">
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="text"
            value={userInfo && userInfo?.phoneNumber}
            onChange={(e) => handleOnchange(e)}
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
          />
        </div>
        <div className="form-group col col-6">
          <label htmlFor="gender">Giới tính:</label>
          <select
            className="form-select"
            name="gender"
            id="gender"
            value={userInfo && userInfo?.gender}
            onChange={(e) => handleOnchange(e)}
            aria-label="select gender"
          >
            <option selected value="male">
              Male
            </option>
            <option value="female">Females</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => handleUpdateUser()}
          className="btn-update-user btn btn-outline-info col col-lg-12"
        >
          Cập nhật thông tin
        </button>
      </div>
    </div>
  );
}

export default ProfileUserComponent;
