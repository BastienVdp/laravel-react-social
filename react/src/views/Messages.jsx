import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { CheckIcon, MagnifyingGlassIcon, NoSymbolIcon, TrashIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef, useState } from "react"

import InViewInformations from "../components/InviewInformations"
import InviewMessage from "../components/InviewMessage"
import InviewSidebar from "../components/InviewSidebar"
import Button from "../components/fondations/Button"

import useConversations from "../composables/Conversations"

export default function Messages()
{
    const { id } = useParams()
    const { 
        loading, 
        getConversations, 
        conversations, 
        search, 
        setSearch,
        searchConversation, 
        isSearch, 
        error 
    } = useConversations()

    useEffect(() => {
        const timeOutId = setTimeout(() => searchConversation(), 500);
        return () => clearTimeout(timeOutId)
    }, [search])

    useEffect(() => {
        getConversations()
    }, [])

    const [openCreateConversation, setOpenCreateConversation] = useState(false)

    return <>
        <div className="h-full flex flex-col xl:flex-row gap-6 bg-gray-100 rounded-2xl p-6">
                <div className="w-full xl:h-full xl:w-1/4 rounded-xl bg-white p-4">
                    <div className="flex gap-3 items-stretch">
                        <div className={`relative w-full flex gap-1 items-center bg-white rounded-lg ${error ? 'border-red-500 animate-shake' : 'border-gray-300'} border  pl-3 pr-1.5 py-1.5`}>
                            <MagnifyingGlassIcon className="w-5 text-gray-400"/>
                            <input
                                type="text"
                                name="search"
                                placeholder="Chercher un ami..."
                                value={search}
                                onChange={e => {
                                    e.preventDefault()
                                    setSearch(e.target.value)
                                }}
                                autoComplete={"off"}
                                className={`placeholder:text-sm border-none outline-none w-full text-slate-600 indent-1`}
                            />

                        </div>

                        <Button level="secondary" onClick={e => setOpenCreateConversation(!openCreateConversation)}>
                            <StarIcon className="w-4 text-blue-400" />
                        </Button>
                    </div>
                    {conversations && <InviewSidebar conversations={conversations} isSearch={isSearch} setSearch={setSearch} />}
                </div>

            <div className={`h-full w-full xl:w-3/4 rounded-xl bg-white`}>
                {!loading ?
                    conversations.length == 0 ?
                        <div>
                            <div className="flex justify-center items-center h-full">
                                <div className="text-center">
                                    <div className="text-2xl text-gray-500">Vous n'avez pas encore de conversation</div>
                                    <div className="text-gray-500">Commencez à discuter avec vos amis</div>
                                </div>
                            </div>
                        </div>
                    : id ?
                        conversations && 
                           <Outlet />
                    :
                        <div className="w-full h-full grid place-items-center text-lg text-gray-500 ">
                            Cliquer sur une conversation
                        </div>
                : null}
            </div>
        </div>
    </>
}



