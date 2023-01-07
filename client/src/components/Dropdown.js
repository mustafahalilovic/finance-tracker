import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BsFillCaretDownFill} from "react-icons/bs";

export default function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const [selection, setSelection] = useState(null);
    const divEl = useRef();

    const options = [
        {label: "Profile", value:""},
        {label: "New Transaction", value:"transaction"},
        {label: "Statistics", value:"statistics"}
    ]

    useEffect(()=>{
        const handler = (event)=>{
            if(!divEl.current) return;
            if(!divEl.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handler, true);

        return ()=>{
            document.removeEventListener('click', handler);
        }
    }, []);

    const handleOptionSelect = (label)=>{
        setIsOpen(false);
        setSelection(label);
    }

    const renderedOptions = options.map((option)=>{
        return <Link onClick={()=>handleOptionSelect(option.label)} to={option.value} key={option.value}>
            {option.label}
        </Link>
    })

  return (
    <div ref={divEl} className='my-dropdown'>
        <div className='my-option' onClick={()=>setIsOpen(current => !current)}>
            {selection ? selection : 'Select...'}
            <BsFillCaretDownFill />
        </div>
        {isOpen && <div className='my-options'>
            {isOpen && renderedOptions}
            </div>}
    </div>
  )
}
