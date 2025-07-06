import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar(){
    return (
        <nav arial-label="Main navigation">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar