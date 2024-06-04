import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../../../../../Hook/useMutationHook";
import * as UserService from "../../../../../../Service/UserService";
import "./ModalUpdate.scss";
function ModalUpdate(props) {
  let user = useSelector((state) => state.user);
  let [userInfo, setUserInfo] = useState({
    email: "",
    displayName: "",
    role: "",
    gender: "",
    phoneNumber: "",
  });
  // call API
  let mutation = useMutationHook((data) => UserService.updateUserInfo(data));
  let { data } = mutation;

  // useEffect
  useEffect(() => {
    if (props.data && props.data.email) {
      setUserInfo({
        email: props?.data.email,
        displayName: props?.data.displayName,
        role: props?.data.role,
        gender: props?.data.gender,
        phoneNumber: props?.data.phoneNumber,
      });
    }
  }, [props.data]);
  useEffect(() => {
    if (data && data.status === "OK") {
      props.setIsLoading(false);
      props.handleGetAllUser();
      toast.success("Cập nhật thông tin thành công");
    }
    if (data && data.status === "ERROR") {
      props.setIsLoading(false);
      toast.error("Cập nhật thông tin thất bại");
    }
  }, [data]);
  //   function
  const handleOnchange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;
    setUserInfo({
      ...copyState,
    });
  };
  const handleUpdateUser = async () => {
    props.setIsLoading(true);
    await mutation.mutate({
      email1: user && user?.email,
      token: user && user?.access_token,
      email: userInfo && userInfo.email,
      displayName: userInfo && userInfo.displayName,
      role: userInfo && userInfo.role,
      gender: userInfo && userInfo.gender,
      phoneNumber: userInfo && userInfo.phoneNumber,
    });
  };
  return (
    <div className="modal-update-container">
      <div
        className="modal fade"
        id="updateUserModal"
        tabIndex="-1"
        aria-labelledby="updateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateUserModalLabel">
                Cập nhật thông tin người dùng
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row">
              <div className="form-group col col-12">
                <label>Địa chỉ Email</label>
                <input
                  style={{ cursor: "not-allowed" }}
                  type="email"
                  disabled
                  className="form-control"
                  name="email"
                  value={userInfo.email}
                />
              </div>

              <div className="form-group col col-6">
                <label htmlFor="displayName">Tên người dùng</label>
                <input
                  className="form-control"
                  type="text"
                  id="displayName"
                  onChange={(e) => handleOnchange(e)}
                  value={userInfo?.displayName}
                  name="displayName"
                />
              </div>

              <div className="form-group col col-6">
                <label htmlFor="gender">Giới tính</label>
                <select
                  className="form-select"
                  value={userInfo?.gender}
                  name="gender"
                  id="gender"
                  onChange={(e) => handleOnchange(e)}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group col col-6">
                <label htmlFor="phoneNumber">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userInfo?.phoneNumber}
                  onChange={(e) => handleOnchange(e)}
                />
              </div>

              <div className="form-group col col-6">
                <label htmlFor="role">Quyền</label>
                <select
                  className="form-select"
                  name="role"
                  id="role"
                  value={userInfo?.role}
                  onChange={(e) => handleOnchange(e)}
                >
                  <option value="R1">ADMIN</option>
                  <option value="R2">USER</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                onClick={() => handleUpdateUser()}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
