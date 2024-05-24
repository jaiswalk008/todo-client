
import './App.css';
import { Navigate } from 'react-router-dom';
import Signup from './Components/User/Signup';
import { useContext } from 'react';
import { AuthContext } from './Components/Store/AuthContext';
import Login from './Components/User/Login';
import Todo from './Components/Todos/Todo';
function App() {
  const authCtx = useContext(AuthContext);
  return ( 
    !authCtx.token ? <Navigate to="/login" /> :(
      <Todo/>
    )
  );
}

export default App;
