import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";
function NotFoundPage() {
  let navigate = useNavigate();
  return (
    <div className="not-found-page-container">
      <div className="container">
        <div className="row">
          <div className="not-found">
            <div className="text"> 404 - Not Found</div>
            <button onClick={() => navigate("/")} type="button" className="btn btn-info" style={{ width: "200px" }}>
              <i className="fa-solid fa-house"></i> Trang Chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
