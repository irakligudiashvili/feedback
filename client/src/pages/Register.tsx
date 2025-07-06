import { useState } from 'react'
import './form.css'

function Register(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try{
            const response = await fetch('http://localhost:8000/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(!response.ok){
                setError(data.error || 'Registration failed');
                return;
            }

            setSuccess(data.message || 'Registered successfully');
            setFormData({firstName: '', lastName: '', email: '', password: ''});
        } catch (err: any){
            setError("Error: " + err.message);
        }
    }

    return (
        <main>
            <h1>Register</h1>

            <form aria-label='Registration Form' onSubmit={handleSubmit}>
                <div className='split'>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} required/>
                        <small>Please enter your first name</small>
                    </div>

                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} required />
                        <small>Please enter your last name</small>
                    </div>
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required/>
                    <small>Please enter a valid email</small>
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} required />
                    <small>Please enter a password</small>
                </div>

                {error && <small className='credentials'>{error}</small>}
                {success && <small className='credentials'>{success}</small>}
                <button type='submit'>Register</button>
            </form>
        </main>
    )
}

export default Register