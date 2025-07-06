import { Link, useNavigate } from "react-router-dom";
import './form.css'
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();

    const [error, setError] = useState('');

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:8000/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(!response.ok){
                setError(data.error || "Login failed");
                return;
            }

            login(data.token);
            navigate('/');
        } catch (err: any){
            setError("Error: " + err.message);
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <form aria-label='Login Form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' required onChange={handleChange} value={formData.email} />
                    <small>Please enter a valid email</small>
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required onChange={handleChange} value={formData.password} />
                    <small>Please enter a password</small>
                </div>

                {error && <small className="credentials">{error}</small>}
                <button type='submit'>Log In</button>
                <Link to='/register'>Resgister</Link>
            </form>
        </main>
    )
}

export default Login