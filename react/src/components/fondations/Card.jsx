import React from 'react'

export default function Card({ title, action, children}) {
  return (
    <div className="bg-white rounded-lg p-4">
        <div className="text-slate-500 font-bold border-gray-100 border-b pb-4 pr-4">{title}</div>
        {children}
    </div>
  )
}
