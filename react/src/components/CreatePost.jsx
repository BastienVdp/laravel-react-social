import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "./fondations/Button";
import usePosts from "../composables/Posts";
import Avatar from "./fondations/Avatar";
import { useStateContext } from "../contexts/ContextProvider";
import CreatePostSkeleton from "./fondations/skeletons/CreatePostSkeleton";

export default function CreatePost({loading, createPost}) {
    const { currentUser } = useStateContext()
    const { post, setPost} = usePosts()


    const [images, setImages] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault()
        await createPost(post.content, images)
        setPost({content: ''})
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
                    <Button level="primary" styles="px-4 py-2">Post</Button>
                </div>
            </form>
        </div>
    )
}
