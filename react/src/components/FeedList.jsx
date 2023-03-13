import React from 'react'
import PostItem from './PostItem'
export default function FeedList({posts}) {
    return <>
        {posts?.map(post => (
            <PostItem post={post} key={post.id} />
        ))}
    </>
}
