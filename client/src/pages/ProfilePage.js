import React, { useEffect, useState } from 'react';
import {BsFillFilePersonFill} from "react-icons/bs";

export default function ProfilePage({name, renderedLatestData, balance }) {

  const [checked, setChecked] = useState({
    checkedName: false,
    checkedDate: false,
    checkedType: false,
    checkedAmount: false,
  });

  const [search, setSearch] = useState({
    searchName: "",
    searchType: "",
    searchDate: "",
    searchAmount: 0
  })

  const [searched, setSearched] = useState([]);

  const fetchData = async(name, value)=>{

    const toSearch = {
      name, 
      value
    }

    const response = await fetch('http://localhost:5000/dashboard/search',{
      method: "POST",
      headers: {token: localStorage.token, "Content-Type": "application/json"},
      body: JSON.stringify(toSearch)
    })

    const parseResponse = await response.json();

    setSearched(parseResponse);

    console.log(parseResponse);

  }

  const renderedSearchedData = searched.map((oneSearch, index)=>{
    let classes = "my-latest";
    if(oneSearch.finance_type === 'expense'){
      classes = classes + " b-red";
    } 
    if(oneSearch.finance_type === 'income') {
      classes = classes + " b-green";
    }

    return (
      <div className={classes} key={index}>
        <span>{oneSearch.finance_name}</span>
        <span>{oneSearch.finance_value}</span>
      </div>
      
    )
  })

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(checked.checkedAmount){
      fetchData("finance_value", search.searchAmount);
    }
    if(checked.checkedDate){
      fetchData("finance_date", search.searchDate);
    }
    if(checked.checkedName){
      fetchData("finance_name", search.searchName);
    }
    if(checked.checkedType){
      fetchData("finance_type", search.searchType);
    }

  }

  return (

    <div className='profile-con'>
      <div className='my-profile'>
        <h2> <BsFillFilePersonFill /> {name}</h2>
        <p>YOUR BALANCE</p>
        <p className='my-total'>${balance.total}.00</p>
        <div className='my-i-e'>
              <div className='my-i'>
               <p>INCOME</p>
               <span className='my-v1'>${balance.incomeValue}.00</span>
              </div>
              <div className='my-e'>
              <p>EXPENSE</p>
                <span className='my-v2'>${balance.expenseValue}.00</span>
              </div>
          </div>
          <div className='my-latests-c'>
            <p>History</p>
            <div className='my-latests'>
            {renderedLatestData}
            </div>
          </div>
      </div>
      <form onSubmit={handleSubmit} className='my-search'>
        <h2>Search by:</h2>
        <div>
            <label 
              className='form-check-label' 
              >
              Name
            </label>
          <input 
            type="radio" 
            className='form-check-input mx-3' 
            name="radio"
            value={checked.checkedName}
            onChange={(e)=>setChecked(prevChecked=>({
              prevChecked: false,
              checkedName: e.target.checked
            }))}
          />
          <input 
            disabled={!checked.checkedName && "disabled"} 
            type="text" 
            className='form-control'
            value={search.searchName}
            onChange={(e)=>setSearch(prevSearch=>({
              ...prevSearch,
              searchName: e.target.value
              })
            )}
          />
        </div>
        <div>
            <label 
              className='form-check-label' 
              >
              Date
            </label>
            <input 
              type="radio" 
              className='form-check-input mx-3' 
              name="radio"
              value={checked.checkedDate}
              onChange={(e)=>setChecked(prevChecked=>({
                prevChecked: false,
                checkedDate: e.target.checked
              }))}
            />
          <input 
            disabled={!checked.checkedDate && "disabled"} 
            type="date" 
            className='form-control' 
            value={search.searchDate}
            onChange={(e)=>setSearch(prevSearch=>({
              ...prevSearch,
              searchDate: e.target.value
            }))}
          />
        </div>
        <div>
            <label 
              className='form-check-label' 
              >
              Type
            </label>
            <input 
              type="radio" 
              className='form-check-input mx-3' 
              name="radio"
              value={checked.checkedType}
              onChange={(e)=>setChecked(prevChecked=>({
                prevChecked: false,
                checkedType: e.target.checked
              }))}
            />
          <input 
            disabled={!checked.checkedType && "disabled"} 
            type="text" 
            className='form-control' 
            value={search.searchType}
            onChange={(e)=>setSearch(prevSearch=>({
              ...prevSearch,
              searchType: e.target.value
            }))}
          />
        </div>
        <div>
            <label 
              className='form-check-label' 
              >
              Amount
            </label>
            <input 
              type="radio" 
              className='form-check-input mx-3' 
              name="radio"
              value={checked.checkedAmount}
              onChange={(e)=>setChecked(prevChecked=>({
                prevChecked: false,
                checkedAmount: e.target.checked
              }))}
            />
            <input 
              disabled={!checked.checkedAmount && "disabled"} 
              type="number" 
              className='form-control' 
              value={search.searchAmount}
              onChange={(e)=>setSearch(prevSearch=>({
                ...prevSearch,
                searchAmount: e.target.value
              }))}
            />
        </div>
          <button 
            type="submit" 
            style={{width: '100%'}} 
            className="btn btn-primary my-3" 
          > Search</button>
          <h3>Results</h3>
          <div className='results'>
              {renderedSearchedData}
          </div>
      </form>
    </div>
  )
}
