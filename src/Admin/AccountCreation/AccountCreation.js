import Header from "../Header/Header";
import accountCreation from "./account.svg";
import { Link } from "react-router-dom";
function AccountCreation(){
    
    return(
        <>
        <Header/>
            <div className="adminIntro-outer-container">
                <div className="adminIntro-inner-container">
                    <div className="adminIntro-option">
                        <Link to="/admin/accountcreation" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={accountCreation} alt="account-creation" className="employee-image"/>
                                <p className="admin-intro-header">Admin Account Creation</p >
                            </div>
                        </Link>
                    </div>
                    <div className="adminIntro-option">
                        <Link to="/admin/empaccountcreation" className="admin-intro-label">
                            <div className="options-outer-container">
                                <img src={accountCreation} alt="account-creation" className="employee-image"/>
                                <p className="admin-intro-header">Employee Account Creation</p >
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AccountCreation