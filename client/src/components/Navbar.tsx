import { Link } from 'react-router-dom'
import './navbar.css'
import { useAuth } from '../contexts/AuthContext'

function Navbar(){
    const {isLoggedIn, logout} = useAuth();

    return (
        <nav arial-label="Main navigation">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>

                {isLoggedIn ? (
                    <li>
                        <Link to='/' onClick={logout}>Logout</Link>
                    </li>
                ) : (
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar