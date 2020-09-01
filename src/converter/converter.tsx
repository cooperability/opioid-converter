import * as React from "react";
import { Component } from "react";
import "./converter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Logo from "./CHOIR-provider-logo-transparent.png";

type medicationItem = {
  display: string;
  increment: number;
  unit: string;
  dailyDose: number;
  toMorphine: number;
};

var medicationArray: Array<medicationItem> = [
  {
    display: "Butrans",
    increment: 5,
    unit: "µg/h",
    dailyDose: 0,
    toMorphine: 4.5,
  },
  {
    display: "Codeine",
    increment: 30,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.15,
  },
  {
    display: "Duragesic",
    increment: 12.5,
    unit: "µg/h",
    dailyDose: 0,
    toMorphine: 2.4,
  },
  {
    display: "Hydrocodone",
    increment: 2.5,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 1,
  },
  {
    display: "Hydromorphone",
    increment: 2,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 4,
  },
  {
    display: "Levorphanol",
    increment: 2,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 7.5,
  },
  {
    display: "Meperidine",
    increment: 50,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.1,
  },
  {
    display: "Methadone",
    increment: 5,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.25,
  },
  {
    display: "Morphine",
    increment: 5,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 1,
  },
  {
    display: "Oxycodone",
    increment: 5,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 1.5,
  },
  {
    display: "Oxymorphone",
    increment: 2.5,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 3,
  },
  {
    display: "Pentazocin",
    increment: 30,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.2,
  },
  {
    display: "Tapentadol",
    increment: 25,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.367,
  },
  {
    display: "Tramadol",
    increment: 50,
    unit: "mg",
    dailyDose: 0,
    toMorphine: 0.2,
  },
];

class Converter extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      morphineEq: medicationArray[0].dailyDose,
      methadoneEq: medicationArray[1].dailyDose,
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  handleClick(index: number, label: any) {
    let medName = `${medicationArray[index].display}`;
    medicationArray.forEach((element) => {
      if (medName === element.display) {
        let newValue = element.dailyDose;
        label === "minus"
          ? (newValue -= element.increment)
          : (newValue += element.increment);
        element.dailyDose = newValue;
      }
    });
    this.forceUpdate();
    this.calculateResult();
  }

  handleChange(event: any, index: number) {
    {
      event.target.value === ""
        ? (medicationArray[index].dailyDose = 0)
        : (medicationArray[index].dailyDose = parseInt(event.target.value));
    }

    this.forceUpdate();
    this.calculateResult();
  }

  calculateResult() {
    let newMorphineEq = 0;
    let newMethadoneEq = 0;
    for (var i = 0; i < 14; i++) {
      var newEquivalence = medicationArray[i].dailyDose;
      if (medicationArray[i].display === "Methadone") {
        newEquivalence = Math.pow(newEquivalence, 2);
      }
      newEquivalence *= medicationArray[i].toMorphine;
      newMorphineEq += newEquivalence;
      newMethadoneEq = (Math.sqrt(newMorphineEq * 4));
    }
    this.setState({ morphineEq: Math.round(newMorphineEq) });
    this.setState({ methadoneEq: Math.round(newMethadoneEq) });
  }

  render() {
    return (
      <div className="Converter">
        <h1 style={{ justifyItems: 'baseline' }}>
          <span>
            <img src={Logo} style={{ scale: "inherit", width: "300px" }}></img>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Opioid Converter
        </h1>
        <div className="main display" style={{
          backgroundColor: "maroon",
          border: "1px solid dimgray",
          paddingLeft: "30px",
          borderRadius: "10px",
          justifyItems: "center",
        }}>
          <h2 style={{ color: "white" }}>
            Morphine Equivalence: {this.state.morphineEq}
          </h2>
          <h2 style={{ color: "white" }}>
            Methadone Equivalence: {this.state.methadoneEq}
          </h2>
        </div>
        <div
          style={{
            border: "1px solid dimgray",
            borderRadius: "10px",
            justifyContent: "center",
          }}
        >
          <table className="Form">
            <thead>
              <tr
                className="row"
                style={{
                  backgroundColor: "#4568C7",
                  color: "white",
                  justifyContent: "space-between",
                  marginLeft: "30px",
                }}
              >
                <th>Medication</th>
                <th>Dosage per Day</th>
                <th>Unit</th>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              </tr>
            </thead>
            <tbody style={{ justifyContent: "center" }}>
              {medicationArray.map((item, index) => (
                <tr
                  className="row"
                  key={item.display}
                  style={{
                    marginLeft: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <td>{item.display}</td>
                  <td>
                    <input
                      type="text"
                      value={item.dailyDose}
                      style={{
                        display: "flex",
                        height: "20px",
                      }}
                      onChange={(e) => {
                        this.handleChange(e, index);
                      }}
                    ></input>
                  </td>
                  <td>
                    <span>{item.unit}</span>
                  </td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => {
                        this.handleClick(index, "minus");
                      }}
                    >
                      -
                    </Button>
                    <Button
                      variant="dark"
                      onClick={() => {
                        this.handleClick(index, "plus");
                      }}
                    >
                      +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Converter;
