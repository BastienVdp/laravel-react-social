import { UserIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axios'
import Avatar from '../components/fondations/Avatar'
import Button from '../components/fondations/Button'
import Card from '../components/fondations/Card'
import { useStateContext } from '../contexts/ContextProvider'
import useFriends from '../composables/Friends'

export default function Notifications() {

    const { friendsRequest, getFriendsRequest, acceptFriendRequest, denyFriendRequest } = useFriends()

    useEffect(() => {
        getFriendsRequest()
    }, [])

    return (
        <div className="bg-gray-100 rounded-2xl p-6 gap-6">
            <Card title="Notifications" action={<Button level="nobg">edit</Button>}>

                {friendsRequest.length > 0 && <ul className="mb-4 pb-4 border-b border-gray-100">
                    {friendsRequest?.map((request) => (
                        <NotificationItem type="friendRequest" receiver={request.receiver} sender={request.sender} acceptFriendRequest={acceptFriendRequest} denyFriendRequest={denyFriendRequest}/>
                    ))}
                </ul>}
                <ul>
                    <NotificationItem />
                </ul>

            </Card>
        </div>
    )
}

function NotificationItem({type, receiver, sender, acceptFriendRequest, denyFriendRequest}) {
    return (
        <li className="flex gap-4 items-center">
            <span className="block w-10">
                {type === "friendRequest" &&
                    <div className="mx-auto w-5 h-5 rounded-full bg-blue-200 text-blue-500 flex items-center">
                        <UserIcon className="w-3 mx-auto"/>
                    </div>
                }
            </span>
            <div className="flex items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                    <Avatar styles="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                        {type === "friendRequest" && <b className="text-slate-500">{sender.username} vous a envoyé une demande d'amis</b>}
                        <span className="text-sm text-gray-400">4 minutes ago</span>
                    </div>
                </div>
                {type === "friendRequest" &&
                    <div className="flex gap-2">
                        <Button level="secondary" onClick={e => acceptFriendRequest(sender.id)}>
                            Accepter
                        </Button>
                        <Button level="neutral"onClick={e => denyFriendRequest(sender.id)}>
                            Refuser
                        </Button>
                    </div>
                }

            </div>
        </li>
    )
}
