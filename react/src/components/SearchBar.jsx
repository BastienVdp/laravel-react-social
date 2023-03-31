import { useState, useEffect } from "react"
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function SearchBar({search, setSearch, dataSearch, setDataSearch})
{
    return (
        <div className="relative w-2/3 h-9 flex gap-1 items-center bg-white rounded-lg border border-gray-300 pl-3 pr-1.5 py-1.5">
            <MagnifyingGlassIcon className="w-5 text-gray-400"/>
            <input
                type="text"
                name="search"
                placeholder="Chercher un utilisateur..."
                onChange={e => {
                    e.preventDefault()
                    setSearch(e.target.value)
                }}
                autoComplete={"off"}
                className="border-none outline-none w-full text-slate-600 indent-1"
            />
            {dataSearch.length > 0 && search !== '' ?
            <div className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-sm p-4 border flex flex-col gap-2">
                <ul>
                    {dataSearch?.map((result, i) => (
                        <li key={i}>                       
                            <Link 
                                className="flex items-center text-slate-500 hover:text-blue-500 cursor-pointer" 
                                reloadDocument 
                                to={`/profile/${result.id}`} 
                                onClick={() => setDataSearch([])}
                            >
                                <span className="w-7 text-center">
                                    <UserCircleIcon className="w-5"/>
                                </span>
                                {result.username}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
            : null}
        </div>
    )
}