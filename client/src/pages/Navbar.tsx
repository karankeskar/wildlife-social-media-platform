import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export default function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    function redirecttoSignup() {
        navigate('/signup');
    }
    
    function redirecttoLogin() {
        navigate('/login');
    }


    return (
        <nav className="flex justify-between items-center gap-2 py-0 px-4 bg-white">
            <a href="/" className="text-[2rem]">NatureConnect</a>
            
            <ul className="px-0 py-0 list-none flex gap-2">
                {isLoggedIn ? (
                    <>
                        <li>
                            <Button onClick={logout}>
                                Logout
                            </Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Button onClick={redirecttoSignup}>Sign Up</Button>
                        </li>
                        <li>
                            <Button onClick={redirecttoLogin}>Log In</Button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}