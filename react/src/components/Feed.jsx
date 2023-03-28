import React, { Suspense } from 'react'
import { useEffect } from "react"
import { useStateContext } from '../contexts/ContextProvider'
import usePosts from "../composables/Posts"
import useFriends from '../composables/Friends'
import UserItem from './UserItem'
import PostItem from "../components/PostItem"
import CreatePost from "../components/CreatePost"
import PostItemSkeleton from './fondations/skeletons/PostItemSkeleton'
import Button from './fondations/Button'
import Card from './fondations/Card'

export default function Feed({profileId, profile}) {

    const { currentUser } = useStateContext()
    const { posts, getPosts, createPost, loading, paginate } = usePosts()
    const { mutualFriends, getMutualFriends, addFriend } = useFriends()
    const own = profileId === undefined || profileId == currentUser.id
    const canFetchMore = paginate.next_page_url !== null && loading

    const fetchData = async() => {
        await Promise.all([
            getPosts(profileId, profile),
            getMutualFriends()
        ])
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



    return <>
        <div className="w-full flex gap-6">
            <div className="w-full">
                {own && <CreatePost createPost={createPost} loading={false}/>}

                <div className="flex flex-col">
                    {posts?.map(post => (
                        <PostItem post={post} key={post.id} />
                    ))}

                    {canFetchMore && [0, 1, 2, 3, 4].map(_ => <PostItemSkeleton key={_}/>)}
                </div>
            </div>
            {own && <div className="shrink-0 w-1/3">
                <Card title="Tu pourrais connaitre" action={<div>Voir tout</div>}>
                    {mutualFriends.length > 0 ? mutualFriends.map(friend => (
                            <UserItem
                                item={friend}
                                callback1={<Button level="neutral" styles="w-full p-1.5">Ignorer</Button>}
                                callback2={<Button level="primary" styles="w-full p-1.5" onClick={e => addFriend(friend.id)}>Ajouter</Button>}
                            />
                        ))
                    : <div className="py-1"></div>}
                </Card>
            </div>}

        </div>

    </>


}
