import { CloudArrowUpIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Card from '../components/fondations/Card'
import { useStateContext } from '../contexts/ContextProvider'
export default function Profile() {
    const { currentUser } = useStateContext()
  return <>
    <div className="bg-white rounded-2xl drop-shadow-sm mb-6">
        <div className="relative flex justify-end items-end w-full px-8 py-8 rounded-t-2xl rounded-b-lg md:h-56 lg:h-80 xl:h-96 bg-cover bg-[url('https://images.unsplash.com/photo-1678025276032-fd796f4a0ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')]">
            {/* avatar */}
            <div className="w-44 h-44 bg-white rounded-full absolute left-8 bottom-[-30px] mt-5 p-1">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" className="w-full rounded-full align-middle"/>
                <button className="absolute right-0 bottom-[20px] w-8 h-8 bg-slate-50 rounded-full flex justify-center items-center text-slate-500">
                    <input
                        type="file"
                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0 z-0"
                        onChange=""
                        multiple
                    />
                    <CloudArrowUpIcon className="w-5"/>
                </button>
            </div>
            {/* edit cover */}
            <button className="relative flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg font-bold text-slate-500">
                <input
                    type="file"
                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0 z-0"
                    onChange=""
                    multiple
                />
                <CloudArrowUpIcon className="w-5"/>
                Modifier
            </button>
        </div>
        <div className="pt-10 px-6 pb-5 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-slate-500">{currentUser.name}</h2>
                <p className="text-gray-400">
                    Web developer
                </p>
            </div>
            <button className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg font-bold text-slate-500">
                Edit basic info
            </button>
        </div>
    </div>
    <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
        <div className="w-full grow-0 bg-white rounded-lg p-4">
            <h1 className="text-slate-500 font-bold border-gray-100 mb-4">
                INTRO
            </h1>
            <ul className="text-slate-500">
                <li className="flex items-center">
                    <span className="w-8">
                        <GlobeAltIcon className='w-5'/>
                    </span>
                    uihut.com
                </li>
            </ul>
        </div>
        <div className="w-1/2 shrink-0 bg-slate-300">feed</div>
        <div className="w-full grow-0">
            <Card title="Tu pourrais connaitre">
                dede
            </Card>
        </div>
    </div>
  </>
}
