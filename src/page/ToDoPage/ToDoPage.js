import ToDoComponent from "../../component/ToDoComponent/ToDoComponent";
import "./ToDoPage.scss";
function ToDoPage() {
  return (
    <div className="todo-page-container">
      <div className="todo-wrapper row">
        <div className="todo-header col col-12">
          <ToDoComponent />
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
