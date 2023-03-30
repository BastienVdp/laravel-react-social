import React from 'react'

export default function ProfileSkeleton() {
  return <>
    <div className="rounded-2xl drop-shadow-sm mb-6">
        <div className="skeleton bg-gray-300 relative flex justify-end items-end w-full px-8 py-8 rounded-t-2xl rounded-b-lg h-40 md:h-56 lg:h-66 xl:h-96">
            {/* avatar */}
            <div className="w-32 h-32 lg:w-44 lg:h-44 bg-white rounded-full absolute left-8 bottom-[-30px] p-1">
                <div className="w-full h-full rounded-full bg-gray-300 skeleton"></div>
            </div>
        </div>
        <div className="pt-10 px-6 pb-5 flex justify-between items-center">
            <div className="w-48">
                <h2 className="skeleton font-bold skeleton-title bg-gray-300 rounded-lg mb-2">
                    ddd
                </h2>
                <p className="skeleton skeleton-title bg-gray-300 rounded-lg">
                    Lorem ipsum
                </p>
            </div>

            <div className="bg-gray-300 skeleton px-4 py-2 rounded-lg font-bold">
                Edit basic info
            </div>
        </div>
    </div>
  </>
}
