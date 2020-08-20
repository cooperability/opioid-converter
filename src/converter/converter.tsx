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
      butrans: medicationArray[2].dailyDose,
      codeine: medicationArray[3].dailyDose,
      duragesic: medicationArray[4].dailyDose,
      hydrocodone: medicationArray[5].dailyDose,
      hydromorphone: medicationArray[6].dailyDose,
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  handleClick(index: number, label: any) {
    let medName = `${medicationArray[index].display}`;
    medicationArray.forEach((element) => {
      if (medName === element.display) {
        label === "minus"
          ? (element.dailyDose -= element.increment)
          : (element.dailyDose += element.increment);
      }
    });
    this.forceUpdate();
    this.calculateResult();
  }

  handleChange(event: any, index: number) {
    medicationArray[index].dailyDose = event.target.value;
    this.forceUpdate();
    this.calculateResult();
  }

  calculateResult() {
    let newMorphineEq = 0;
    for (var i = 0; i < 14; i++) {
      var newEquivalence = medicationArray[i].dailyDose;
      if (medicationArray[i].display === "Methadone") {
        newEquivalence = Math.pow(newEquivalence, 2);
      }
      newEquivalence *= medicationArray[i].toMorphine;
      newMorphineEq += newEquivalence;
    }
    this.setState({ morphineEq: Math.round(newMorphineEq) });
  }

  render() {
    return (
      <div
        className="Converter"
        style={{
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h2>
          <span>
            <img src={Logo}></img>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Opioid Converter
        </h2>
        <div className="main display" style={{ backgroundColor: "maroon" }}>
          <h2 style={{ color: "white" }}>
            Morphine Equivalence: {this.state.morphineEq}
          </h2>
          <h2 style={{ color: "white" }}>
            Methadone Equivalence: {this.state.methadoneEq}
          </h2>
        </div>
        <div style={{ border: "1px solid maroon" }}>
          <table>
            <thead>
              <tr style={{ justifyContent: "space-between" }}>
                <th>
                  Medication &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dosage per
                  Day&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unit
                </th>
              </tr>
            </thead>
            <tbody style={{ justifyContent: "space-between" }}>
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
                        width: "100%",
                        justifyContent: "left",
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
