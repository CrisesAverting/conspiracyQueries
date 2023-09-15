// Bringing in the required import from 'react-router-dom'\
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function Header() {
    // The Navbar UI component will render each of the Link elements in the links prop
    return (
        <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
            <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
                <Link className="text-dark" to="/">
                    <h1 className="m-0" style={{ fontSize: '3rem' }}>
                        Conspiracies
                    </h1>
                </Link>
                <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                    For all your bunker needs
                </p>
                <div>
                    {Auth.loggedIn() ? (
                        <button className="btn btn-lg btn-light m-2" onClick={logout}>
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