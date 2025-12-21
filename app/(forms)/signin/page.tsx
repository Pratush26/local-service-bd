import { signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import SignInForm from "@/components/Forms/SignInForm"

export default function LoginPage() {
    return (
        <main className="my-10">
            <h1 className="text-4xl font-semibold text-center m-6">Login</h1>
            <section className="bg-(--base-200) flex flex-col w-1/3 mx-auto items-center gap-2 p-6 rounded-2xl">
                <SignInForm />
                <form className="mx-auto w-fit m-2"
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button type="submit" className="trns btn btn-out flex gap-2 items-center"><FcGoogle /> Signin with Google</button>
                </form>
                <p className="text-xs space-x-1">
                    <span>Do not have any account?</span>
                    <Link href="/register" className="text-blue-500 font-medium trns hover:text-blue-700">Register</Link>
                </p>
            </section>
        </main>
    )
}