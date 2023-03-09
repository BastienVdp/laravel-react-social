

import Feed from "../components/Feed"

export default function Dashboard()
{
    return (
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
            <div className="w-full">
                <Feed />
            </div>
            <div className="shrink-0 w-1/3">
                side
            </div>
        </div>
    )
}

