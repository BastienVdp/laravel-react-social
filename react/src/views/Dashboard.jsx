import { ChatBubbleBottomCenterIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import CreatePost from "../components/CreatePost";
import { useStateContext } from "../contexts/ContextProvider";
import PostItem from "../components/PostItem";
export default function Dashboard()
{
    const { posts } = useStateContext()

    // const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const getPosts = () => {
        setLoading(true)
        axiosClient.get('/post')
            .then(({data}) => {
                setPosts(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        // getPosts()
    }, [])
    if(loading) return "Loading..."
    return (
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
            <div className="w-full">
                <CreatePost />
                <div className="flex flex-col">
                {posts.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}
                </div>
            </div>
            <div className="shrink-0 w-1/3">
                side
            </div>
        </div>
    )
}

