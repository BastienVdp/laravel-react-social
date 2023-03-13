import React from 'react'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import { useEffect, useState } from "react"
import axiosClient from "../axios"
import FeedList from './FeedList'
import PostItemSkeleton from './fondations/skeletons/PostItemSkeleton'

export default function Feed({posts, getPosts, loading}) {

    return <>
        <CreatePost getPosts={getPosts} loading={loading}/>
        <div className="flex flex-col">
            {loading ? [0, 1, 2, 3, 4].map((i) => (
                <PostItemSkeleton key={i}/>
            )) : posts?.map(post => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
    </>


}
