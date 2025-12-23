import Link from "next/link";
import Navlink from "../Navlink";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
    const session = await auth()
    return (
        <header>
            <nav className="w-11/12 mx-auto py-4 text-sm font-medium flex justify-between items-center gap-3">
                <Link href='/' className="flex items-center justify-center gap-2">
                    <Image src={"/logo.svg"} width={40} height={40} alt="logo" style={{ objectFit: "cover" }} className="aspect-square" />
                    <span className="text-xl font-semibold">Local Service BD</span>
                </Link>
                <div className="space-x-2">
                    <Navlink href="/">Home</Navlink>
                </div>
                {
                    session?.user ?
                        <div className="flex items-center justify-center gap-2">
                            <Image src={session?.user?.image as string} height={40} width={40} style={{ objectFit: "cover" }} alt="user image" className="rounded-full aspect-square" />
                            <Navlink href="/dashboard">Dashboard</Navlink>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <button className="btn btn-primary trns rounded-md">Log Out</button>
                            </form>
                        </div>
                        :
                        <div className="space-x-2">
                            <Navlink href="/register">Register</Navlink>
                            <Navlink href="/signin">Sign In</Navlink>
                        </div>
                }
            </nav>
        </header>
    )
}