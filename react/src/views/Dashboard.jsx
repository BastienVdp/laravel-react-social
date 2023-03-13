import { useState, useEffect } from "react"
import axiosClient from "../axios"
import Feed from "../components/Feed"
import Card from "../components/fondations/Card"

export default function Dashboard()
{
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const getPosts = async () => {
        await axiosClient.get('/post')
            .then(({data}) => {
                setPosts(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
            <div className="w-full">
                <Feed posts={posts} getPosts={getPosts} loading={loading}/>
            </div>
            <div className="shrink-0 w-1/3">
                <Card title="Tu pourrais connaitre">
                    Lolilol
                </Card>
            </div>
        </div>
    )
}

