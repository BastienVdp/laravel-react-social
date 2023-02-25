import CreatePost from "../components/CreatePost";
import { useStateContext } from "../contexts/ContextProvider";

export default function Dashboard()
{
    const { posts } = useStateContext()

    return (
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6">
            <div className="w-full">
                <CreatePost />
                <div className="flex flex-col">
                {posts.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}
                </div>
            </div>
            <div className="shrink-0 w-1/3">
                side
            </div>


        </div>
    )
}

function PostItem({post}) {
    return (
        <div className="rounded-2xl bg-white p-4 mb-6">
            <div className="flex gap-4 items-center mb-2">
                <img src="https://via.placeholder.com/50" alt="img" className="w-11 rounded-full" />
                <div className="flex flex-col">
                    <b className="text-slate-500">Username</b>
                    <span className="text-xs text-gray-400">15h. Public</span>
                </div>
            </div>
            <p className="text-slate-700">
                {post.content}
            </p>
            <div>
                footer
            </div>
        </div>
    )
}
