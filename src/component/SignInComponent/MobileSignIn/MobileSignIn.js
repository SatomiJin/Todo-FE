import { useNavigate } from "react-router-dom";
import "./MobileSignIn.scss";
function MobileSignIn(props) {
  let navigate = useNavigate();
  return (
    <div className="mobile-sign-in-container">
      <form className="mobile-sign-in-form container" onSubmit={(e) => props.handleSignIn(e)}>
        <div className="row">
          <div className="mobile-title col-12">Đăng nhập</div>
          <div className="form-group col-12">
            <label htmlFor="email">Địa chỉ Email</label>
            <input
              type="email"
              value={props.signInData.email}
              onChange={(e) => props.handleOnchange(e)}
              id="email"
              name="email"
              className="form-control"
            />
          </div>
          <div className="form-group col-12">
            <label htmlFor="password">Mật khẩu</label>
            <input
              value={props.signInData.password}
              onChange={(e) => props.handleOnchange(e)}
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
          </div>
          <div className="btn-mobile-container col-12">
            <button type="submit" className="btn btn-info">
              Đăng nhập
            </button>
            <button type="button" onClick={() => navigate("/")} className="btn btn-outline-dark">
              Trang chủ
            </button>
          </div>
          <div className="sign-up-container">
            bạn chưa có tài khoản?{" "}
            <div onClick={() => navigate("/sign-up")} className="sign-up">
              Đăng ký ngay
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MobileSignIn;
