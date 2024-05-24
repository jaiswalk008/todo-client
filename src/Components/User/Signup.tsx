import { useCallback, useState } from "react";
import Input from "../UI/Input";
import './userStyle.css';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const formSubmitHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setErrorMessage("Password should be at least 8 characters long");
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, formData);
            navigate('/login');
            console.log(res);
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || 'An error occurred');
        }
    }, [formData, navigate]);

    return (
        <div className="d-flex justify-content-center">
            <div className="container-fluid container-md mt-5">
                <div className="form-container">
                    <h3>Signup</h3>

                    {errorMessage && <p className="message">{errorMessage}</p>}

                    <form onSubmit={formSubmitHandler}>
                        <Input id="name" value={formData.name} label="Name" type="text" onChange={inputChangeHandler} />
                        <Input id="email" value={formData.email} label="Email" type="email" onChange={inputChangeHandler} />
                        <Input id="password" value={formData.password} label="Password" type="password" onChange={inputChangeHandler} />
                        <button className="btn mt-2 w-100">Signup</button>
                    </form>

                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
