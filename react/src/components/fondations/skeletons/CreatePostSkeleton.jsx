import React from 'react'

export default function CreatePostSkeleton() {
  return (
    <div className="mb-6 bg-white p-4 rounded-2xl">
        <form encType="multipart/form-data">
            <div className="flex gap-3 mb-4">
                <div className="skeleton w-11 h-11 flex-none rounded-full " />
                <div
                    className="skeleton w-full border-none outline-none bg-gray-100 rounded-lg indent-4"
                    placeholder="What's happening?"
                />
            </div>
            <div className="flex justify-between items-center ">
                <div className="skeleton skeleton-button mt-1.5 text-slate-500 font-semibold rounded-lg">
                </div>
                <div className="skeleton skeleton-button rounded-lg"></div>

            </div>
        </form>
    </div>
  )
}
