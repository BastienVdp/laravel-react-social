import React, { useEffect, useState} from 'react'
import Avatar from "../components/fondations/Avatar"
import Button from '../components/fondations/Button'
import useFriends from '../composables/Friends'
import { UserIcon } from '@heroicons/react/24/outline'
import CommunityListSkeleton from '../components/fondations/skeletons/CommunityListSkeleton'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Community() {

    const [activeTab, setActiveTab] = useState(0)

    const handleTab = async (tab) => {
        setActiveTab(tab)
    }


    return (
        <div className="bg-gray-100 rounded-lg p-6">
            <CommunityBar handleTab={handleTab} activeTab={activeTab}/>
            <CommunityList activeTab={activeTab} />
        </div>
    )
}

function CommunityBar({
  handleTab,
  activeTab
}) {

    const tabs = [
        {
        id: 0,
        name: 'Amis'
        },
        {
        id: 1,
        name: "Demande d'amis"
        },
        {
        id: 2,
        name: 'Bloqués'
        },
    ]

    return (
        <div className="flex gap-3 bg-white rounded-lg p-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`${activeTab === tab.id ? 'bg-blue-500 text-white' : 'border text-gray-500'} rounded-lg w-full py-1.5`}
                    onClick={_ => handleTab(tab.id)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    )
}

function CommunityList({ activeTab}) {
    const { loading, friends, friendsBlocked, unblockfriend, friendsRequest, getFriends, getFriendsRequest, getFriendsBlocked, acceptFriendRequest, denyFriendRequest, unfriend, blockfriend } = useFriends()

    const fetchData = async() => {
        await Promise.all([
          getFriends(),
          getFriendsRequest(),
          getFriendsBlocked()
        ])
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(loading) return <CommunityListSkeleton />
    return <>
        {activeTab == 0 && <FriendList friends={friends} unfriend={unfriend} block={blockfriend}/>}
        {activeTab == 1 && <FriendRequestList friendsRequest={friendsRequest} acceptFriendRequest={acceptFriendRequest} denyFriendRequest={denyFriendRequest}/>}
        {activeTab == 2 && <FriendBlocked friendsBlocked={friendsBlocked} unblockfriend={unblockfriend}/>}
    </>
}
function FriendBlocked({friendsBlocked, unblockfriend}) {

    return  <>
    {friendsBlocked.length > 0 ? (
        <ul className="mt-4">
            {friendsBlocked?.map((friend) => (
                <li key={friend.id} className="flex gap-4 items-center bg-white p-4 rounded-lg">
                    <div className="w-10">
                        <div className="mx-auto w-5 h-5 rounded-full bg-red-200 text-red-500 flex items-center">
                        <UserIcon className="w-3 mx-auto"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-3 items-center">
                            <Avatar styles="w-10 h-10 rounded-full" />
                            <div className="flex flex-col">
                                <b className="text-slate-500">{friend.recipient.username}</b>
                                <p>{friend.recipient.bio}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Button level="secondary" onClick={e => unblockfriend(friend.recipient.id)}>
                                Débloquer
                            </Button>
                        </div>
                    </div>
                </li>
            ))}
        </ul> ) : (
            <div className="mt-4 text-center bg-white p-4 rounded-lg text-gray-500">
                <b>0</b> amis bloqués
            </div>
        )}
    </>
}
function FriendList({friends, unfriend, block}) {
    return <>
        {friends.length > 0 ? (
            <div className="mt-4 rounded-lg columns-1 md:columns-2 lg:columns-3">
            {friends.map(friend => (
                <Item key={friend.id} item={friend} unfriend={unfriend} block={block} />
            ))}
            </div>
        ) : (
            <div className="mt-4 text-center bg-white p-4 rounded-lg text-gray-500">
                <b>0</b> amis
            </div>
        )}
    </>
}

function FriendRequestList({friendsRequest, acceptFriendRequest, denyFriendRequest}) {

    return <>
        {friendsRequest.length > 0 ? <ul className="mt-4">
            {friendsRequest?.map((request) => (
                <li className="flex gap-4 items-center bg-white p-4 rounded-lg">
                <div className="w-10">
                    <div className="mx-auto w-5 h-5 rounded-full bg-blue-200 text-blue-500 flex items-center">
                    <UserIcon className="w-3 mx-auto"/>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-3 items-center">
                        <Avatar styles="w-10 h-10 rounded-full" />
                        <div className="flex flex-col">
                            <b className="text-slate-500">{request.sender.username} vous a envoyé une demande d'amis</b>
                            <span className="text-sm text-gray-400">4 minutes ago</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Button level="secondary" onClick={e => acceptFriendRequest(request.sender.id)}>
                            Accepter
                        </Button>
                        <Button level="neutral" onClick={e => denyFriendRequest(request.sender.id)}>
                            Refuser
                        </Button>
                    </div>
                </div>
                </li>
            ))}
            </ul> : <div className="mt-4 text-center bg-white p-4 rounded-lg text-gray-500">
                <b>0</b> demandes d'amis
            </div>
        }
  </>
}


function Item({item, unfriend, block}) {
    return (
        <div key={item.id} className="p-4 bg-white rounded-lg break-inside-avoid-column mb-4">
        <div className="flex gap-2">
            <Avatar styles="rounded-full w-20 h-20" url="" />
            <div className="text-base flex flex-col">
            <b className="block">{item.username}</b>
            <span>{item.bio === null ? 'bio' : item.bio}</span>
            <ul className="hidden md:flex gap-4 items-center mt-auto">
                <li>i</li>
                <li>i</li>
                <li>i</li>
                <li>i</li>
            </ul>
            </div>
        </div>
        <div className="flex gap-3 mt-3">
            <button className="w-full py-1 rounded-lg border" onClick={e => unfriend(item.id)}>
            Supprimer
            </button>
            <button className="bg-red-500 rounded-lg w-full py-1 text-white" onClick={e => block(item.id)}>
            Bloquer
            </button>
        </div>
        </div>
    )
}
