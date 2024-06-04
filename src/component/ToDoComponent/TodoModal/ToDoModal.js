import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as TodoService from "../../../Service/TodoService";
import { useMutationHook } from "../../../Hook/useMutationHook";
import "./ToDoModal.scss";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

function ToDoModal(props) {
  let [todoInfo, setTodoInfo] = useState({
    contentMarkdown: "",
    contentHTML: "",
    todoTitle: "",
  });
  let [isLoading, setIsLoading] = useState(false);
  let mdParser = new MarkdownIt();
  let user = useSelector((state) => state.user);

  //call API
  let mutation = useMutationHook((data) => TodoService.createTodo(data));
  let { data } = mutation;

  // onchange
  const handleOnChangeText = (e) => {
    setTodoInfo({
      ...todoInfo,
      todoTitle: e.target.value,
    });
  };
  const handleOnchangeEditor = ({ title, html, text }) => {
    setTodoInfo({
      ...todoInfo,
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  // function
  const resetModal = () => {
    setTodoInfo({
      todoTitle: "",
      contentHTML: "",
      contentMarkdown: "",
    });
  };

  const handleAddToDo = async () => {
    setIsLoading(true);
    await mutation.mutate({
      email: user && user.email,
      token: user && user.access_token,
      contentMarkdown: todoInfo?.contentMarkdown,
      contentHTML: todoInfo?.contentHTML,
      todoTitle: todoInfo?.todoTitle,
    });
  };

  // useEffect
  useEffect(() => {
    if (data && data.status === "OK") {
      toast.success("Thêm công việc thành công");
      props.handleAddNewTodo(true);
      setIsLoading(false);
      resetModal();
    }
    if (data && data.status === "ERROR") {
      setIsLoading(false);
      toast.warning("Thêm công việc thất bại!");
    }
  }, [data]);
  return (
    <div className="add-todo-modal-container">
      {isLoading === true && <LoadingComponent />}
      <div className="modal fade" id="addToDo" tabIndex="-1" aria-labelledby="addToDo" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addToDo">
                Thêm công việc cần làm
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="form-group">
                  <label htmlFor="title">Tiêu đề:</label>
                  <input
                    type="text"
                    name="todoTitle"
                    value={todoInfo.todoTitle}
                    onChange={(e) => handleOnChangeText(e)}
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="desc">Mô tả:</label>
                  {/* <input type="text" name="desc" id="desc" className="form-control desc" /> */}
                  <MdEditor
                    value={todoInfo.contentMarkdown}
                    className="mdEditor"
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleOnchangeEditor}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="button" data-bs-dismiss="modal" onClick={() => handleAddToDo()} className="btn btn-primary">
                Thêm công việc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoModal;
