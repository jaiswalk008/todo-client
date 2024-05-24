
import { useState, useCallback, useEffect , useContext} from 'react';
 import AddTodo from './AddTodo';
 import TodoList from './TodoList';
import './todo.css';
import axios from 'axios';
import { AuthContext } from '../Store/AuthContext';

const Todo= (props:any) =>{

  const [pendingTodos, setPendingTodos] = useState<any>([]);
  const [completedTodos, setCompletedTodos] = useState<any>([]);
  const [showPendingTasks, setShowPendingTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    const authCtx = useContext(AuthContext)

  const addToList =async (todo:any) =>{
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`,todo,{
        headers:{Authorization:authCtx.token}
    })
      setPendingTodos((prevTodos:any) => [...prevTodos, response.data]);
      
    } catch (error) {
      console.log(error);
    }
  }
  const fetchTodos = useCallback(async ()=> {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo`,{
            headers:{Authorization:authCtx.token}
        })
        const pending = res.data.filter((todo: any) => !todo.completed);
        const completed = res.data.filter((todo: any) => todo.completed);

        // Set pending and completed todos state
        setPendingTodos(pending);
        setCompletedTodos(completed);
    }
    catch(err){
        console.log(err);
    }
  },[authCtx])

  useEffect(()=>{
    fetchTodos();
  },[fetchTodos])

  const togglePendingTasks = () => {
    setShowPendingTasks(true);
    setShowCompletedTasks(false);
  };

  const toggleCompletedTasks = () => {
    setShowPendingTasks(false);
    setShowCompletedTasks(true);
  };
  return (
    <>
      {showPendingTasks && <AddTodo onSubmitHandler = {addToList}/>}
      <div className="d-flex justify-content-center fw-bold fs-3">
          <button onClick={togglePendingTasks} className='btn me-3'>Pending Tasks</button>
          <button onClick={toggleCompletedTasks} className='btn'>Completed Tasks</button>
         </div><hr/>

         {showPendingTasks && <TodoList todos={pendingTodos} setPendingTodos={setPendingTodos} setCompletedTodos={setCompletedTodos}  completedTodos={completedTodos}/>}
         {!showPendingTasks && <TodoList  todos={completedTodos}/>}
    </>
  )
}
export default Todo;