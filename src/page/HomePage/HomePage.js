import IntroComponent from "../../component/IntroComponent/IntroComponent";
import "./HomePage.scss";
function HomePage() {
  return (
    <div className="home-page-container">
      <div className="container">
        <div className="row">
          <div className="intro-home-container col-12">
            <IntroComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
