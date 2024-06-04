import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { utils, writeFileXLSX } from "xlsx";

import LoadingComponent from "../../../../component/LoadingComponent/LoadingComponent";
import { useMutationHook } from "../../../../Hook/useMutationHook";
import * as utilsFormat from "../../../../utilsFormat";
import * as UserService from "../../../../Service/UserService";
import "./UserManagement.scss";
import MobileTable from "./MobileTable/MobileTable";
import ModalUpdate from "./UserModal/ModalUpdate/ModalUpdate";
import { toast } from "react-toastify";
function UserManagement() {
  let user = useSelector((state) => state.user);
  let [isLoading, setIsLoading] = useState(false);
  let [listUser, setListUser] = useState([]);
  let [userDetail, setUserDetail] = useState({});
  // call API
  let mutationGet = useMutationHook((data) => UserService.getAllUser(data));
  let dataListUser = mutationGet.data;
  let mutationDelete = useMutationHook((data) => UserService.deleteUserById(data));
  let dataDelete = mutationDelete.data;
  // function
  const handleGetAllUser = async () => {
    setIsLoading(true);
    await mutationGet.mutate({
      token: user && user?.access_token,
    });
  };

  const exportFile = useCallback(() => {
    // custom label data
    let customListUser = listUser.map((item) => ({
      "Tên Người dùng": item.displayName,
      "Địa chỉ Email": item.email,
      "Số điện thoại": item.phoneNumber,
      "Giới tính": utilsFormat.formatRole(item.gender),
      Quyền: utilsFormat.formatRole(item.role),
      "Ngày tạo": item.createdAt,
    }));
    // transform Json to XLSX
    let ws = utils.json_to_sheet(customListUser);
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "UserListTodo.xlsx");
  }, [listUser]);

  const handleDeleteUser = async (item) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này")) {
      setIsLoading(true);
      await mutationDelete.mutate({
        id: item.id,
        email1: item.email,
        email: user?.email,
        token: user?.access_token,
      });
    }
  };

  // useEffect
  useEffect(() => {
    handleGetAllUser();
  }, []);

  useEffect(() => {
    if (dataListUser && dataListUser?.status === "OK") {
      setListUser(dataListUser?.data);
      setIsLoading(false);
    } else {
      setListUser(dataListUser?.data);
      setIsLoading(false);
    }
  }, [dataListUser]);
  useEffect(() => {
    if (dataDelete && dataDelete.status === "OK") {
      toast.success("Xóa người dùng thành công!");
      handleGetAllUser();
    }
    if (dataDelete && dataDelete?.status === "ERROR") {
      toast.error("Xóa người dùng thất bại!");
      setIsLoading(false);
    }
  }, [dataDelete]);
  return (
    <div className="user-management-container">
      {isLoading === true && <LoadingComponent />}

      <div className="modal-user-container">
        <ModalUpdate data={userDetail} handleGetAllUser={handleGetAllUser} setIsLoading={setIsLoading} />
      </div>
      <div className="user-management-table table-responsive">
        <div className="download-button">
          <button type="button" className="btn btn-outline-success" onClick={() => exportFile()}>
            <i className="fa-solid fa-file-arrow-down"></i> Tải xuống bản .xlsx
          </button>
        </div>
        <table className="table table-hover table-striped col col-12">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên người dùng</th>
              <th scope="col">Địa chỉ Email</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Quyền</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listUser && listUser?.length > 0 ? (
              listUser?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.displayName}</td>
                    <td>{item?.email}</td>
                    <td>{utilsFormat.formatGender(item?.gender)}</td>
                    <td>{utilsFormat.formatRole(item?.role)}</td>
                    <td>{item?.phoneNumber}</td>
                    <td className="btn-container">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateUserModal"
                        onClick={() => setUserDetail(item)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(item)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td style={{ fontSize: "1.5rem", textAlign: "center" }}>
                  <i className="fa-solid fa-database" style={{ fontSize: "1.5rem" }}></i> Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="user-management-table-mobile">
        <MobileTable
          handleGetAllUser={handleGetAllUser}
          setIsLoading={setIsLoading}
          data={listUser}
          exportFile={exportFile}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default UserManagement;
