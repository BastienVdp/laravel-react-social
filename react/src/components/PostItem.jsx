import { ArrowTopRightOnSquareIcon, ChatBubbleBottomCenterIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "./fondations/Button";

export default function PostItem({post}) {
    return (
        <div className="rounded-2xl bg-white p-4 mb-6">
            <div className="flex gap-4 items-center mb-2">
                <img src="https://via.placeholder.com/50" alt="img" className="w-11 rounded-full" />
                <div className="flex flex-col">
                    <b className="text-slate-500">Username</b>
                    <span className="text-sm text-gray-400">15h. Public</span>
                </div>
            </div>
            <p className="text-slate-700">
                {post.content}
            </p>
            {post.images.length > 0 ? <PostImage images={post.images}/> : null}  
            <div className="flex justify-between items-center py-2">
                liked
                <ul className="flex gap-3 text-gray-400">
                    <li>3 Comments</li>
                    <li>17 Share</li>
                </ul>
            </div>
            <div className="flex justify-between py-2 text-slate-500 text-sm font-semibold border-t border-b">
                <button className="w-auto flex gap-1 items-center">
                    <HeartIcon  className="w-4"/>
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
                        className="w-full border-none outline-none bg-gray-100 rounded-lg px-2 text-xs"
                        placeholder="Write a comment"
                    />
                </div>
                <button className="bg-blue-100 p-2 rounded-lg text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function PostImage({images}) {

    return <>
         {images.length === 1 ? <>
            <img src={images[0].path} alt="" className="rounded-lg w-full" />
        </> : images.length === 2 ? <>
            <div className="grid grid-cols-2 gap-1">
                <img src={images[0]} alt="" className="rounded-lg row-span-2" />     
                <img src={images[1]} alt="" className="rounded-lg row-span-1" />
            </div> 
        </> : images.length === 3 ? <>
            <div className="grid grid-rows-2 grid-cols-3 gap-1">
                <img src={images[0]} alt="" className="rounded-lg col-span-2 row-span-2" />     
                <img src={images[0]} alt="" className="rounded-lg row-span-1 " />
                <img src={images[0]} alt="" className="rounded-lg row-span-1" />
            </div>
        </> : null}
    </>

       
       

    
}
