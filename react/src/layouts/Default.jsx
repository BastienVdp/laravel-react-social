import { Navigate, NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import logo from "../assets/logo.png"
import { ArrowRightOnRectangleIcon, BellIcon, ChatBubbleLeftRightIcon, Cog8ToothIcon, GlobeAltIcon, MagnifyingGlassIcon, Square2StackIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useEffect } from 'react'

const navigation = [
    {
        to: '/',
        name: 'Feed',
        icon: <Square2StackIcon />,
    },
    {
        to: '/community',
        name: 'Community',
        icon: <UsersIcon />,
    },
    {
        to: '/messages',
        name: 'Messages',
        icon: <ChatBubbleLeftRightIcon />,
    },
    // {
    //     to: '/notification',
    //     name: 'Notification',
    //     icon: <BellIcon />,
    // },
    {
        to: '/explore',
        name: 'Explore',
        icon: <GlobeAltIcon />,
    },
    {
        to: '/me',
        name: 'Profil',
        icon: <UserIcon />,
    },
    {
        to: '/settings',
        name: 'Settings',
        icon: <Cog8ToothIcon />,
    },
    {
        to: '/logout',
        name: 'Logout',
        icon: <ArrowRightOnRectangleIcon />,
    },
]

export default function Default() {

    const { userToken, setCurrentUser, setUserToken } = useStateContext()

    if(!userToken) return <Navigate to={'/login'} />

    const logout = e => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(response => {
                setCurrentUser({})
                setUserToken(null)
            })
    }

    return (
        <div className="font-lato">
            {/* Sidebar */}
            <div className="fixed left-0 right-0 md:top-0 bottom-0 w-full md:w-[200px] p-5 bg-white md:bg-none rounded-t-lg md:rounded-none">
                {/* Logo */}
                <img src={logo} alt="logo" className="md:block hidden mb-6"/>
                {/* Nav */}
                <nav className="w-full">
                    <ul className="flex flex-row gap-3 md:flex-col w-full">
                        {navigation.map((item, i) => (
                            <li className="w-full" key={i}>
                                <NavLink
                                    to={item.to}
                                    onClick={item.name === 'Logout' ? logout : null}
                                    className={({isActive}) => classNames("flex items-center flex-col md:flex-row gap-4 rounded-lg px-3 py-2 font-medium", {
                                        'bg-slate-600 text-white': isActive,
                                        'text-slate-500': !isActive
                                    })}
                                >
                                    <span className="w-6 mx-auto md:mx-0 block md:w-5">{item.icon}</span>
                                    <span className="text-sm md:text-base sm:block hidden">
                                        {item.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {/* Main Content */}
            <div className="md:ml-[200px] text-base">
                <header className="z-10 bg-white flex justify-between w-full md:w-auto md:fixed md:top-0 p-4 md:py-4 md:pr-4 md:right-0 md:left-[200px]">
                    <div className="w-2/3 flex gap-1 items-center bg-white rounded-lg border border-gray-300 pl-3 pr-1.5 py-1.5">
                        <MagnifyingGlassIcon className="w-5 text-gray-400"/>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for something here..."
                            className="border-none outline-none w-full text-gray-800"
                        />
                    </div>
                    <div>user</div>
                </header>
                <div className="pb-[200px] md:mt-[70px] md:pb-0 md:pr-4">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
