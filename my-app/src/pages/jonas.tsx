import React from "react";
import './jonas.css';
import Carousel from "react-bootstrap/Carousel";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.png";
import img3 from "../img/img3.jpg";


const Jonas: React.FC = () => {

    return (
    <div className="jonas">
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

