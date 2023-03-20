import React, { useEffect, useState} from 'react'
import Avatar from "../components/fondations/Avatar"
import Button from '../components/fondations/Button'
import useFriends from '../composables/Friends'
import { UserIcon } from '@heroicons/react/24/outline'
import CommunitySkeleton from '../components/fondations/skeletons/CommunitySkeleton'
export default function Community() {

  const { loading, friends, getFriends, friendsRequest, getFriendsRequest, acceptFriendRequest, denyFriendRequest } = useFriends()

  const fetchData = async() => {

    await Promise.all([
      getFriends(),
      getFriendsRequest()
    ])
  }

  useEffect(() => {
      fetchData()
  }, [])

  const [activeTab, setActiveTab] = useState(0)

  const handleTab = async (tab) => {
    setActiveTab(tab)
  }

  if(loading) return <CommunitySkeleton />
  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <CommunityBar handleTab={handleTab} activeTab={activeTab}/>

      <CommunityList activeTab={activeTab} friends={friends} friendsRequest={friendsRequest} acceptFriendRequest={acceptFriendRequest} denyFriendRequest={denyFriendRequest}/>
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
      name: 'Explorer'
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

function CommunityList({friends, friendsRequest, activeTab, acceptFriendRequest, denyFriendRequest}) {
  return <>
      {activeTab == 0 && <FriendList friends={friends} />}
      {activeTab == 1 && <FriendRequestList friendsRequest={friendsRequest} acceptFriendRequest={acceptFriendRequest} denyFriendRequest={denyFriendRequest}/>}
      {activeTab == 2 && <p>explorer</p>}
    </>
}

function FriendRequestList({friendsRequest, acceptFriendRequest, denyFriendRequest}) {
  return <>
    {friendsRequest.length > 0 ? <ul className="mt-4">
      {friendsRequest?.map((request) => (
        <li className="flex gap-4 items-center bg-white p-4 rounded-lg">
          <span className="block w-10">
            <div className="mx-auto w-5 h-5 rounded-full bg-blue-200 text-blue-500 flex items-center">
              <UserIcon className="w-3 mx-auto"/>
            </div>
          </span>
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
    </div>}
  </>
}
function FriendList({friends}) {
  return <div className="mt-4 rounded-lg columns-1 md:columns-2 lg:columns-3">
    {friends.map(friend => (
      <Item key={friend.id} item={friend} />
    ))}
  </div>
}

function Item({item}) {
  return (
    <div key={item.id} className="p-4 bg-white rounded-lg break-inside-avoid-column mb-4">
      <div className="flex gap-2">
        <Avatar styles="rounded-full w-14 h-14" url="" />
        <div className="text-sm flex flex-col">
          <b className="block">{item.name}</b>
          <span>{item.bio}</span>
          <ul className="flex gap-4 items-center mt-auto">
            <li>i</li>
            <li>i</li>
            <li>i</li>
            <li>i</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <button className="w-full py-1 rounded-lg border">
          Supprimer
        </button>
        <button className="bg-red-500 rounded-lg w-full py-1 text-white">
          Bloquer
        </button>
      </div>
    </div>
  )
}