import React, {useEffect, useState} from "react";
import './jonas.css';
import Carousel from "react-bootstrap/Carousel";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.png";
import img3 from "../img/img3.jpg";
import axios from "axios";
import {Button, Card} from "react-bootstrap";


type weatherData = {
    temperature: string,
    wind: string,
    description: string,
}

const getWeather = (): Promise<any> => {
    return axios("https://goweather.herokuapp.com/weather/Berlin").then((res) => {
        if (res.status !== 200) throw new Error("Request failed.");
        return res.data;
    });
};






const Jonas: React.FC = () => {

    const [data, setData] = useState<weatherData>({temperature: "", wind: "", description: ""});
    const [bool, setBool] = useState<boolean>(false);

    useEffect(() => {
        getWeather()
            .then((result) => {
                setData(result);
            })
            .catch(console.error);
    }, []);

    const handleClick = () =>  {
        setBool(!bool);
    }
  

    return (

       
    <div className="jonas">
        <Button id="weatherButton" onClick={handleClick}> Show weather of Berlin
        </Button>
        {bool && <Card id="weather"> 
                    <Card.Body>
                        <Card.Title>
                            Weather of Berlin
                        </Card.Title>
                        <Card.Subtitle>
                            Today
                        </Card.Subtitle>
                        <Card.Text>
                            <p></p>
                            <p>Temperature: {data.temperature} </p>
                            <p>Wind:{data.wind}</p>
                            <p>Description:{data.description}</p>   
                        </Card.Text>
                    </Card.Body>
                </Card>}
        
        <h1>Welcome to our Webapplication!</h1>
        <h2>We present: MirrorMe</h2>
        <p>Request your personal data from any Company and we create your Mirror Profile!</p>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img2}
                alt="Second slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img3}
                alt="Third slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>);
        
    
};

export default Jonas;


