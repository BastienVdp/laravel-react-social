import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useStateContext } from "../contexts/ContextProvider"
import useConversations from "../composables/Conversations"
import usePusher from "../composables/Pusher"

import Avatar from "./fondations/Avatar"
import { StarIcon } from "@heroicons/react/24/solid"

export default function InviewSidebar({conversations, isSearch, setSearch})
{
    return (
        <ul className="mt-3 xl:mt-6 flex flex-row xl:flex-col gap-3">
            {conversations.length > 0 ? <>
                {conversations.map((conv, i) =>
                    !isSearch ?
                        conv.messages_count > 0 ?
                            <SidebarItem key={i} item={conv} isSearch={isSearch}/>
                        : null
                    :  (
                        <SidebarItem key={i} item={conv} isSearch={isSearch} setSearch={setSearch}/>
                    )
                )}
            </> : null}
        </ul>
    )
}

function SidebarItem({item, isSearch, setSearch}) {
    const { currentUser } = useStateContext()
    const { setRead } = useConversations()
    const [lastMessage, setLastMessage] = useState(item.latestMessage)
    const [isRead, setIsRead] = useState(
        item.messages_count ? 
            lastMessage.user.id == currentUser.id ? 
                1
            : lastMessage.read  
        : 1
    )
    
    return (
        <li className="items-center" onClick={e => isSearch ? setSearch('') : null}>
            <Link to={`/messages/${item.id}`} onClick={e => {
                !isRead && setRead(item.id)
                setIsRead(1)
            }} className="bg-gray-100 px-4 py-3 xl:px-2 rounded-lg flex flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <Avatar styles="rounded-full w-10" />
                    <div className="overflow-hidden">
                        <b className="text-slate-500">
                            { item.name ? item.name : (item.participants?.data?.find((p) => p.id !== currentUser.id))?.username}
                        </b>

                        <p className={`truncate text-sm text-gray-500 hidden xl:block`}>
                            {item.messages_count?
                                // Afficher Toi : 
                                `${lastMessage.user.id == currentUser.id ? 'Toi : ' : ''}
                                ${lastMessage.content} 
                                `
                            : 'Aucun message'}
                        </p>
                    </div>
                </div>
                <div className="text-xs text-gray-500 hidden flex-col items-end gap-1 text-right xl:flex">
                    {lastMessage?.created_at}
                    <div className="flex">
                        <StarIcon className="w-4 text-gray-300" />
                        {!isRead ? <div className="w-4 h-4 bg-red-300 rounded-md" /> : ''}
                    </div>
                </div>
            </Link>
        </li>
    )
}

