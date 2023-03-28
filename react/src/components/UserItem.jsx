import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './fondations/Avatar'
export default function UserItem({item, callback1, callback2, styles}) {
  return (
    <div className={styles}>

            <Link to={`/profile/${item.id}`} className="block flex gap-3">
                <Avatar styles="rounded-full w-14 h-14" url={item.avatar} />
                <div className="text-base flex flex-col">
                <b className="block">{item.username}</b>
                <span>{item.bio === null ? 'bio' : item.bio}</span>
                <ul className="hidden md:flex gap-4 items-center mt-1">
                    <li>i</li>
                    <li>i</li>
                    <li>i</li>
                    <li>i</li>
                </ul>
                </div>
            </Link>
            <div className="flex gap-3 mt-3">
                {callback1}
                {callback2}
            </div>

    </div>
  )
}
