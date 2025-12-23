import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="w-full px-4 py-6 space-y-4 text-white">
            <footer className="grid grid-cols-4 w-11/12 mx-auto text-sm font-medium">
                <Link href="/" className="flex gap-2 items-center">
                    <Image src={"/logo.svg"} height={40} width={40} style={{ objectFit: "contain" }} alt="Logo" className="" />
                    <h5 className="text-xl font-semibold">Local Service BD</h5>
                </Link>
                <div className="flex flex-col gap-2">
                    <Link className="trns hover:text-gray-500 w-fit" href="/">Home</Link>
                    <Link className="trns hover:text-gray-500 w-fit" href="/all-products">All Products</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <Link className="trns hover:text-gray-500" href="/register">Register</Link>
                    <Link className="trns hover:text-gray-500" href="/login">Login</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-xl font-semibold">Social Links</h5>
                    <span className="flex gap-2 text-xl">
                        <a className="trns hover:text-gray-500 w-fit" href="http://facebook.com" target="_blank"><FaFacebook /></a>
                        <a className="trns hover:text-gray-500 w-fit" href="http://instagram.com" target="_blank"><AiFillInstagram /></a>
                        <a className="trns hover:text-gray-500 w-fit" href="http://twitter.com" target="_blank"><FaSquareXTwitter /></a>
                    </span>
                </div>
            </footer>
            <p className="text-xs font-medium text-center">&copy; 2026 copyright | All rights are reserved by Hero Kidz</p>
        </section>
    )
}