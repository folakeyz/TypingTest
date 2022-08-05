

const Select = ({ onChange, value, title, options, required = false, filter = "", filterValue = "" }) => {

    return <div className="inputContainer large">
        <label>{title}</label>
        <select
            onChange={onChange}
            value={value}
            // defaultValue={title}
            required={required}> <option value="" disabled>{title}</option>
            {options && options.map((item, i) => (
                filter ? <option value={item[filterValue]} key={i}>{item[filter]}</option> : <option value={item.value} key={i}>{item.text}</option>
            ))}


        </select>
    </div>;
};

export default Select;