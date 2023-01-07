import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProfilePage from '../pages/ProfilePage';
import {Routes, Route} from 'react-router-dom';
import StatisticsPage from '../pages/StatisticsPage';
import NewTransactionPage from '../pages/NewTransactionPage';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [incomeValue ,setIncomeValue] = useState(0);
  const [expenseValue ,setExpenseValue] = useState(0);

  const balance = {
    total,
    incomeValue,
    expenseValue
  };

  const [latestData, setLatestData] = useState([
    {
      name: "",
      type: "",
      value: 0
    }
  ])
  
  const fetchLatests = async ()=>{
    	const response = await fetch('http://localhost:5000/dashboard/profile',{
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      setLatestData(parseResponse);

      let totalV = 0, incomeV=0, expenseV=0;
      parseResponse.map((data)=>{
        if(data.finance_type === 'income') {
          totalV = totalV + data.finance_value;
          incomeV = incomeV + data.finance_value;
        }
        else if(data.finance_type === 'expense'){
          totalV = totalV - data.finance_value;
          expenseV = expenseV + data.finance_value;
        }
      })
      setTotal(totalV);
      setIncomeValue(incomeV);
      setExpenseValue(expenseV);
  };

  useEffect(()=>{
    fetchLatests();
  }, []);


  const renderedLatestData = latestData.map((data, index)=>{
    
    let classes = "my-latest";
    if(data.finance_type === 'expense'){
      classes = classes + " b-red";
    } else {
      classes = classes + " b-green";
    }

    return (
      <div className={classes} key={index}>
        <span>{data.finance_name}</span>
        <span>{data.finance_value}</span>
      </div>
      
    )
  })


  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      
      const parseData = await res.json();

      setName(parseData.user_name);

    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="my-dashboard ">
      <Navbar name={name} logout={logout} />
      <Routes>
        <Route exact path="/" element={<ProfilePage name={name} balance={balance} renderedLatestData={renderedLatestData} />} />
        <Route exact path="/statistics" element={<StatisticsPage />} />
        <Route exact path="/transaction" element={<NewTransactionPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
