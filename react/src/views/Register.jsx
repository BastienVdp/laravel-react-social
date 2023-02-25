
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from "../axios"
import { useStateContext } from '../contexts/ContextProvider'

export default function Register()
{
    const { setCurrentUser, setUserToken } = useStateContext()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [errors, setErrors] = useState({})

    const onSubmit = e => {
        e.preventDefault()
        setErrors({})
        axiosClient.post('/register', {
            name: username,
            email,
            password,
            password_confirmation: repassword
        })
        .then(({data}) => {
            setCurrentUser(data.user)
            setUserToken(data.token)
        })
        .catch((error) => {
            if(error?.response) {
                setErrors({...errors, ...error.response.data.errors})
            }
        })
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register for free
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                login to your account
            </Link>
            </p>
            <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                        />
                        {errors?.email && errors.email}
                    </div>
                    <div>
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <input
                            id="username"
                            name="name"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Username"
                        />
                        {errors?.name && errors.name}
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                        {errors?.password && errors.password.map((error) => (
                            <div className="text-red-500 font-medium text-xs block">
                                {error}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="repassword" className="sr-only">
                            Password Confirmation
                        </label>
                        <input
                            id="repassword"
                            name="repassword"
                            type="password"
                            value={repassword}
                            onChange={e => setRepassword(e.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password Confirmation"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </>
    )
}


