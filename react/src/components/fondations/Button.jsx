import classNames from "classnames";

export default function Button({ level, onClick, children, icon }) {
    return (
        <button
            className={classNames("px-6 py-2 rounded-lg", {
                'bg-blue-500 hover:bg-blue-600 text-white': level === "primary",
                'bg-blue-200 px-1 py-1 text-blue-500': level === "secondary"
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
