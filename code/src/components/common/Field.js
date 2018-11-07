import React from 'react';
const inputStyle = {
    width: '100%',
    height: '30px'
}
const errorStyle = {
    color: 'red'
}

export const Field = ({ input, label, type, meta: { touched, error, warning } }) => (

    <div>
        <label className="control-label">{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} style={inputStyle} />
            {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

export const renderSelect = ({ input, label, meta: { touched, error, warning }, data }) => (
    <div>
        <label className="control-label">{label}</label>
        <div>
            <select {...input} style={inputStyle}>
                <option></option>
                {data.map(item =>
                    <option value={item.name} key={item.id}>{item.name}</option>)
                }
            </select>
            {touched && ((error && <span style={errorStyle}>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);