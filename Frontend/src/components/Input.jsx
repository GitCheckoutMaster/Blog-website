import React, { useId } from "react";

const Input = React.forwardRef( function Input({
    lable, 
    type="text",
    className="",
    ...props
}, reference) {
    // we didnt use id for input field, so we can use useId to generate unique id
	return (
        <div className="w-full">
            {lable && <label className="inline-block mb-1 pl-1">{lable}</label>}
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={reference} {...props} />
        </div>
    );
});

export default Input;
