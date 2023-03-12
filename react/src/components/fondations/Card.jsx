import React from 'react'

export default function Card({ title, action, children}) {
  return (
    <div className="bg-white rounded-lg">
        <div className="text-slate-500 font-bold border-gray-100 border-b py-3 px-4">{title}</div>
        <div className="py-3 px-4">
            {children}
        </div>

    </div>
  )
}
