import React from 'react'
import { NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon, BellIcon, ChatBubbleLeftRightIcon, Cog8ToothIcon, GlobeAltIcon, MagnifyingGlassIcon, Square2StackIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import axiosClient from '../../axios';
import { useStateContext } from '../../contexts/ContextProvider';

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
    {
        to: '/notifications',
        name: 'Notification',
        icon: <BellIcon />,
    },
    // {
    //     to: '/explore',
    //     name: 'Explore',
    //     icon: <GlobeAltIcon />,
    // },
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

export default function Navigation() {
    const { setCurrentUser, setUserToken } = useStateContext()
    const logout = async e => {
        e.preventDefault()
        await axiosClient.post('/logout')
            .then(response => {
                setCurrentUser({})
                setUserToken(null)
            })
    }

  return (
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
  )
}
