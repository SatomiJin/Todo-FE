import "./AboutMeComponent.scss";
function AboutMeComponent() {
  return (
    <div className="about-me-container">
      <div className="row">
        <div className="about-me-image col col-lg-6">
          <div className="avatar"></div>
        </div>
        <div className="content col col-lg-6">
          <div className="title">Tôi là Satomi Jin</div>
          <div className="intro">
            &ensp;Chào mọi người tôi là một lập trình viên ReactJS và NodeJS, Tôi sẽ cố gắng tạo ra các trang web với
            trải nghiệm tốt nhất cho mọi người.
          </div>
          <div className="social">
            <a href="https://www.facebook.com/shiyoru.satomi.9/">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="https://github.com/SatomiJin">
              <i className="fa-brands fa-square-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/%C4%91%E1%BB%93ng-h%E1%BB%AFu-tr%E1%BB%8Dng-9029b92b6/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="mailto:trongdh0904@gmail.com">
              <i className="fa-solid fa-at"></i>
            </a>
          </div>
          <div className="portfolio">
            <div className="portfolio">
              <a href="https://portfolio.satomijin.id.vn/" target="_blank">
                <button type="button" className="btn-portfolio btn">
                  Portfolio của tôi <i className="fa-solid fa-arrow-right"></i>
                </button>
              </a>
              <a href="https://portfolio.satomijin.id.vn/" download="DongHuuTrong_CV.pdf">
                <button type="button" className="btn-portfolio btn">
                  <i class="fa-solid fa-cloud-arrow-down"></i> Tải xuống CV
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeComponent;
