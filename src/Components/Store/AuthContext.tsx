import React , {  useState } from 'react';

export const AuthContext = React.createContext({
    isLoggedin:false,
    setToken:(token:string | null) =>{},
    token:'' as string | null,
    logout : () =>{},
})
export const AuthContextProvider = (props:any) =>{

    const initialToken = localStorage.getItem('token');
    const [token , setToken] = useState<string | null>(initialToken);

    const userLoggedIn = !!token;
    
    const tokenHandler= (newToken:string | null) =>{
        setToken(newToken);
        localStorage.setItem('token',newToken as string);
    }
    const logoutHandler = () =>{
        setToken(null);
        localStorage.removeItem('token');
    }

    const authContext = {
        isLoggedin:userLoggedIn,
        setToken:tokenHandler,
        token:token,
        logout:logoutHandler,
    };

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    
}
