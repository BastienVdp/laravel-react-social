import React from 'react'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import { useEffect, useState } from "react"
import axiosClient from "../axios"

export default function Feed({posts, getPosts}) {

    const [loading, setLoading] = useState(false)

    if(loading) return "Loading..."
    return <>
        <CreatePost getPosts={getPosts}/>
        <div className="flex flex-col">
            {posts?.map(post => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
    </>


}
