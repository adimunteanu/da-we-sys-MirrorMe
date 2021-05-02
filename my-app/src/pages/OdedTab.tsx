import React, { useEffect, useState } from "react";
import './OdedTab.css';
import { Button } from "react-bootstrap";
import YouTube from "react-youtube";

const OdedTab: React.FC = () => {
    const [hoverCounter, setHoverCounter] = useState(0);
    const [clickCounter, setClickCounter] = useState(10);
    const [isFinal, setIsFinal] = useState(false);
    const [rickRolled, setRickRolled] = useState(false);
    const [player, setPlayer] = useState(null);

    const lyrics = ["Top Left", "Top Right", "Bottom Left", "Bottom Right", "Center"];
    const positions = [
        { left: 0 },
        { right: 0 },
        { left: 0, bottom: 0 },
        { right: 0, bottom: 0 },
        {}
    ];

    useEffect(() => {
        if (clickCounter === 0 && !rickRolled) {
            if (player) {
                setRickRolled(true);
            }
        }
    }, [clickCounter])

    const updateButtonState = () => {
        if (hoverCounter < 4) {
            setHoverCounter(hoverCounter + 1);
        }

        if (hoverCounter === 3) {
            setIsFinal(true);
        }
    }

    const onPlayerReady = (event: any) => {
        if (!rickRolled) {
            setPlayer(event.target);
            event.target.loadVideoById("FTQbiNvZqaY");
            event.target.seekTo(3);
        } else {
            event.target.loadVideoById("dQw4w9WgXcQ");
        }

        event.target.playVideo();
    }

    const onRickClick = (event: any) => {
        if (isFinal) {
            if (clickCounter > 0) {
                setClickCounter(clickCounter - 1);
            }
        }
    }

    return (
        <div id="oded" className={isFinal ? "oded-final" : ""}>
            {!rickRolled && <Button
                className="rick-btn"
                variant="primary"
                onMouseOver={updateButtonState}
                onClick={onRickClick}
                style={positions[hoverCounter]}
            >
                {isFinal ? clickCounter : lyrics[hoverCounter]}
            </Button>}
            <YouTube
                opts={rickRolled ? {} : { height: '0', width: '0' }}
                onReady={onPlayerReady}
            ></YouTube>
        </div>
    );

};

export default OdedTab;
