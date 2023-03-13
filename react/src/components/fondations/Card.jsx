import React from 'react'

export default function Card({ title, action, children}) {
  return (
    <div className="bg-white rounded-lg mb-6">
        <div className="text-slate-500 flex justify-between items-center font-bold border-gray-100 border-b py-2 px-4">
            {title}
            {action}
        </div>
        <div className="py-3 px-4">
            {children}
        </div>
    </div>
  )
}
