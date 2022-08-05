import React from 'react';


const Textarea = ({ onChange, value, title, required = false, readOnly = false }) => {
    return <div className="inputContainer large">
        <label>{title}</label>
        <textarea
            onChange={onChange}
            value={value}
            placeholder={title}
            required={required}
            readOnly={readOnly}
        ></textarea>
    </div>;
};

export default Textarea;