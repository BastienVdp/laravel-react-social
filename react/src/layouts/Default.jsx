import { Navigate, NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import logo from "../assets/logo.png"
import { ArrowRightOnRectangleIcon, BellIcon, ChatBubbleLeftRightIcon, Cog8ToothIcon, GlobeAltIcon, MagnifyingGlassIcon, Square2StackIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useState, useEffect } from 'react'

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
        to: '/profile',
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

    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext()

    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([{}])

    useEffect(() => {
        if(search) {
            const timeOutId = setTimeout(() => search !== '' ? fetchData() : null, 500);
            return () => clearTimeout(timeOutId)
        }

    }, [search])

    const fetchData = async () => {
        await axiosClient.get(`/search/${search}`)
        .then((res) => {
            setDataSearch(res.data.data)
        })
        .catch(err => setDataSearch([]))
    }

    const logout = async e => {
        e.preventDefault()
        await axiosClient.post('/logout')
            .then(response => {
                setCurrentUser({})
                setUserToken(null)
            })
    }

    if(userToken === null) return <Navigate to="/login" />

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
                                    onClick={item.name === 'Logout' ? e => logout(e) : null}
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
            <div className="md:ml-[200px] text-base pr-4 px-4 md:px-0">
                <header className="z-10 bg-white flex justify-between w-full py-4">
                    <div className="relative w-2/3 h-9 flex gap-1 items-center bg-white rounded-lg border border-gray-300 pl-3 pr-1.5 py-1.5">
                        <MagnifyingGlassIcon className="w-5 text-gray-400"/>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for something here..."
                            onChange={e => {
                                e.preventDefault()
                                setSearch(e.target.value)
                            }}
                            autoComplete={"off"}
                            className="border-none outline-none w-full text-gray-800"
                        />
                        {dataSearch.length > 0 && search !== '' ?
                        <div className="absolute top-10 left-0 bg-white p-4 right-0 rounded-lg z-10">
                            <ul>
                                {dataSearch?.map((result, i) => (
                                    <li key={i}>
                                        <Link reloadDocument to={`/profile/${result.id}`} onClick={() => setDataSearch([])}>
                                            {result.username}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        : null}
                    </div>
                    <div>{currentUser.username}</div>
                </header>
                <div className="pb-[200px]">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
