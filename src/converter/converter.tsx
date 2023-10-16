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
    this.handleEntry = this.handleEntry.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  handleClick(index: number, label: any) {
    let selected = medicationArray[index];
    let newValue = selected.dailyDose;
    if (label === "minus") {
      if (selected.dailyDose >= selected.increment) newValue -= selected.increment;
    } else {
      newValue += selected.increment;
    }
    selected.dailyDose = newValue;
    this.calculateResult();
  }

  handleEntry(event: any, index: number) {
    event.target.value === "" || !Number(event.target.value)
      ? (medicationArray[index].dailyDose = 0)
      : (medicationArray[index].dailyDose = parseInt(event.target.value));
    this.calculateResult();
  }

  clearAll() {
    for (var i = 0; i < medicationArray.length; i++) {
      medicationArray[i].dailyDose = 0;
    }
    this.calculateResult();
  }

  calculateResult() {
    let newMorphineEq = 0;
    let newMethadoneEq = 0;
    for (var i = 0; i < medicationArray.length; i++) {
      var newEquivalence = medicationArray[i].dailyDose;
      medicationArray[i].display === "Methadone"
        ? newEquivalence = Math.pow(newEquivalence, 2)
        : newEquivalence *= medicationArray[i].toMorphine;
      newMorphineEq += newEquivalence;
      newMethadoneEq = (Math.sqrt(newMorphineEq * 4));
    }
    this.setState({ morphineEq: Math.round(newMorphineEq) });
    this.setState({ methadoneEq: Math.round(newMethadoneEq) });
  }

  render() {
    return (
      <div className="Converter">
        <div className="logo-container">
          <span>
            <img src={Logo} alt="logo" className="logo-wrapper"></img>
          </span>
          <h1 className="oc-title">Opioid Converter</h1>
        </div>
        <div className="mdisplay">
          <div>
            <h2 className="equivalence">
              Morphine Equivalence: {this.state.morphineEq} mg
            </h2>
            <h2 className="equivalence">
              Methadone Equivalence: {this.state.methadoneEq} mg
            </h2>
          </div>
          <Button
            variant="dark"
            className="clear-all"
            onClick={this.clearAll}><b><u>Clear All</u></b></Button>
        </div>
        <div>
          <table className="Tbl">
            <tr
              className="header-row"
            >
              <th className="tableheader">Medication</th>
              <th className="tableheader">Dosage per Day</th>
              <th className="tableheader">Increment Dose</th>
            </tr>
            {medicationArray.map((item, index) => (
              <tr
                className="row"
                key={item.display}
              >
                <td className="td">{item.display}</td>
                <td>
                  <input
                    className="dose-input"
                    type="text"
                    value={item.dailyDose}
                    onChange={(e) => {
                      this.handleEntry(e, index);
                    }}
                  ></input>
                </td>
                <td className="td">
                  <span>{item.unit}</span>
                </td>
                <td className="td">
                  {item.dailyDose < item.increment
                    ? <Button
                      disabled
                      variant="outline-dark"
                      onClick={() => {
                        this.handleClick(index, "minus");
                      }}
                    >

                      <b>-</b>
                    </Button>
                    :
                    <Button
                      variant="dark"
                      onClick={() => {
                        this.handleClick(index, "minus");
                      }}
                    >
                      <b>-</b>
                    </Button>
                  }
                  <Button
                    variant="dark"
                    onClick={() => {
                      this.handleClick(index, "plus");
                    }}
                  >
                    <b>+</b>
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
export default Converter;
