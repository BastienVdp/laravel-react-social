import React, { useState, useEffect, useRef } from 'react'
import { EllipsisHorizontalIcon, EyeSlashIcon, BellIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

export default function Dropdown({parent}) {

    const dropdownRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        if(open) setOpen(false)
        else setOpen(true)

        console.log(open)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
      }, [open])

    return <div ref={dropdownRef}>
            <button className="text-slate-500" onClick={_ => handleOpen()}>
                <EllipsisHorizontalIcon className="w-8"/>
            </button>
            <div className={`${open ? "opened" : "closed"} absolute top-10 left-0 right-[-25px] overflow-hidden z-20`}>
                <ul className="bg-white rounded-xl shadow-lg p-4 border flex flex-col gap-2">
                    <li className="flex items-center text-slate-500 hover:text-red-400 cursor-pointer">
                        <span className="w-8 text-center">
                            <EyeSlashIcon className="w-5"/>
                        </span>
                        Cacher
                    </li>
                    <li className="flex items-center text-slate-500 hover:text-red-400 cursor-pointer">
                        <span className="w-8 text-center">
                            <BellIcon className="w-5"/>
                        </span>
                        Activer les notifications
                    </li>
                    <li className="flex items-center text-slate-500 hover:text-red-400 cursor-pointer">
                        <span className="w-8 text-center">
                            <ShieldExclamationIcon className="w-5"/>
                        </span>
                        Signaler
                    </li>
                </ul>
            </div>
        </div>
}
