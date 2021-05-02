import React from "react";
import axios from 'axios';
import './adrian.css';
import { Entry } from '../interfaces/entry';
import { Button } from "react-bootstrap";
import YouTube from "react-youtube";

const baseAPIUrl = 'https://api.coindesk.com/v1/bpi/';

class AdrianTab extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            currency: 'EUR'
        };
    }

    changeCurrency(currency: String) {
        if (currency === 'EUR') {
            this.setState({
                currency: 'USD'
            })
        } else {
            this.setState({
                currency: 'EUR'
            })
        }
    }

    fetchData =  async () =>{
        try {
            const response = await axios.get(baseAPIUrl + `historical/close.json?currency=${this.state.currency}`);
            const entryArray: Entry[] = [];
            const bpi = response.data[`bpi`];

            for (const key in bpi) {
                if(bpi.hasOwnProperty(key)) {
                    entryArray.push({ 
                        currencyDate: new Date(key), 
                        currencyValue: bpi[key] 
                    });
                }
            }
            const finalEntryArray = entryArray.reverse();
            this.setState({ entries: finalEntryArray });
            console.log(entryArray);
        } catch (error) {
            console.log(error);
        }
    }

    onPlayerReady(event: any) {
        event.target.loadVideoById("hRGIrrjuLYA");
        event.target.playVideo();
    }

    componentDidUpdate() {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="adriantab">
                <YouTube
                    opts={{ height: '0', width: '0' }}
                    onReady={this.onPlayerReady}
                ></YouTube>
                <div className="container">
                    <Button className="btn btn-success" onClick={() => this.changeCurrency(this.state.currency)}>Change currency</Button>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><h3>Day</h3></th>
                                        <th><h3>Bitcoin Stonks in {this.state.currency}</h3>
                                        </th>
                                    </tr>
                                    {
                                        this.state.entries.map((entry, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td><span>{entry.currencyDate.toDateString()}</span></td>
                                                    <td><span>{entry.currencyValue}</span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AdrianTab;
