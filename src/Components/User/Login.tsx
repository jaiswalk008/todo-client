import { useCallback, useState,useContext } from "react";

import Input from "../UI/Input";
import './userStyle.css';
import axios from "axios";

import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../Store/AuthContext";

const Login = () => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [errorMessage , setErrorMessage] = useState<string>('');

    const navigate = useNavigate()
    const authCtx = useContext(AuthContext);

    const emailChangeHandler = (event:any) => setEmail(event.target.value);
    const passwordChangeHandler = (event:any) => setPassword(event.target.value);

    const formSubmitHandler = useCallback(async (e:any) =>{
        e.preventDefault();
        const userDetails :{email:string,password:string} = {
            email:email,
            password:password,
        }
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,userDetails);
            console.log(res.data);
            authCtx.setToken(res.data.token);
            navigate('/');
        }
        catch(err:any){
            console.log(err);
            setErrorMessage(err.response.data.message);
        }

    },[email,password,authCtx,navigate])
    
    return (
        <>
       
            <div className="d-flex justify-content-center">
                <div className="container-fluid container-md mt-5 ">
                    <h3>Login</h3>
                    {errorMessage.length>0  && <div className="message">{errorMessage}</div>}
                    <form onSubmit={formSubmitHandler} className="form p-2 m-2">
                        <Input id="email" value={email} label="Email" type="email" onChange={emailChangeHandler} />
                        
                        <Input id="password" value={password} label="Password" type="password" onChange={passwordChangeHandler} />
                        <button type="submit" className="btn w-100 mt-3" >Login</button>
                    </form>
                    
                    <div className="text-center">Don't have an account? <Link className="mt-3" to="/signup">Signup</Link></div>
                </div>
            </div>
        </>
    )
}
export default Login;