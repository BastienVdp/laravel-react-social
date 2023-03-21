import { useState } from 'react'
import axiosClient from '../axios'
import toast from "react-hot-toast"
import { useStateContext } from "../contexts/ContextProvider";
import { AxiosError } from 'axios';

export default function usePosts()
{
    const { currentUser } = useStateContext()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState({})
    const [meta, setMeta] = useState({})

    const getPosts = async () => {
        await axiosClient.get('/post')
            .then(({data}) => {
                setPosts(data.data)
                // setLinks(data.links)
                // setMeta(data.meta)
                setLoading(false)
            })
    }

    const createPost = async (content, images) => {
        axiosClient.post('/post', {
            content: content,
            images: images
        })
        .then(({data}) => {
            setPosts(data.posts)

            toast.success('Votre publication a été créée.')
        })
        .catch(err => {
            if(err instanceof AxiosError) toast.error(err.response.data.message)
            console.log(err, err.response);
            // setErrors
        })
    }
    return {
        posts,
        getPosts,
        createPost,
        loading
    }
}
