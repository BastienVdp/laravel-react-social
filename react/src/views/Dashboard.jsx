import { useState, useEffect } from "react"
import axiosClient from "../axios"
import Feed from "../components/Feed"

export default function Dashboard()
{
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axiosClient.get('/post')
            .then(({data}) => {
                setPosts(data.data)
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
            <div className="w-full">
                <Feed posts={posts} getPosts={getPosts}/>
            </div>
            <div className="shrink-0 w-1/3">
                side
            </div>
        </div>
    )
}

