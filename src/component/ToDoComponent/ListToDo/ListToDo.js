import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import format from "date-format";

import { useMutationHook } from "../../../Hook/useMutationHook";
import * as TodoService from "../../../Service/TodoService";
import "./ListToDo.scss";
import ViewTodoModal from "../TodoModal/ViewTodoModal";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import UpdateTodoModal from "../TodoModal/UpdateTodoModal";
import { toast } from "react-toastify";

function ListToDo(props) {
  let user = useSelector((state) => state.user);
  let [listTodoUser, setListTodoUser] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [detailTodo, setDetailTodo] = useState({});
  // set useState
  const handleSetDetailTodo = (item) => {
    setDetailTodo({ ...item });
  };
  const handleSetLoading = (status) => {
    setIsLoading(status);
  };
  // call API
  let mutation = useMutationHook((data) => TodoService.getTodoByUser(data));
  let { data } = mutation;

  let mutationDelete = useMutationHook((data) => TodoService.deleteTodoById(data));
  let dataDelete = mutationDelete.data;
  //function
  const handleGetTodoUser = async () => {
    setIsLoading(true);
    if (user && user.email !== "" && user.access_token !== "") {
      await mutation.mutate({
        email: user && user.email,
        token: user && user.access_token,
      });
    }
  };
  const handleDeleteTodo = async (item) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      setIsLoading(true);
      await mutationDelete.mutate({
        id: item.id,
        email: user?.email,
        token: user?.access_token,
      });
    }
  };
  // useEffect
  useEffect(() => {
    if ((user && user.email && user.access_token) || props.addNewTodo === true) {
      handleGetTodoUser();
    }
  }, [user, props.addNewTodo]);
  useEffect(() => {
    if (data && data.status === "OK") {
      setIsLoading(false);
      props.handleAddNewTodo(false);
      setListTodoUser(data && data.list);
    }
    if (data && data.status === "ERROR") {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    if (dataDelete && dataDelete.status === "OK") {
      handleGetTodoUser();
      toast.success("Xóa công việc thành công!");
    }
    if (dataDelete && dataDelete === "ERROR") {
      toast.error("Xóa thất bại, thử lại sau!");
      setIsLoading(false);
    }
  }, [dataDelete]);
  return (
    <div className="list-todo-container">
      <ViewTodoModal handleSetLoading={handleSetLoading} data={detailTodo} />
      <UpdateTodoModal
        handleGetTodoUser={handleGetTodoUser}
        handleSetLoading={handleSetLoading}
        detailTodo={detailTodo}
      />
      {isLoading === true && <LoadingComponent />}
      {/* <LoadingComponent /> */}
      {listTodoUser && listTodoUser.length > 0 ? (
        listTodoUser.map((item, index) => {
          return (
            <div className="list-todo-item" key={index}>
              <div className="todo-item-container">
                <div className="todo-numerical">{index + 1}</div>
                <div className="todo-title">{item.todoTitle}</div>
                <div className="todo-created-at">
                  {format("hh:mm", new Date(item.createdAt))} - {format("dd/MM/yyyy", new Date(item.createdAt))}
                </div>
                <div className="todo-action">
                  <button
                    data-bs-toggle="modal"
                    onClick={() => handleSetDetailTodo(item)}
                    data-bs-target="#viewTodoModal"
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-regular fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={() => handleSetDetailTodo(item)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => handleDeleteTodo(item)} type="button" className="btn btn-danger">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-data">
          <i className="fa-solid fa-database"></i> Chưa có dữ liệu
        </div>
      )}
    </div>
  );
}

export default ListToDo;
