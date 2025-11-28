"use client";
import { apiFetch } from '@/services/apiFetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const LoginForm = () => {

    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: form
            })
            if (res?.loggedUser) return router.push("/jobs")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleLogin} className="mt-10">
            <ul className='max-w-[700px] m-auto'>
                <li className="w-full relative">
                    <label className="absolute -top-8">Email</label>
                    <input
                        name='email'
                        type="email"
                        onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-sm focus:outline-slate-400"
                    />
                </li>
                <li className="w-full relative mt-10">
                    <label className="absolute -top-8">Password</label>
                    <input
                        name='password'
                        type="password"
                        onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-sm focus:outline-slate-400"
                    />
                </li>
                
                <li className='my-5 flex justify-between'>
                    <Link href={"#"}>Forgot password?</Link>
                    <Link href={"/register"}>Register Account</Link>
                </li>

                <li>
                    <button className="w-full bg-slate-300 py-2 text-xl font-medium cursor-pointer rounded-sm">Login</button>
                </li>
            </ul>
        </form>
    )
}

export default LoginForm