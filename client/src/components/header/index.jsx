// Bringing in the required import from 'react-router-dom'\
import './style.css';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function Header() {
    // The Navbar UI component will render each of the Link elements in the links prop
    const logout =(e)=>{
        e.preventDefault()
        Auth.logout()
    }
    return (
        <header className=" text-dark mb-4 py-3 display-flex align-center">
            <div className="container">
                <Link className="text-dark" to="/">
                    <h1 className="m-0" style={{ fontSize: '1rem' }}>
                        
                    </h1>
                </Link>
                <p className="m-0" style={{ fontSize: '1rem', fontWeight: '700' }}>
                    
                </p>
                <div>
                    {Auth.loggedIn() ? (
                            <Link className="btn btn-lg btn-light m-2" to="/Dashboard">
                                Dashboard
                            </Link>
                    ) : (
                        <>
                        </>
                    )}
                    {Auth.loggedIn() ? (
        
                            <Link className="btn btn-lg btn-light m-2" to="/shop">
                                Shop
                            </Link>
                    ) : (
                        <>
                        </>
                    )}
                    {Auth.loggedIn() ? (
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Cart
                            </Link>
                    ) : (
                        <>
                        </>
                    )}
                    {Auth.loggedIn() ? (
                        <button className="btn btn-lg btn-primary m-2" onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link className="btn btn-lg btn-primary m-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}