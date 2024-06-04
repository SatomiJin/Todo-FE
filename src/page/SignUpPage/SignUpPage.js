import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutationHook } from "../../Hook/useMutationHook";
import * as UserService from "../../Service/UserService";
import "./SignUpPage.scss";
function SignUpPage() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "male",
    displayName: "",
  });
  // call API
  let mutation = useMutationHook((data) => UserService.signUp(data));
  let { data } = mutation;
  // function
  const handleOnchange = (e) => {
    let copyState = { ...signUpInfo };
    copyState[e.target.name] = e.target.value;
    setSignUpInfo({
      ...copyState,
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      toast.error("Mật khẩu và nhập lại mật khấu không trùng khớp");
    } else {
      await mutation.mutate({
        email: signUpInfo?.email,
        password: signUpInfo?.password,
        displayName: signUpInfo?.displayName,
        gender: signUpInfo?.gender,
        phoneNumber: signUpInfo?.phoneNumber,
      });
    }
  };

  const resetState = () => {
    setSignUpInfo({
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "male",
      displayName: "",
    });
  };
  // useEffect
  useEffect(() => {
    if (data && data.status === "OK") {
      toast.success("Đăng ký thành công!!");
      resetState();
      setIsLoading(false);
    }
    if (data && data.status === "ERROR") {
      toast.error("Đăng ký không thành công!!");
      setIsLoading(false);
    }
  }, [data]);
  return (
    <div className="sign-up-page-container">
      <form className="sign-up-form container" onSubmit={(e) => handleSignUp(e)}>
        <div className="title">Đăng ký ngay</div>
        <div className="row">
          <div className="form-group col col-12">
            <label htmlFor="email">Địa chỉ email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => handleOnchange(e)}
              name="email"
              value={signUpInfo.email}
              className="form-control"
            />
          </div>

          <div className="form-group col col-6">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              onChange={(e) => handleOnchange(e)}
              id="password"
              name="password"
              className="form-control"
              value={signUpInfo.password}
            />
          </div>
          <div className="form-group col col-6">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => handleOnchange(e)}
              id="confirmPassword"
              name="confirmPassword"
              value={signUpInfo.confirmPassword}
            />
          </div>
          <div className="form-group col col-6">
            <label htmlFor="displayName">Tên hiển thị</label>
            <input
              className="form-control"
              type="text"
              id="displayName"
              name="displayName"
              value={signUpInfo.displayName}
              onChange={(e) => handleOnchange(e)}
            />
          </div>

          <div className="form-group col col-lg-6">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={signUpInfo.phoneNumber}
              onChange={(e) => handleOnchange(e)}
            />
          </div>
          <div className="form-group col col-12">
            <label htmlFor="gender">Giới tính</label>
            <select
              className="form-select"
              name="gender"
              id="gender"
              value={signUpInfo && signUpInfo?.gender}
              onChange={(e) => handleOnchange(e)}
              aria-label="selectgender"
            >
              <option selected value="male">
                Nam
              </option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-info">
            <i className="fa-solid fa-right-to-bracket"></i> Đăng ký
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/sign-in")}>
            <i className="fa-solid fa-arrow-rotate-left"></i> Quay lại đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
