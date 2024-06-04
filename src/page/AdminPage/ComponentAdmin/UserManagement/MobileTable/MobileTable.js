import "./MobileTable.scss";
import * as utilsFormat from "../../../../../utilsFormat";
import ModalUpdate from "../UserModal/ModalUpdate/ModalUpdate";
import { useState } from "react";
import ModalUpdateMobile from "../UserModal/ModalUpdateMobile/ModalUpdateMobile";
function MobileTable(props) {
  let [userDetailMobile, setUserDetailMobile] = useState({});
  return (
    <div className="mobile-table-container">
      <ModalUpdateMobile
        data={userDetailMobile}
        handleGetAllUser={props.handleGetAllUser}
        setIsLoading={props.setIsLoading}
      />
      <div className="mobile-table table-responsive">
        <div className="btn-download-xlsx">
          <button type="button" className="btn btn-success" onClick={() => props.exportFile()}>
            <i className="fa-solid fa-download"></i> Tải xuống .xlsx
          </button>
        </div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên người dùng</th>
              <th>Quyền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.length > 0 ? (
              props.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.displayName}</td>
                    <td>{utilsFormat.formatRole(item.role)}</td>
                    <td className="btn-container">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#updateUserModalMobile"
                        type="button"
                        onClick={() => setUserDetailMobile(item)}
                        className="btn btn-outline-primary"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => props.handleDeleteUser(item)}
                        className="btn btn-outline-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="no-data">
                  <i className="fa-solid fa-database"></i> Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MobileTable;
