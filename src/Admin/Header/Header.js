
import "./Header.css";
import {Link, useNavigate} from "react-router-dom";
import menu from "./menuuu.svg"
function Header(){
    const navigate=useNavigate();
    const navbaropen =()=>{
        var open=document.getElementById("navbar").classList.toggle("options-nav");
    }
    const signout=()=>{
        localStorage.clear();
        navigate("/admin/login");
    }
    return(
        <>
        <div className="header">
            <div className="div-icon"><span className="icon">SR</span></div>
            <nav id="navbar">
                <ul>
                    <h1 className="header-employee-label">
                        <Link to="/admin/intro" className="header-label"> 
                            Home
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <h1 className="header-employee-label">
                        <Link to="/admin/attendancecheck" className="header-label">
                            Attendance
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <h1 className="header-employee-label">
                        <Link to="/admin/leavelist" className="header-label">
                            Leave Requests
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <h1 className="header-employee-label">
                        <Link to="/admin/accountcreationintro" className="header-label">
                            Account Creation
                        </Link>
                    </h1>
                </ul>
                <ul>
                    <div className="options">
                        <button className="sign-out-button" onClick={signout}>Log out</button>
                    </div>
                </ul>
            </nav>
            <img  src={menu} className="menu" onClick={navbaropen}/>
        </div>
        </>
    )
}


export default Header;