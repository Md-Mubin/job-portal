"use client";
import { apiFetch } from "@/services/apiFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {

    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        skills: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiFetch("/auth/register", {
                method: "POST",
                body: form
            })

            if (res?.mag) {
                setForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    skills: ""
                })
            }
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10">
            <ul className='max-w-[700px] m-auto'>
                <li className="w-full relative">
                    <label className="absolute -top-8">Name</label>
                    <input
                        name='name'
                        type="text"
                        onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-sm focus:outline-slate-400"
                    />
                </li>
                <li className="w-full relative mt-10">
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

                <li className="mt-10">
                    <select name="role" onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-sm focus:outline-slate-400 cursor-pointer">
                        <option hidden>Select Role</option>
                        <option value={"jobSeeker"}>Job Seeker</option>
                        <option value={"employer"}>Employer</option>
                    </select>
                </li>

                <li className='my-5 text-end'>
                    <Link href={"/login"}>Already have account? Go to Login</Link>
                </li>

                <li>
                    <button className="w-full bg-slate-300 py-2 text-xl font-medium cursor-pointer rounded-sm">Register</button>
                </li>
            </ul>
        </form>
    )
}

export default RegisterForm