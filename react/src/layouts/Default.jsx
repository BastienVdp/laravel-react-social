import { Navigate, Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useState, useEffect } from 'react'
import Navigation from "../components/fondations/Navigation";
import Avatar from "../components/fondations/Avatar";
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
export default function Default() {

    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext()
    const { pathname } = useLocation()

    const [dataSearch, setDataSearch] = useState([{}])

    const fetchData = async () => {
        await axiosClient.get(`/search/${search}`)
        .then((res) => {
            setDataSearch(res.data.data)
            console.log(dataSearch)
        })
        .catch(err => setDataSearch([]))
    }

    const [search, setSearch] = useState('')

    useEffect(() => {
        if(search) {
            const timeOutId = setTimeout(() => search !== '' ? fetchData() : null, 500);
            return () => clearTimeout(timeOutId)
        }

    }, [search])



    if(userToken === null) return <Navigate to="/login" />

    return (
        <div className="relative overflow-x-hidden">
            {/* Sidebar */}
            <div className="z-20 fixed left-0 right-0 md:top-0 bottom-0 w-full md:w-[200px] p-5 bg-white md:bg-none rounded-t-lg md:rounded-none">
                {/* Logo */}
                <img src={logo} alt="logo" className="md:block hidden mb-6"/>
                {/* Nav */}
                <Navigation />
            </div>
            {/* Main Content */}
            <div className="md:ml-[200px] text-base pr-4 px-4 md:px-0 md:pr-6">
                <header className="z-10 h-[10vh] bg-white flex justify-between w-full py-4">
                    <SearchBar setDataSearch={setDataSearch} dataSearch={dataSearch} search={search} setSearch={setSearch}/>
                    <div className="flex items-center gap-4 relative">
                        <span className="text-slate-500 font-bold">{currentUser.username}</span>
                        <Avatar url={currentUser.avatar} styles="w-9 rounded-lg"/>
                        <Link to="/notifications" className="absolute right-[-5px] bottom-[-5px] rounded-full bg-red-400 w-5 h-5 text-xxs text-center leading-5 text-white">
                            0
                        </Link>
                    </div>
                </header>
                <div className="pb-32 md:pb-10 lg:pb-6 flex gap-6 min-h-[90vh]">
                    <div className="w-full">
                        <Outlet />
                    </div>
                    {(!pathname.startsWith('/profile') && !pathname.startsWith('/messages')) &&
                        <div className="hidden xl:block w-[250px]">sidebar</div>
                    }
                </div>
            </div>
            <Toaster position="bottom-right" reverseOrder={false}/>
        </div>
    )
}
