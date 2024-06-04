import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import MarkdownIt from "markdown-it/lib/index.mjs";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";

import TodoContext from "../TodoContext/TodoContext";
import * as TodoService from "../../../Service/TodoService";
import { useMutationHook } from "../../../Hook/useMutationHook";
import "./UpdateTodoModal.scss";

function UpdateTodoModal(props) {
  let [todoInfo, setTodoInfo] = useState({
    contentMarkdown: props.detailTodo.contentMarkdown,
    contentHTML: props.detailTodo.contentHTML,
    todoTitle: props.detailTodo.todoTitle,
  });
  let mdParser = new MarkdownIt();
  let user = useSelector((state) => state.user);
  // call API
  let mutationUpdate = useMutationHook((data) => TodoService.updateTodo(data));
  let { data } = mutationUpdate;
  // function
  const handleOnchangeText = (e) => {
    let copyState = { ...todoInfo };
    copyState[e.target.name] = e.target.value;
    setTodoInfo({
      ...copyState,
    });
  };

  const handleOnchangeMarkdown = ({ html, text }) => {
    setTodoInfo({
      ...todoInfo,
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  const handleUpdateTodo = async () => {
    props.handleSetLoading(true);
    await mutationUpdate.mutate({
      todoTitle: todoInfo.todoTitle,
      contentHTML: todoInfo.contentHTML,
      contentMarkdown: todoInfo.contentMarkdown,
      id: props.detailTodo.id,
      token: user && user?.access_token,
      email: user && user?.email,
    });
  };
  // useEffect
  useEffect(() => {
    if (data && data.status === "OK") {
      toast.success("Cập nhật thông tin thành công!");
      props.handleGetTodoUser(3);
      props.handleSetLoading(false);
    }
    if (data && data.status === "ERROR") {
      toast.warning("Cập nhật thông tin thất bại!!");
      props.handleSetLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (props.detailTodo && props.detailTodo.title !== "") {
      setTodoInfo({
        contentMarkdown: props.detailTodo.contentMarkdown,
        contentHTML: props.detailTodo.contentHTML,
        todoTitle: props.detailTodo.todoTitle,
      });
    }
  }, [props.detailTodo]);
  return (
    <div className="update-todo-modal">
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="updateModal"
                style={{ width: "100%", textTransform: "uppercase", textAlign: "center", fontWeight: "700" }}
              >
                Sửa đổi thông tin công việc
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="titleTodo">Tiêu đề</label>
                  <input
                    value={todoInfo.todoTitle}
                    type="text"
                    id="todoTitle"
                    name="todoTitle"
                    className="form-control"
                    onChange={(e) => handleOnchangeText(e)}
                  />
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <MdEditor
                    value={todoInfo.contentMarkdown}
                    className="mdEditor"
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleOnchangeMarkdown}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                onClick={() => handleUpdateTodo()}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodoModal;
