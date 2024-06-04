import { useState } from "react";
import ListToDo from "./ListToDo/ListToDo";
import ToDoModal from "./TodoModal/ToDoModal";
import "./ToDoComponent.scss";
function ToDoComponent() {
  let [addNewTodo, setAddNewTodo] = useState(false);

  const handleAddNewTodo = (status) => {
    setAddNewTodo(status);
  };
  return (
    <div className="todo-component-container">
      <div className="row">
        <div className="add-todo col col-12">
          <button className="btn btn-add-todo" type="button" data-bs-toggle="modal" data-bs-target="#addToDo">
            <i className="fa-solid fa-file-circle-plus"></i> Thêm công việc
          </button>
          <ToDoModal handleAddNewTodo={handleAddNewTodo} />
        </div>
        <div className="list-todo col col-12">
          <ListToDo handleAddNewTodo={handleAddNewTodo} addNewTodo={addNewTodo} />
        </div>
      </div>
    </div>
  );
}

export default ToDoComponent;
