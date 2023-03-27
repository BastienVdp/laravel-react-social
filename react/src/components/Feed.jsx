import React, { Suspense } from 'react'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import { useEffect, useState } from "react"
import PostItemSkeleton from './fondations/skeletons/PostItemSkeleton'
import usePosts from "../composables/Posts"

export default function Feed() {

    const { posts, getPosts, createPost, loading, paginate } = usePosts()

    const fetchData = async() => {
        await getPosts()
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollEvent)
        return () => window.removeEventListener('scroll', scrollEvent)
    })

    const scrollEvent = () => {
        if(document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
            if(paginate.next_page_url === null) return
            fetchData()
        }
    }

    const canFetchMore = paginate.next_page_url !== null && loading

    return <>
            <CreatePost createPost={createPost} loading={false}/>
            <div className="flex flex-col">
                {posts?.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}

                {canFetchMore && [0, 1, 2, 3, 4].map(_ => <PostItemSkeleton />)}
            </div>

    </>


}
