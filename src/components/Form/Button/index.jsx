import React from 'react'

const Button = ({ onClick, type = "submit", title, disabled = false, loading = false, isFullWidth = false, size = "large", Icon, color = "warning" }) => {
    return <div className={isFullWidth ? `inputContainer ${size}` : `btnContainer ${size}`}>
        <button type={type} onClick={onClick} disabled={disabled || loading} className={`btn ${color}`}>
            {title} {Icon && <Icon />} {loading && <span className='loading'></span>}
        </button>
    </div>
}

export default Button