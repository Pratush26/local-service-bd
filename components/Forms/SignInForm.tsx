"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginInput, loginSchema } from '@/schema/LogInSchma'
import '@/utils/styles/form.css'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function SignInForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })
  const router = useRouter()
  const formSubmit = async (data: LoginInput) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
      reset()
    } catch (err) {
      console.error(err)

    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full">
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
        <input type="email" {...register("email")} placeholder="Enter your email" id="email" />
      </div>
      <div className="w-full">
        {errors.password ? <p className="text-sm text-rose-600">{errors.password.message}</p> : <label htmlFor="password">password :</label>}
        <input type="password" {...register("password")} placeholder="Enter password" id="password" />
      </div>
      <button disabled={isSubmitting} className={`btn trns btn-primary mt-3`}>{isSubmitting ? "Loging in..." : "Login"}</button>
    </form>
  )
}