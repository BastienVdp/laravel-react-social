import { useState } from "react"
import axiosClient from "../axios"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

export default function useFriends()
{
    const navigate = useNavigate()
    const { currentUser } = useStateContext()

    const [friends, setFriends] = useState([])
    const [friendsRequest, setFriendsRequest] = useState([])
    const [friendships, setFriendships] = useState([])
    const [msg, setMsg] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    const getFriendsRequest = async () => {
        await axiosClient.get(`/friendship/pending/${currentUser.id}`).then(({data}) => {
                setFriendsRequest(data.pending_requests)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const acceptFriendRequest = async (sender) => {
        await axiosClient.post(`/friendship/accept`,
        {
            recipient : currentUser.id,
            sender
        })
        .then(() => {
            navigate("/profile")
            setLoading(false)
        }).catch((err) => console.log(err))
    }

    const denyFriendRequest = async (id) => {
        await axiosClient.post(`/friendship/deny`,
        {
            recipient: currentUser.id,
            sender: id,
        })
        .then(({data}) => {
            navigate("/profile")
            setLoading(false)
        }).catch((err) => console.log(err))
    }

    const addFriend = async (id) => {
        await axiosClient.post(`/friendship/send`, {
            sender: currentUser.id,
            recipient: id
        })
        .then((res) => {
            console.log(res)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const getFriends = async (id = currentUser.id) => {
        await axiosClient.get(`/friendship/mine/${id}`)
            .then(resp => {
                setFriends(resp.data.friends)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }

    return {
        friends,
        friendsRequest,
        getFriends,
        getFriendsRequest,
        friendships,
        acceptFriendRequest,
        denyFriendRequest,
        addFriend,
        msg,
        errors,
        loading, setLoading
    }
}
