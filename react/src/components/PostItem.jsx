import { ArrowTopRightOnSquareIcon, BellIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon, EyeSlashIcon, HandThumbUpIcon, HeartIcon, PaperAirplaneIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import Button from "./fondations/Button";
import axiosClient from "../axios"
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useRef, useState } from "react";
import Avatar from "./fondations/Avatar";
import Dropdown from "./fondations/Dropdown";
import { toast } from "react-hot-toast";

export default function PostItem({post}) {

    const postRef = useRef(null)

    const { currentUser } = useStateContext()
    const [likes, setLikes] = useState(post.likes.data)
    const [showComment, setShowComment] = useState(true)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(post.comments.data)
    const [liked, setLiked] = useState(
        post.likes?.data.filter(like => like.user.id === currentUser.id).length > 0
            ? true
            : false
        )

    const like = () => {
        axiosClient.post('/like', {
            likeable_id: post.id,
            likeable_type: 'Post'
        })
        .then(({data}) => {
            setLikes(data.data)
            setLiked(true)
        })
        .catch(err => {
            console.log(err, err.response)
        })
    }

    const unlike = () => {
        axiosClient.delete(`/like/${post.id}/Post`)
            .then(({data}) => {
                setLikes(data.data)
                setLiked(false)
            })
            .catch(err => {
                console.log(err, err.response)
            })
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        axiosClient.post('/comment', {
            post_id: post.id,
            body: comment
        })
        .then(({data}) => {
            setComments(data.data)
            setComment('')
            toast.success('Votre avez commenté une publication.')
        })
        .catch(e => console.log(e))
    }
    return (
        <div className="rounded-2xl bg-white p-4 mb-6" ref={postRef}>
            <div className="flex items-center mb-3 justify-between">
                <div className="flex gap-3 items-center">
                    <Avatar url={post.user.avatar} styles="w-11 rounded-full"/>
                    <div className="flex flex-col">
                        <Link to={`/profile/${post.user.id}`}>
                            <b className="text-slate-500">{post.user.username}</b>
                        </Link>
                        <span className="text-sm text-gray-400">{post.created_at}</span>
                    </div>
                </div>
                <div className="relative w-2/3 md:w-1/2 lg:w-1/3 flex justify-end">
                    <Dropdown parent={postRef} />
                </div>
            </div>
            <p className="text-slate-700 mb-1">
                {post.content}
            </p>
            {post.images.length > 0 ? <PostImage images={post.images}/> : null}
            <div className="flex justify-between items-center py-2">
                {/* {count.likes} */}
                <ul className="flex">
                    {likes?.slice(0, 3).map((like, i) => (
                        <li className="mr-[-5px]" key={i}>
                            <Avatar url={like.user.avatar} styles="w-5 rounded-full"/>
                        </li>
                    ))}
                    {likes?.length > 3 ?
                    <li className="mr-[-5px]">
                        <div className="w-5 h-5 rounded-full bg-slate-600 text-white text-xxs flex justify-center items-center">
                            +{likes.length - 3}
                        </div>
                    </li> : null }
                </ul>
                <ul className="flex gap-3 text-gray-400">
                    <li>{comments.length} commentaire{comments.length > 1 ? 's' : ''}</li>
                    <li>17 partages</li>
                </ul>
            </div>
            <div className="flex justify-between py-2 text-slate-500 text-sm font-semibold border-t border-b">
                <button
                    className={`w-full justify-start flex gap-1 items-center ${liked ? 'text-red-400': null}`}
                    onClick={liked ? unlike : like}
                >
                    <HeartIcon className="w-4"/>
                    J'aime
                </button>
                <button
                    className="w-full justify-center flex gap-1 items-center"
                    onClick={_ => setShowComment(!showComment)}
                >
                    <ChatBubbleBottomCenterIcon className="w-4"/>
                    Commenter
                </button>
                <button className="w-full justify-end  flex gap-1 items-center">
                    <ArrowTopRightOnSquareIcon  className="w-4"/>
                    Partager
                </button>
            </div>
            {comments.length > 0 ?
                comments.map((comment, i) =>
                    <CommentItem key={i} comment={comment}/>
                )
            : null}
                <form onSubmit={onSubmit} className={`flex pt-3 gap-2 ease-in-out duration-75 transition-all ${showComment ? 'translate-y-0 visible' : 'translate-y-[-100%] hidden'}`}>
                        <div className="flex gap-2 w-full">
                            <Avatar url={"https://via.placeholder.com/50"} styles="w-9 h-9 rounded-full flex-none"/>
                            <input
                                type="text"
                                className="w-full border-none outline-none bg-gray-100 rounded-lg px-3 text-sm"
                                placeholder="Commenter"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <Button level="secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </Button>
                    </form>

        </div>
    )
}

function CommentItem({comment}) {
    const { currentUser } = useStateContext()
    const [likes, setLikes] = useState(comment.likes.data)
    const [liked, setLiked] = useState(comment.likes?.data.filter(like => like.user.id === currentUser.id).length > 0
            ? true
            : false
        )
    const like = async() => {
        await axiosClient.post('/like', {
            likeable_id: comment.id,
            likeable_type: 'Comment'
        })
        .then(({data}) => {
            setLikes(data.data)
            setLiked(true)
        })
        .catch(err => {
            console.log(err, err.response)
        })
    }

    const unlike = async() => {
        await axiosClient.delete(`/like/${comment.id}/Comment`)
            .then(({data}) => {
                setLikes(data.data)
                setLiked(false)
            })
            .catch(err => {
                console.log(err, err.response)
            })
    }
    return (
        <div  className="mt-3 flex items-start gap-2">
            <Avatar url={comment.user.avatar} styles="w-9 h-9 rounded-full"/>
            <div className="w-full relative pr-10">
                <b className="text-slate-500 block leading-none">{comment.user.username}</b>
                <p className="text-gray-600">{comment.body}</p>
                <button
                    className={`${ liked ? 'text-red-400' : 'text-slate-400'} font-medium absolute flex items-center gap-1 right-0 top-0 z-10`}
                    onClick={liked ? unlike : like}
                >
                    <span className="font-semibold">{likes.length}</span> <HandThumbUpIcon className="w-4"/>
                </button>
            </div>
        </div>
    )
}
function PostImage({images}) {
    const url = "http://laravel-react-social.test/"
    return <>
         {images.length === 1 ? <>
            <img src={url + '' + images[0].path} alt="" className="rounded-lg w-full" />
        </> : images.length === 2 ? <>
            <div className="grid grid-cols-2 gap-1">
                <div className="row-span-1 overflow-hidden relative">
                    <img src={url +  images[0].path} alt="" className="rounded-lg w-full" />
                </div>
                <div className="row-span-1 overflow-hidden relative">
                    <img src={url + '' + images[1].path} alt="" className="rounded-lg w-full" />
                </div>
            </div>
        </> : images.length === 3 ? <>
            <div className="grid grid-rows-2 grid-cols-3 gap-1">
                <div className="col-span-2 row-span-2 overflow-hidden">
                    <img src={url + '' + images[0].path} alt="" className="rounded-lg w-full" />
                    </div>
                <div className="row-span-1 overflow-hidden">
                    <img src={url + '' + images[1].path} alt="" className="rounded-lg w-full" />
                    </div>
                <div className="row-span-1 overflow-hidden">
                    <img src={url + '' + images[2].path} alt="" className="rounded-lg w-full" />
                </div>
            </div>
        </> : null}
    </>





}
