import classNames from "classnames";

export default function Button({ level, onClick, children, icon, styles, disabled }) {
    return (
        <button
            className={classNames(`${styles} rounded-lg font-medium `, {
                'bg-blue-500 hover:bg-blue-600 text-white': level === "primary",
                'px-4 py-2 bg-blue-100 p-1 rounded-lg group text-blue-400 w-min': level === "secondary",
                'bg-gray-200 px-3 py-2 rounded-lg text-gray-500 w-auto': level === "neutral",
                'bg-transparent px-0 py-0 rounded-lg text-slate-500 w-min': level === "nobg",
            })}
            disabled={disabled}
            onClick={onClick}
        >
            <span className="group-hover:scale-110 transition-all ease-in-out">{children}</span>
        </button>
    )
}
