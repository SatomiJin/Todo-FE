import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as TodoService from "../../../Service/TodoService";
import { useMutationHook } from "../../../Hook/useMutationHook";
import "./ViewTodoModal.scss";
function ViewTodoModal(props) {
  let user = useSelector((state) => state.user);
  let [detailTodo, setDetailTodo] = useState({
    todoTitle: "",
    contentHTML: "",
    status: false,
    id: "",
  });
  //call API
  const mutation = useMutationHook((data) => TodoService.updateTodo(data));
  let { data } = mutation;
  // function
  const handleOnchangeStatus = (e) => {
    let copyState = { ...detailTodo };
    copyState[e.target.name] = e.target.value;
    setDetailTodo({
      ...copyState,
    });
  };
  const handleUpdateStatus = async () => {
    props.handleSetLoading(true);
    await mutation.mutate({
      status: detailTodo?.status,
      email: user && user?.email,
      token: user && user?.access_token,
      id: detailTodo && detailTodo?.id,
    });
  };
  useEffect(() => {
    if (props && props?.data?.id) {
      setDetailTodo({
        todoTitle: props?.data.todoTitle,
        contentHTML: props?.data.contentHTML,
        status: props?.data.status,
        id: props?.data.id,
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (data && data.status === "OK") {
      toast.success("Cập nhật thông tin thành công!!!");
      props.handleSetLoading(false);
    }
    if (data && data.status === "ERROR") {
      toast.error("Cập nhật thông tin thất bại!!");
      props.handleSetLoading(false);
    }
  }, [data]);
  return (
    <div className="view-todo-modal-container">
      <div
        className="modal fade"
        id="viewTodoModal"
        tabIndex="-1"
        aria-labelledby="viewTodoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewTodoModalLabel">
                Thông tin công việc
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row">
              <div className="form-group col col-6">
                <label>Tiêu đề công việc</label>
                <div className="text">{detailTodo && detailTodo.todoTitle}</div>
              </div>
              <div className="form-group col col-6">
                <label>
                  Trạng thái công việc
                  <select
                    name="status"
                    onChange={(e) => handleOnchangeStatus(e)}
                    value={detailTodo && detailTodo?.status}
                    className="form-select"
                  >
                    <option value={true}>Đã hoàn thành</option>
                    <option value={false}>Đang thực hiện</option>
                  </select>
                </label>
              </div>
              <div className="detail-todo form-group col col-12">
                <label>Chi tiết công việc</label>
                <div className="content-html" dangerouslySetInnerHTML={{ __html: detailTodo?.contentHTML }}></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#viewTodoModal"
                type="button"
                onClick={() => handleUpdateStatus()}
                className="btn btn-primary"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTodoModal;
