import React from 'react'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import { useEffect, useState } from "react"
import PostItemSkeleton from './fondations/skeletons/PostItemSkeleton'
import usePosts from "../composables/Posts"
export default function Feed() {

    const { posts, getPosts, createPost, loading } = usePosts()

    const fetchData = async() => {
        await getPosts()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <CreatePost createPost={createPost} loading={loading}/>
        <div className="flex flex-col">
            {loading ? [0, 1, 2, 3, 4].map((i) => (
                <PostItemSkeleton key={i}/>
            )) : posts?.map(post => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
    </>


}
