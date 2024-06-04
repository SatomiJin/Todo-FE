import "./Layout.scss";
import UserHeader from "../component/HeaderComponent/UserHeader/UserHeader";

function DefaultLayout({ children }) {
  return (
    <div className="default-layout-page">
      <div className="header-user-layout">
        <UserHeader />
      </div>
      <div className="children">{children}</div>
    </div>
  );
}

export default DefaultLayout;
