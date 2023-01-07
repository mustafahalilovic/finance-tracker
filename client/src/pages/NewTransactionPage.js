import React, { useEffect, useState } from 'react'
import {useAsyncError, useNavigate} from 'react-router-dom';

export default function NewTransactionPage() {
  const [selected, setSelected] = useState();
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();

  const navigate = useNavigate();

  useEffect(()=>{
    const currentDate = new Date();
    const stringDate = currentDate.getDay() + "." + parseInt(currentDate.getMonth()+1)  + "." + currentDate.getFullYear();
    setDate(stringDate);
  }, []);

  const selectDropdown = (e)=>{
    setSelected(e.target.value);
  }

  const handleSubmit = async (e)=>{
    //e.preventDefault();

    const data = {
      finance_value: amount,
      finance_type: selected,
      finance_date: date,
      finance_name: name
    }

    const response = await fetch('http://localhost:5000/dashboard/transaction', {
      method: "POST",
      headers: {token: localStorage.token, "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })

    const parseResponse = await response.json();

    if(parseResponse){
      window.alert("Succesfully addded");
    }else{
      window.alert("Error while trying to add data");
    }

   //navigate('/dashboard');
  }

  return (
    <div className='my-transaction'>
      <h2>Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label>Amount: </label>
          <input 
          required
          className='form-control' 
          type="number" 
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          />
          <label>Type: </label>
          <select onChange={selectDropdown} className="form-select">
            <option selected>Select type of finance</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label>Name for transaction:</label>
          <input 
          required
          className='form-control' 
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)} 
          />
          <button 
          className='btn btn-primary my-3' 
          style={{width:'100%'}} 
          type="submit">Add</button>
        </form>
    </div>
  )
}
