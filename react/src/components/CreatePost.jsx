import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "./fondations/Button";
import axiosClient from "../axios"
import { useNavigate } from "react-router-dom";
import Avatar from "./fondations/Avatar";
import { useStateContext } from "../contexts/ContextProvider";
import CreatePostSkeleton from "./fondations/skeletons/CreatePostSkeleton";

export default function CreatePost({getPosts, loading}) {
    const { currentUser } = useStateContext()

    const [post, setPost] = useState({
        content: '',
    })

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()

        axiosClient.post('/post', {
            content: post.content,
            images: images
        })
        .then((res) => {
            setPost({content: ''})
            getPosts()
        })
        .catch(err => {
            console.log(err, err.response);
            // setErrors
        })
    }

    const onImageChoose = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result)
                    });
                    reader.addEventListener('error', reject)
                    reader.readAsDataURL(file)
                }))
            });

            Promise.all(promises).then(images => {
                setImages(images)
            }, error =>  console.error(error))
        }
    }

    if(loading) return <CreatePostSkeleton />
    return (
        <div className="mb-6 bg-white p-4 rounded-2xl">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="flex gap-3 mb-4">
                    <Avatar url={currentUser.avatar} styles="w-11 rounded-full" />
                    <input
                        type="text"
                        name="content"
                        value={post.content}
                        onChange={e => setPost({ ...post, content: e.target.value})}
                        className="w-full border-none outline-none bg-gray-100 rounded-lg indent-4"
                        placeholder="What's happening?"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-slate-500 font-semibold">
                        <button className="relative flex items-center gap-2">
                            <input
                                type="file"
                                className="absolute left-0 top-0 right-0 bottom-0 opacity-0 z-0"
                                onChange={onImageChoose}
                                multiple
                            />
                            <PhotoIcon className="w-6"/>
                            Photo
                        </button>
                    </div>
                    <Button level="primary">Post</Button>
                </div>
            </form>
        </div>
    )
}
