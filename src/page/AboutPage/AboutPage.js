import AboutMeComponent from "../../component/AboutMeComponent/AboutMeComponent";
import "./AboutPage.scss";
function AboutPage() {
  return (
    <div className="about-container">
      <div className="container">
        <div className="row">
          <AboutMeComponent />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
