import React from 'react'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import { useEffect, useState } from "react"
import axiosClient from "../axios"

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const getPosts = () => {
        // setLoading(true)
        axiosClient.get('/post')
            .then(({data}) => {
                setPosts(data.data)
                // setLoading(false)
            })
    }

    useEffect(() => {
        getPosts()
    }, [])
    if(loading) return "Loading..."
    return <>
        <CreatePost getPosts={getPosts}/>
        <div className="flex flex-col">
            {posts.map(post => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
    </>


}
