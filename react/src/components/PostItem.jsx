import { ArrowTopRightOnSquareIcon, ChatBubbleBottomCenterIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "./fondations/Button";
import axiosClient from "../axios"
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

export default function PostItem({post}) {

    const { currentUser } = useStateContext()

    const [liked, setLiked] = useState(
        post.likes?.filter(element => element.user_id === currentUser.id).length > 0
            ? true
            : false
        )

    const [count, setCount] = useState({
        likes: post.likes?.length,
        comments: 0,
        share: 0
    })

    const like = () => {
        axiosClient.post('/like', {
            post_id: post.id
        })
        .then((res) => {
            setLiked(true)
            setCount({
                ...count,
                likes: res.data.likes.length
            })
        })
        .catch(err => {
            console.log(err, err.response);
        })
    }

    const unlike = () => {
        axiosClient.delete(`/like/${post.id}`)
            .then((res) => {
                setLiked(false)
                setCount({
                    ...count,
                    likes: res.data.likes.length
                })
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return (
        <div className="rounded-2xl bg-white p-4 mb-6">
            <div className="flex gap-4 items-center mb-3">
                <img src="https://via.placeholder.com/50" alt="img" className="w-11 rounded-full" />
                <div className="flex flex-col">
                    <b className="text-slate-500">{post.user.username}</b>
                    <span className="text-sm text-gray-400">15h. Public</span>
                </div>
            </div>
            <p className="text-slate-700 mb-1">
                {post.content}
            </p>
            {post.images.length > 0 ? <PostImage images={post.images}/> : null}
            <div className="flex justify-between items-center py-2">
                {count.likes}
                <ul className="flex gap-3 text-gray-400">
                    <li>3 Comments</li>
                    <li>17 Share</li>
                </ul>
            </div>
            <div className="flex justify-between py-2 text-slate-500 text-sm font-semibold border-t border-b">
                <button className={`w-auto flex gap-1 items-center ${liked ? 'text-red-300': null}`} onClick={liked ? unlike : like}>
                    <HeartIcon className="w-4"/>
                    Like
                </button>
                <button className="w-auto flex gap-1 items-center">
                    <ChatBubbleBottomCenterIcon className="w-4"/>
                    Comments
                </button>
                <button className="w-auto flex gap-1 items-center">
                    <ArrowTopRightOnSquareIcon  className="w-4"/>
                    Share
                </button>
            </div>
            <div className="flex pt-3 gap-2">
                <div className="flex gap-2 w-full">
                    <img src="https://via.placeholder.com/50" alt="img" className="w-9 h-9 rounded-full flex-none" />
                    <input
                        type="text"
                        className="w-full border-none outline-none bg-gray-100 rounded-lg px-2 text-sm"
                        placeholder="Write a comment"
                    />
                </div>
                <button className="bg-blue-100 p-2 rounded-lg text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
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
