import React from 'react'

export default function PostItemSkeleton() {
  return (
        <div className="rounded-2xl bg-white p-4 mb-6">
            <div className="flex gap-4 items-center mb-3">
                <div className="skeleton w-11 h-11 flex-none rounded-full " />
                <div className="flex flex-col">
                    <b className="skeleton skeleton-text text-slate-500"></b>

                    <span className="text-sm skeleton skeleton-text text-gray-400">15h. Public</span>
                </div>
            </div>
            <p className="text-slate-700 mb-1 skeleton skeleton-text skeleton-text__body rounded-lg"/>
            <div className="flex justify-between py-2 h-9 items-stretch">
                {/* {count.likes} */}
                <div className="skeleton w-20 rounded-lg"></div>
                <div className="flex justify-between gap-3">
                    <div className="skeleton inline-block w-40 rounded-lg"></div>
                </div>
            </div>
            <div className="flex gap-5 justify-around py-2 text-slate-500 text-sm font-semibold border-t border-b">
                <div className="skeleton skeleton-small__btn "/>
                <div className="skeleton skeleton-small__btn "/>
                <div className="skeleton skeleton-small__btn "/>
            </div>
            <div className="flex pt-3 gap-2">
                <div className="flex gap-2 w-full">
                    <div className="skeleton w-9 h-9 flex-none rounded-full"/>
                    <div className="skeleton w-full border-none outline-none bg-gray-100 rounded-lg px-2 text-sm"
                    />
                </div>
                <div className="skeleton skeleton-button">
                </div>
            </div>
        </div>
  )
}
