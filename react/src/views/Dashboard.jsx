import { useState, useEffect } from "react"
import Feed from "../components/Feed"
import Card from "../components/fondations/Card"
import usePosts from "../composables/Posts"

export default function Dashboard()
{


    return (
        <div className="bg-gray-100 rounded-2xl p-6">
            <Feed />
        </div>
    )
}

