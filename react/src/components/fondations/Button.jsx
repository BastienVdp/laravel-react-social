import classNames from "classnames";

export default function Button({ level, onClick }) {
    return (
        <button
            className={classNames("px-6 py-2 rounded-lg", {
                'bg-blue-500 hover:bg-blue-600 text-white': level === "primary"
            })}
            onClick={onClick}
        >
            Post
        </button>
    )
}
