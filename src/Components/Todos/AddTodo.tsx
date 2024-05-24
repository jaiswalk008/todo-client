import { useRef } from "react";
import TodoModal from "./TodoModal";

const AddTodo = (props:any) => {
  

  return (
    <div className="m-4 d-flex justify-content-center">
      <button type="button" id="open-modal" className="btn w-50 btn-dark" data-bs-toggle="modal" data-bs-target="#new-task">
        Create new task <i className="bi bi-plus-square"></i>
      </button>

      <TodoModal onSubmitHandler = {props.onSubmitHandler}/>
    </div>
  );
};

export default AddTodo;
