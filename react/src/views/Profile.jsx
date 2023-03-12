import { BuildingLibraryIcon, CakeIcon, CloudArrowUpIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Feed from '../components/Feed'
import Card from '../components/fondations/Card'
import { useStateContext } from '../contexts/ContextProvider'
import Avatar from '../components/fondations/Avatar'
import ButtonFile from '../components/fondations/ButtonFile'
import axiosClient from '../axios'
import { useParams } from 'react-router-dom'

export default function Profile() {

    const { currentUser } = useStateContext()
    const { id } = useParams()
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState(null)
    const own = id === undefined ? true : parseInt(id) === currentUser.id ? true : false

    const fetchData = async (id) => {
        await axiosClient.get(`/users/${id}`)
        .then((res) => {
            setUser(res.data.data)
            setPosts(res.data.data.posts)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData(!own ? id: currentUser.id)
    }, [])


  return <>
    <div className="bg-white rounded-2xl drop-shadow-sm mb-6">
        <div className="relative flex justify-end items-end w-full px-8 py-8 rounded-t-2xl rounded-b-lg h-40 md:h-56 lg:h-66 xl:h-96"
            style={{ backgroundImage: `url('${user.cover === '' ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80' : user.cover }')`, backgroundSize: 'cover', backgroundPosition: "center"}}
        >
            {/* avatar */}
            <div className="w-32 h-32 lg:w-44 lg:h-44 bg-white rounded-full absolute left-8 bottom-[-30px] p-1">
                <Avatar url={user.avatar} styles="w-full rounded-full align-middle" />
                {own ? <ButtonFile
                    styles="absolute right-0 bottom-[20px] w-8 h-8 bg-slate-50 rounded-full flex justify-center items-center text-slate-500"
                    onChange={e => console.log(e.target.value)}
                    icon={<CloudArrowUpIcon className="w-5"/>}
                />: null}
            </div>
            {/* edit cover */}
            {own ?
            <ButtonFile
                styles="relative flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg font-bold text-slate-500"
                onChange={e => console.log(e.target.value)}
                icon={<CloudArrowUpIcon className="w-5"/>}
            >
                Modifier
            </ButtonFile>
            : null }
        </div>
        <div className="pt-10 px-6 pb-5 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-slate-500">{user.username}</h2>
                <p className="text-gray-400">
                    Web developer
                </p>
            </div>
            {own ?
            <button className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg font-bold text-slate-500">
                Edit basic info
            </button>
            : null}
        </div>
    </div>
    <div className="bg-gray-100 rounded-2xl p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full grow-0 self-start bg-white rounded-lg p-4">
            <h1 className="text-slate-500 font-bold border-gray-100 mb-4">
                INTRO
            </h1>
            <ul className="text-slate-500 flex flex-col gap-2">
                <li className="flex items-center">
                    <span className="w-8">
                        <GlobeAltIcon className='w-5'/>
                    </span>
                    uihut.com
                </li>
                <li className="flex items-center">
                    <span className="w-8">
                        <CakeIcon className='w-5'/>
                    </span>
                    {user.birthday}
                </li>
                <li className="flex items-center">
                    <span className="w-8">
                        <BuildingLibraryIcon className='w-5'/>
                    </span>
                    {user.username}
                </li>
            </ul>
        </div>
        <div className="w-full lg:w-1/2 shrink-0">
            <Feed posts={posts} getPosts={fetchData}/>
        </div>
        <div className="w-full grow-0">
            <Card title="Tu pourrais connaitre">
                dede
            </Card>
        </div>
    </div>
  </>
}
