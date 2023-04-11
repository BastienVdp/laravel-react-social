import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckIcon, NoSymbolIcon, TrashIcon } from "@heroicons/react/24/outline"

import { useStateContext } from "../contexts/ContextProvider"
import useFriends from "../composables/Friends"
import useConversations from "../composables/Conversations"
import Avatar from "./fondations/Avatar"

export default function InViewInformations({
    openInviewInformations, 
    setOpenInviewInformations, 
    conversation,
    setMessages, 
    participants
}) {
    // if(conversation) console.log(conversation)
    // console.log(messages)
    const ref = useRef(null)
    const { currentUser } = useStateContext()
    const navigate = useNavigate()
    const { setUnread, deleteMsgs } = useConversations()
    const { blockfriend } = useFriends()

    const handleOpen = (e) => (ref.current && !ref.current.contains(e.target)) && setOpenInviewInformations(false)
    

    const deleteAllMsgs = () => {
        deleteMsgs(conversation.id)
        setMessages([])
    }

    const blockUser = async (id) => {
        await Promise.all([blockfriend(id)])
            .then(res => navigate("/community"))
            .catch(err => console.log(err))
    }

    if(!conversation) return 'loading...'

    return <>
        <div 
            onClick={(e) => handleOpen(e)} 
            className={`z-30 ${openInviewInformations ? 'fixed opened' : 'hidden closed' } top-0 left-0 right-0 bottom-0 bg-black/75`}
        />
        <div 
            ref={ref} 
            className={`z-40 ${openInviewInformations ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in duration-150 absolute right-0 bottom-0 top-0 w-[85%] xl:w-1/3 bg-white rounded-tl-2xl rounded-bl-2xl p-6`}
        >
            <div className="py-6 rounded-xl bg-gray-100 grid place-items-center">
                <Avatar  alt="" styles="rounded-full w-16" />
                <div className="text-center mt-4 text-slate-500">
                    <span className="text-lg font-semibold">
                    {conversation.name ? conversation.name : (participants.find((p) => p.id !== currentUser.id))?.username}
                    </span>
                    {participants.length == 2 && <>
                        <span className="text-sm mb-2 block">UI designer</span>
                        <span className="font-semibold">
                            Connecté
                            <div className="w-2 h-2 rounded-full bg-green-300 inline-block ml-3"></div>
                        </span>
                    </>}

                </div>
            </div>
            <div className="mt-6 rounded-xl bg-gray-100">
                <div className="p-4 border-b text-slate-500 font-semibold">
                    Support
                </div>
                <ul className="p-4 flex flex-col gap-1">
                    <li className="text-slate-500 font-medium flex items-center"
                        onClick={() => setUnread(conversation.id)}
                    >
                        <CheckIcon className="w-4 inline-block mr-2" />
                        Marquer comme non lu
                    </li>
                    {participants.length == 2 && 
                        <li className="text-slate-500 font-medium flex items-center"
                            onClick={() => blockUser(
                                (participants.find((p) => p.id !== currentUser.id))?.id
                            )}
                        >
                            <NoSymbolIcon className="w-4 inline-block mr-2" />
                            Bloquer
                        </li>
                    }
                    
                    <li className="text-slate-500 font-medium flex items-center"
                        onClick={() => deleteAllMsgs()}
                    >
                        <TrashIcon className="w-4 inline-block mr-2" />
                        Supprimer la conversation
                    </li>
                </ul>
            </div>
            <div className="mt-6 rounded-xl bg-gray-100">
                <div className="p-4 border-b text-slate-500 font-medium">
                    Participants
                </div>

                <ul className="p-4 flex flex-col gap-4">
                    {participants.map((p, i) => (
                        <li key={p.id}>
                            <Link to={`/profile/${p.id}`} className="text-slate-500 font-semibold flex items-center">
                                <Avatar styles="w-8 rounded-full inline-block mr-4" />
                                {p.username == currentUser.username ? 'Moi' : p.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
}
