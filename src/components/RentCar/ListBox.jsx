import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Grid, Icon } from "semantic-ui-react";

export class ListBox extends Component {
  // constructor(props) {
  //     super(props);
  // };

  render() {
    const { cardinfo, viewDetails } = this.props;
    console.log(cardinfo);
    console.log(typeof cardinfo);
    console.log(cardinfo.length);

    const mycards = cardinfo.map((card, i) => {
      return (
        <div
          className="ui card"
          style={{
            width: "100%",
            height: "auto",
            left: "0",
            top: "0"
          }}
          key={"card" + i}
        >
          <div className="content" style={{ width: "100%", padding: "0", backgroundColor: "#fdfdf6"}}>
            <div className="ui items" >
              <div className="item" style={{ padding: "1vw" }}>
                <Image
                  src={card.Car.Picture}
                  style={{
                    height: "auto",
                    width: "26vw",
                    maxHeight: "18vw"
                  }}
                />
                <div className="content" style={{ marginLeft: "1vw" }}>
                  <div
                    className="header"
                    style={{ margin: "0", fontSize: "2vw", paddingTop: "0.5vw", paddingBottom: "0.5vw" }}
                  >
                    {card.Car.Brand}
                  </div>
                  <div
                    className="meta"
                    style={{
                      fontSize: "1.2vw",
                      textAlign: "left",
                      paddingLeft: "1vw",
                      color: "#ff5959"
                    }}
                  >
                    <span>
                      {card.StartDate.substring(0, 10)}
                      &nbsp; to &nbsp;
                      {card.EndDate.substring(0, 10)}
                    </span>
                  </div>
                  <div
                    className="description"
                    style={{
                      fontSize: "1.2vw",
                      textAlign: "left",
                      paddingLeft: "1vw"
                    }}
                  >
                    <div>
                      <b>Seats: &nbsp;</b>
                      {new Array(card.Capacity || 1).fill(null).map((n, i) => (
                        <Icon name="user outline" key={"capacity" + i} />
                      ))}
                    </div>
                    <div className="ui">
                      <b>Location: &nbsp;</b>
                      {card.Location}
                    </div>
                    <div className="ui">
                      <b>Price:&nbsp;</b>
                      <Icon name="dollar sign" />
                      <b>{card.PricePerHour}</b>&nbsp;Per Hour
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon name="dollar sign" />
                        <b>{card.PricePerDay}</b>&nbsp;Per Day
                      </div>
                    </div>
                    <div className="ui">
                      <b>Rating:&nbsp;</b>
                      {card.Car.Rating}/5
                    </div>
                    <div className="ui">
                      <b>Rent Count:&nbsp;</b>
                      {card.Car.RentCount}
                    </div>
                  </div>
                  <div className="extra" style={{ textAlign: "right", marginTop: "0" }}>
                    <Button
                      color="vk"
                      compact
                      basic
                      onClick={e => viewDetails(e, card)}
                      name={card}
                    >
                      <Icon name="plus square outline" />
                      View more
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    console.log(mycards);
    return (
      <Grid divided style={{ margin: "0", padding: "0" }}>
        <Grid.Row style={{ margin: "0" }}>{mycards}</Grid.Row>
      </Grid>
    );
  }
}

export default ListBox;
