// import '../../style.css';
import Auth from "../utils/auth";
// import { Link } from "react-router-dom";
export default function Dashboard() {
Auth.loggedIn()
    return (
        <>
            <p>
                Welcome to your dashboard 
            </p>
        </>

    );
}