import React from 'react'

const Input = ({ onChange, value, type, title, readOnly = false, required = false, onKeyDown=null,ref=null }) => {
    return <div className="inputContainer large">
        <label>{title}</label>
        <input
            type={type}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={ref}
            value={value}
            placeholder={title}
            readOnly={readOnly}
            required={required}
        />
    </div>;
};

export default Input;