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

    const getFriendsRequest = async () => {
        await axiosClient.get(`/friendship/pending/${currentUser.id}`).then(({data}) => {
                setFriendsRequest(data.pending_requests)
                // setLoading(false)
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
        }).catch((err) => console.log(err))
    }

    const addFriend = async (id) => {
        await axiosClient.post(`/friendship/send`, {
            sender: currentUser.id,
            recipient: id
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const getAllFriendships = async (id) => {
        await axiosClient.get(`/friendship/all/${id}`)
            .then((res) => {
                setFriendships(res.data.all_requests)
                setFriends(res.data.all_requests.filter(f => f.status === 1))
                console.log(friends)
            })
            .catch(err => setErrors(err))
    }
    return {
        friends,
        friendsRequest,
        getFriendsRequest,
        friendships,
        getAllFriendships,
        acceptFriendRequest,
        denyFriendRequest,
        addFriend,
        msg,
        errors
    }
}
