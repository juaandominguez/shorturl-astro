import React from 'react'
interface ActionButtonProps {
    isLoading: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({ isLoading }) => {
    return (
        <button className={`default-style action-btn mb-4 ${isLoading && " bg-slate-500 cursor-not-allowed"}`} type={`submit`} disabled={isLoading}>
            <p className="py-2">{isLoading ? "Loading..." : "Create Url"}</p>
        </button>
    )
}

export default ActionButton