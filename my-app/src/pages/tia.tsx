import React, { useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import YouTube from "react-youtube";


const Tia: React.FC = () => {

    const [banks, setBanks] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(
        'http://api.worldbank.org/v2/country/?format=json'
        );

        setBanks(response.data[1]); 
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
    }
    const onPlayerReady = (event: any) => {
            event.target.loadVideoById("gjJBTSIkk4A");
            event.target.seekTo(43);
            event.target.playVideo();
        }

    return (
        <div className="App">
                <h1>World Bank Country</h1>
                <h2>Fetch a list from an API and find out how high the income is in the countries around the world </h2>
            <div>

            <Button className="fetch-button" onClick={fetchData}>
            Click on the Button
            </Button>
            <YouTube
                opts={{ height: '0', width: '0' }}
                onReady={onPlayerReady}
            ></YouTube>

            <br />
            </div>
            <div className="banks">
        {banks.length>0 && banks.map((bank, index)=>{return renderdata(index)})}
        
      </div>

        
        </div>
    );


};

export default Tia;
