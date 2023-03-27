import { useState } from 'react'
import axiosClient from '../axios'
import toast from "react-hot-toast"
import { useStateContext } from "../contexts/ContextProvider";
import { AxiosError } from 'axios';
import success from '../toast/success';

export default function usePosts()
{
    const { currentUser } = useStateContext()
    const [post, setPost] = useState({content: ''})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [paginate, setPaginate] = useState({
        next_page_url: "/post",
    })

    const getPosts = async () => {
        setLoading(true)
        await axiosClient.get(paginate.next_page_url)
            .then(({data}) => {
                if(data.posts.length)
                    setPosts([...posts, ...data.posts])
                    setPaginate(data.pagination)
                    setLoading(false)
            })
    }

    const createPost = async (content, images) => {
        axiosClient.post('/post', {
            content: content,
            images: images
        })
        .then(({data}) => {
            setPosts([...data.posts, ...posts])
            toast.success(success.createPost)
        })
        .catch(err => {
            if(err instanceof AxiosError) toast.error(err.response.data.message)
            console.log(err, err.response);
            // setErrors
        })
    }
    return {
        post, setPost,
        posts,
        getPosts,
        createPost,
        loading,
        paginate
    }
}
