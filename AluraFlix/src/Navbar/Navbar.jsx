    import logo from '../assets/logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiCirclePlus } from "react-icons/ci";



export default function Navbar() {
    const location = useLocation();
    let isHome = location.pathname == "/";
    
    return (
        <nav>
            <img src={logo} />
            <ul className='navActions'>
                <Link to="/"><li className={`action ${isHome ? 'active' : ''}`}><GoHome size={40}/> Home</li></Link>
                <Link to="/nuevo"><li className={`action ${!isHome ? 'active' : ''}`}><CiCirclePlus size={40}/> Nuevo Video</li></Link>
            </ul>
        </nav>
    )   
}