import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import {AuthContextProvider} from './Components/Store/AuthContext';
// import { TodoContextProvider } from './Components/Store/TodoContext';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const appRouter = createBrowserRouter([
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/',
    element:<App/>
  }
])
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <>

      
        <RouterProvider router={appRouter}/>
      
    
      </>
    </AuthContextProvider>
  </React.StrictMode>
);
