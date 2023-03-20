import Avatar from "../Avatar"
export default function CommunitySkeleton() 
{
    return <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex gap-3 bg-white rounded-lg p-4">
            {[0, 1, 2].map((tab, i) => (
            <button
                key={i}
                className="skeleton rounded-lg w-full py-1.5"
            >
                {i}
            </button>
            ))}      
        </div>
        <div className="mt-4 rounded-lg columns-1 md:columns-2 lg:columns-3">
            <div className="p-4 bg-white rounded-lg break-inside-avoid-column mb-4">
                <div className="flex gap-2 items-center mb-5">
                    <div className="rounded-full w-14 h-14 skeleton"></div>
                    <div className="text-sm w-1/5">
                        <b className="block skeleton skeleton-text"></b>
                        <span className="block skeleton skeleton-text__community"></span>
                    </div>
                </div>
                <div className="flex gap-3 mt-3">
                    <div className="w-full py-1 rounded-lg skeleton">
                        Supprimer
                    </div>
                    <div className="rounded-lg w-full py-1 skeleton">
                        Bloquer
                    </div>
                </div>
            </div>
        </div>
    </div>

}