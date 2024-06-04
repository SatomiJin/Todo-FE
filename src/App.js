import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { routes } from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";

import * as UserService from "./Service/UserService";
import * as utilsFormat from "./utilsFormat";
import DefaultLayout from "./Layout/DefaultLayout";
import { resetUser, updateUser } from "./redux/Slides/UserSlides";

function App() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  // function
  const handleDecoded = () => {
    let access_token = (user && user.access_token) || localStorage.getItem("access_token");
    let decoded = {};
    if (access_token && utilsFormat.isJsonString(access_token) && !user.access_token) {
      access_token = JSON.parse(access_token);
      decoded = jwtDecode(access_token);
    }
    return { access_token, decoded };
  };
  const handleGetDetailUser = async (data) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    let refresh_token = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailUser(data);

    dispatch(updateUser({ ...res.user, access_token: data.access_token, refresh_token: refresh_token }));
  };
  // useEffect
  useEffect(() => {
    const { decoded, access_token } = handleDecoded();
    if (decoded && decoded.email) {
      handleGetDetailUser({ email: decoded.email, access_token });
    }
  }, []);

  // axios
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refresh_token = JSON.parse(storageRefreshToken);
      let decodedRefreshToken = jwtDecode(refresh_token);
      if (decoded && decoded.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken && decodedRefreshToken.exp > currentTime.getTime() / 100) {
          const data = await UserService.refreshToken({ email: decoded.email, refresh_token: refresh_token });
          config.headers["token"] = `Bearer ${data && data.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes &&
            routes.length > 0 &&
            routes.map((item, index) => {
              let Path = item.path;
              let Page = item.page;

              let Layout = item.layout === "l1" ? DefaultLayout : Fragment;

              return (
                <Route
                  key={index}
                  path={
                    item.isLogin
                      ? user.email !== ""
                        ? item?.isAdmin
                          ? user?.role === "R1"
                            ? Path
                            : ""
                          : Path
                        : ""
                      : Path
                  }
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
