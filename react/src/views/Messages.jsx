import { Link } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import Button from "../components/fondations/Button"
import Avatar from "../components/fondations/Avatar"
export default function Messages()
{
    return (
        <div className="h-full flex gap-6 bg-gray-100 rounded-2xl p-6">
            <div className="h-full w-1/4 rounded-xl bg-white p-4">
                <div className="flex gap-3 items-stretch">
                    <div className="relative w-full flex gap-1 items-center bg-white rounded-lg border border-gray-300 pl-3 pr-1.5 py-1.5">
                        <MagnifyingGlassIcon className="w-5 text-gray-400"/>
                        <input
                            type="text"
                            name="search"
                            placeholder="Chercher un utilisateur..."
                            autoComplete={"off"}
                            className="border-none outline-none w-full text-slate-600 indent-1"
                        />
                    </div>
                    <Button level="secondary">Fav</Button>
                </div>
                <ul className="mt-6">
                    <li className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
                        <Avatar styles="rounded-full w-10" />
                        <div className="overflow-hidden">
                            <b className="text-slate-500">Username</b>
                            <p className="truncate text-sm text-gray-500 pr-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione illum laudantium, eligendi, eveniet sed soluta nihil, officia voluptas </p>
                        </div>
                        <div className="text-xs text-gray-500 flex flex-col items-end gap-1">
                            11:26
                            <StarIcon className="w-4 text-gray-300" />
                        </div>
                    </li>
                    
                </ul>
                
            </div>
            <div className="h-full w-3/4 rounded-xl bg-white p-4">
                Messages
            </div>
        </div>
    )
}