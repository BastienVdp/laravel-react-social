import React from 'react'

export default function Card({ title, action, children}) {
  return (
    <div className="bg-white rounded-xl mb-6">
        <div className="text-slate-500 flex justify-between items-center font-bold border-gray-100 border-b py-3 px-4">
            {title}
            <span className="font-normal text-sm text-blue-400">{action}</span>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
  )
}
