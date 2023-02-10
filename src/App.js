import { Watches } from "./components/Watches";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const zones = require("./zones.json");

function App() {
    const [clocks, setClacks] = useState([
        { name: "Grinvich", timezone: 0, id: uuidv4() },
    ]);
    const [newClock, setNewClock] = useState({name: "Moskow", timezone: 3, id: uuidv4()});
    //console.log(zones)

    const handleChange = (e) => {
        setNewClock({
            ...newClock,
            [e.target.name]: e.target.value,
            id: uuidv4(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClacks([...clocks, newClock]);
        document.getElementById("nameInput").value = "";
        document.getElementById("timezoneInput").value = "UTC+0";
        setNewClock({})
    };

    const handleDelete = (e) => {
        setClacks(clocks.filter((clock) => clock.id !== e.target.id));
    };

    return (
        <div className="App">
            <form>
                <input
                    id="nameInput"
                    name="name"
                    type="select"
                    onChange={handleChange}
                    defaultValue={'Moskow'}
                ></input>
                <select id="timezoneInput" name="timezone" onChange={handleChange}>
                    {zones.map((zone) => (
                     zone.value === '+3' ? <option  value={zone.value} selected>{zone.name}</option>
                     : <option  value={zone.value}>{zone.name}</option>
                    ))}
                </select>

                <button onClick={handleSubmit}>Добавить</button>
            </form>
            <div className="clocks">
                {clocks.map((clock) => (
                    <Watches
                        timezone={clock.timezone}
                        id={clock.id}
                        name={clock.name}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
