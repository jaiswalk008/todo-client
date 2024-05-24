import { useContext, useCallback } from "react";
// import { TodoContext, TodoInterface } from "../Store/TodoContext";
import axios from "axios";

const TodoList = (props: any) => {
  const { todos } = props;

  const showInCompleted = (id: number) => {
    const todoCompleted = todos.filter((todo:any) => todo.id===id)[0];
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    props?.setPendingTodos(newTodos);
    console.log(todoCompleted);
    props?.setCompletedTodos([...props.completedTodos , todoCompleted]);
  };
  async function deleteTodo(id: number) {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    props?.setPendingTodos(newTodos);
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todo?id=${id}`);
  }

  const markTodoAsCompleted = async (id: number) => {
    try {
      showInCompleted(id);
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/todo?id=${id}`, {
        completed: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="container d-flex flex-wrap " id="task-list">
        {
          todos.map((todo: any) => {
           
            return (
                 
              <div key={todo.id} className="task">
                <h4 style={{ color: "black" }}>{todo.title}</h4>
                <section>{todo.date}</section>
                <p>{todo.description}</p>

               
                {
  !todo.completed && (
    <div className="float-end">
      <i
        onClick={() => markTodoAsCompleted(todo.id)}
        className="bi bi-check"
      ></i>
      <i
        onClick={() => deleteTodo(todo.id)}
        className="bi me-2 bi-trash"
      ></i>
    </div>
  )
}

                
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TodoList;
