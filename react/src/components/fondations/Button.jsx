import classNames from "classnames";

export default function Button({ level, onClick, children, icon }) {
    return (
        <button
            className={classNames("px-6 py-2 rounded-lg font-semibold", {
                'bg-blue-500 hover:bg-blue-600 text-white ': level === "primary",
                'bg-blue-100 p-1 rounded-lg text-blue-400 w-min': level === "secondary",
                'bg-gray-100 px-0 py-0 rounded-lg text-gray-500 w-min': level === "neutral",
                'bg-transparent px-0 py-0 rounded-lg text-slate-500 w-min': level === "nobg",
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
