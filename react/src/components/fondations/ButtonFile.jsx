import React from 'react'

export default function ButtonFile({ onChange, styles, icon, children, multiple}) {
  return (
    <button className={styles}>
        {multiple ? (
            <input
                type="file"
                className="absolute left-0 top-0 right-0 bottom-0 opacity-0 z-0"
                onChange={onChange}
                multiple
            />
        ) : (
            <input
                type="file"
                className="absolute left-0 top-0 right-0 bottom-0 opacity-0 z-0"
                onChange={onChange}
            />
        )}
        {icon}
        {children}
    </button>
  )
}
