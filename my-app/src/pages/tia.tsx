import React, { useState } from "react";
import axios from 'axios';


const Tia: React.FC = () => {

    const [banks, setBanks] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(
        'http://api.worldbank.org/v2/country/?format=json'
        );

        setBanks(response.data[1]); 
        console.log(response.data[1]);
    }
    const renderdata = (index: number) => {
        if (banks.length > 0 ){
            return (<div className="bank" >
                   
            <h2>{banks[index]['name']}</h2>
          
      

      <div className="details">
        <p>Region: {banks[index]['region']['value']}</p>
        <p>Income Level: {banks[index]['incomeLevel']['value']}</p>
        <p>Capital City: {banks[index]['capitalCity']}</p>
        
      </div>
  
    </div>)
        }
        return (<div></div>)
    }
    return (
        <div className="App">
                <h1>World Bank Country</h1>
                <h2>Fetch a list from an API and find out how high the income is in the countries around the world </h2>
            <div>

            <button className="fetch-button" onClick={fetchData}>
            Click on the Button
            </button>
            <br />
            </div>
            <div className="banks">
        {banks.length>0 && banks.map((bank, index)=>{return renderdata(index)})}
        
      </div>

        
        </div>
    );


};

export default Tia;
