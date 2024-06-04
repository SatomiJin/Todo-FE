import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./IntroComponent.scss";

function IntroComponent() {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const handleStarted = () => {
    if (user && user?.email && user?.access_token) {
      navigate("/todo");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="intro-container">
      <div className="row row-cols-1">
        <div className="content-intro-left col col-lg-6 col-md-12"></div>
        <div className="content-intro-right col-lg-6 col-md-12">
          <div className="title">Chào mừng bạn đến với ToDo của Jin</div>
          <div className="content">
            &nbsp;Chào mừng bạn đến với trang web Todo List của Satomi Jin! Đây là nơi bạn có thể tạo, quản lý và theo
            dõi các công việc cần hoàn thành một cách hiệu quả. Với giao diện đơn giản nhưng mạnh mẽ, Satomi Jin giúp
            bạn tổ chức thời gian và nâng cao năng suất hàng ngày. Hãy cùng khám phá và biến ước mơ thành hiện thực với
            Todo List của chúng tôi!
          </div>
          <div className="get-started">
            <button type="button" onClick={() => handleStarted()} className="btn btn-stated">
              Bắt đầu ngay <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroComponent;
