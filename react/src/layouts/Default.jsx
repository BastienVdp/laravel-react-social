import { Navigate, Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useState, useEffect } from 'react'
import Navigation from "../components/fondations/Navigation";
import Avatar from "../components/fondations/Avatar";
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom";
export default function Default() {

    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext()

    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([{}])
    const { pathname } = useLocation()

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



    if(userToken === null) return <Navigate to="/login" />

    return (
        <div className="font-lato">
            {/* Sidebar */}
            <div className="fixed left-0 right-0 md:top-0 bottom-0 w-full md:w-[200px] p-5 bg-white md:bg-none rounded-t-lg md:rounded-none">
                {/* Logo */}
                <img src={logo} alt="logo" className="md:block hidden mb-6"/>
                {/* Nav */}
                <Navigation />
            </div>
            {/* Main Content */}
            <div className="md:ml-[200px] text-base pr-4 px-4 md:px-0 md:pr-4">
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
                    <div className="flex items-center gap-4 relative">
                        <span className="text-slate-500 font-bold">{currentUser.username}</span>
                        <Avatar url={currentUser.avatar} styles="w-9 rounded-lg"/>
                        <Link to="/notifications" className="absolute right-[-5px] bottom-[-5px] rounded-full bg-red-400 w-5 h-5 text-xxs text-center leading-5 text-white">
                            0
                        </Link>
                    </div>
                </header>
                <div className="pb-[200px] flex gap-6">
                    <div className="w-full">
                        <Outlet />
                    </div>
                    {(!pathname.startsWith('/profile')) &&
                        <div className="hidden xl:block w-[250px]">sidebar</div>
                    }
                </div>
            </div>
            <Toaster position="bottom-right" reverseOrder={false}/>
        </div>
    )
}
