import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import LoadingComponent from "../../component/LoadingComponent/LoadingComponent";
import { useMutationHook } from "../../Hook/useMutationHook";
import MobileSignIn from "../../component/SignInComponent/MobileSignIn/MobileSignIn";
import * as UserService from "../../Service/UserService";
import { updateUser } from "../../redux/Slides/UserSlides";
import "./SignInPage.scss";

function SignInPage() {
  let [isLoading, setIsLoading] = useState(false);
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  let mutation = useMutationHook((data) => UserService.signIn(data));
  let { data } = mutation;
  // onchange
  const handleOnchange = (e) => {
    let copyState = { ...signInData };
    copyState[e.target.name] = e.target.value;
    setSignInData({
      ...copyState,
    });
  };
  //function
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!signInData.email || !signInData.password) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
    }
    mutation.mutate({
      email: signInData.email,
      password: signInData.password,
    });
  };

  const handleGetDetailUser = async (data) => {
    let storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUser(data);

    dispatch(updateUser({ ...res.user, access_token: data.access_token, refresh_token: refreshToken }));
  };
  // useEffect
  useEffect(() => {
    if (data && data.status === "OK") {
      if (location && location.state) {
        localStorage.setItem("access_token", JSON.stringify(data && data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(data && data.refresh_token));
        if (data && data.access_token) {
          const decoded = jwtDecode(data.access_token);
          if (decoded && decoded.email) {
            toast.success("Đăng nhập thành công!");
            handleGetDetailUser({ email: decoded.email, role: decoded.role, access_token: data.access_token });
            setIsLoading(false);
            navigate(`${location.state}`);
          }
        }
      } else {
        localStorage.setItem("access_token", JSON.stringify(data && data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(data && data.refresh_token));
        if (data && data.access_token) {
          const decoded = jwtDecode(data.access_token);
          if (decoded && decoded.email) {
            toast.success("Đăng nhập thành công!");
            handleGetDetailUser({ email: decoded.email, role: decoded.role, access_token: data.access_token });
            navigate("/");
            setIsLoading(false);
          }
        }
      }
    }
  }, [data]);
  return (
    <div className="sign-in-container">
      {isLoading === true && <LoadingComponent />}
      <div className="sign-in-form">
        <div className="container">
          <div className="row">
            <div className="title">Đăng nhập</div>
            <form className="form" onSubmit={(e) => handleSignIn(e)}>
              <div className="form-group col-12">
                <label htmlFor="email">Địa chỉ Email</label>
                <input
                  value={signInData.email}
                  onChange={(e) => handleOnchange(e)}
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password">Mật Khẩu</label>
                <input
                  value={signInData.password}
                  onChange={(e) => handleOnchange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
              </div>

              <div className="btn-container col-12 row">
                <button type="submit" className="btn btn-info btn-login col-lg-12 col-md-12">
                  <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                </button>
                <button className="btn btn-home col-lg-12 col-md-12" onClick={() => navigate("/")}>
                  <i className="fa-solid fa-house-chimney"></i> Trang chủ
                </button>
              </div>
              <div className="transfer-sign-up">
                Bạn chưa có tài khoản?
                <div className="sign-up" onClick={() => navigate("/sign-up")}>
                  Đăng ký ngay
                </div>
              </div>
            </form>
            <div className="other-sign-in col-12">
              <div className="text">Hoặc tiếp tục với:</div>
              <div className="social-logo">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-google-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sign-in-form_mobile">
        <MobileSignIn handleOnchange={handleOnchange} handleSignIn={handleSignIn} signInData={signInData} />
      </div>
    </div>
  );
}

export default SignInPage;
