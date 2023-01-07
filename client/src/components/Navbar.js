import React from 'react';
import { Link } from 'react-router-dom';
import {BsFillPersonFill, BsClipboardPlus, BsCurrencyExchange, BsGraphUp } from "react-icons/bs";

export default function Navbar({logout}) {
  return (
    <div className='my-navbar'>
            <h1 className=""> <BsCurrencyExchange /> Expense Tracker</h1>
            <div className='nav-links' >
                <Link className='nav-link' to="/dashboard"> <BsFillPersonFill /> Profile</Link>
                <Link className='nav-link' to="/dashboard/transaction"> <BsClipboardPlus /> New Transaction</Link>
                <Link className='nav-link' to="/dashboard/statistics"> <BsGraphUp /> Statistics</Link>
            </div>
            <button className="btn btn-primary" onClick={(e)=>logout(e)}>
                Logout
            </button>
    </div>
  )
}
