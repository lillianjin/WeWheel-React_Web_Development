import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Rating, Card, Image, Dropdown, Input, Item, Grid, Icon, Feed} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export class ListBox extends Component {
    // constructor(props) {
    //     super(props);
    // };

    render(){
        const cards = this.props.cardinfo;
        const mycards = cards.map((card, i) => {
            return (
                <div className="ui card" style={{maxWidth: '90%', minWidth:'90%', height: '20vw', left: '5%'}} key={"card"+i}>
                    <div className="content" style={{padding: '0', height: '100%'}}>
                        <div className="ui items" style={{height: '100%'}}>
                            <div className="item" style={{height: '100%'}}>
                                <Image src={card.Car.Picture} style={{ height: "18vw", width: "auto", maxWidth: "60%", top: '1vw', left: '1vw' }} />
                                <div className="content" style={{padding: '1vw 2vw'}}>
                                    <div className="header" style={{margin: '1vw 0', fontSize: '2vw'}}>
                                        {card.Car.Brand}
                                    </div>
                                    <div className="meta" style={{fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw", color: "#ff5959"}}>
                                        <span>
                                            {card.StartDate.substring(0, 10)}
                                            &nbsp; to &nbsp;
                                            {card.EndDate.substring(0, 10)}
                                        </span>
                                    </div>
                                <div className="description" style={{fontSize:'1.2vw', textAlign: "left", paddingLeft: "3vw"}}>
                                    <div>
                                        <b>Seats: &nbsp;</b>
                                        { new Array(card.Capacity || 1).fill(null).map((n,i) => 
                                        <Icon name="user outline" key={"capacity"+i} />)}
                                    </div>
                                    <div className="ui">
                                        <b>Location: &nbsp;</b>
                                        {card.Location}
                                    </div>
                                    <div className="ui">
                                        <b>Price:&nbsp;</b>
                                        <Icon name="dollar sign"/>
                                        <b>{card.PricePerHour}</b>&nbsp;Per Hour 
                                        <div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Icon name="dollar sign"/>
                                            <b>{card.PricePerDay}</b>&nbsp;Per Day
                                        </div>
                                    </div>
                                    <div className="ui">
                                        <b>Rating:&nbsp;</b>{card.Car.Rating}
                                    </div>
                                    <div className="ui">
                                        <b>Rent Count:&nbsp;</b>
                                        {card.Car.RentCount}
                                    </div>
                                </div>
                                <div className="extra" style={{textAlign: "right"}}>
                                    <Link style={{ cursor: 'pointer' }}
                                        to={
                                            {
                                                pathname: `/rent/${card._id}`,
                                                state: {
                                                    details: card,
                                                }
                                            }
                                        }
                                    >
                                        <Button color='vk' compact basic>
                                            <Icon name='plus square outline' /> View more
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        });
        return(
            <Grid divided style={{margin: "0", padding: '0'}}>
                <Grid.Row style={{margin: "0"}}>
                    {mycards}
                </Grid.Row>
            </Grid>
        );
    }
}

export default ListBox