import classNames from "classnames";

export default function Button({ level, onClick, children, icon }) {
    return (
        <button
            className={classNames("px-6 py-2 rounded-lg", {
                'bg-blue-500 hover:bg-blue-600 text-white font-medium': level === "primary",
                'bg-blue-100 p-1 rounded-lg text-blue-400 w-min': level === "secondary"
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
