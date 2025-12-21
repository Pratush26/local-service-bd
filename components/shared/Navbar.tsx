import Link from "next/link";
import Navlink from "../Navlink";

export default function Navbar() {
    return (
        <header>
            <nav className="w-11/12 mx-auto py-4 text-sm font-medium flex justify-between items-center gap-3">
                <Link href='/'>Logo</Link>
                <div className="space-x-2">
                    <Navlink href="/">Home</Navlink>
                </div>
                <div className="space-x-2">
                    <Navlink href="/register">Register</Navlink>
                    <Navlink href="/signin">Sign In</Navlink>
                </div>
            </nav>
        </header>
    )
}