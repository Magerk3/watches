import { Watches } from "./components/Watches";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const zones = require("./zones.json");

function App() {
    const [clocks, setClоcks] = useState([
        { name: "Greenwich", timezone: 0, id: uuidv4() },
    ]);
    const [newClock, setNewClock] = useState({});
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    useEffect(() => {
        if (clocks !== []) {
            const intervalId = setInterval(() => {
                const now = new Date();
                const offset = new Date().getTimezoneOffset();
                setHours(now.getHours() + offset / 60);
                setMinutes(now.getMinutes());
                setSeconds(now.getSeconds());
                if (clocks.length === 0) clearInterval(intervalId);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [clocks]);
    
    useEffect(() => {
        setNewClock({name: `clock ${clocks.length + 1}`, timezone: 0, id: ''})
    },[clocks])

    const getHourDegrees = (timezone) =>
        ((hours + Number(timezone)) / 12) * 360 + (minutes / 60) * 30;

    const getMinuteDegrees = () => (minutes / 60) * 360 + (seconds / 60) * 6;

    const getSecondDegrees = () => (seconds / 60) * 360;

    const handleChange = (e) => {
        setNewClock({
            ...newClock,
            [e.target.name]: e.target.value,
            id: uuidv4(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClоcks([...clocks, newClock]);
        document.getElementById("nameInput").value = "";
        document.getElementById("timezoneInput").value = "UTC+";
        setNewClock({});
    };

    const handleDelete = (e) => {
        setClоcks(clocks.filter((clock) => clock.id !== e.target.id));
    };

    return (
        <div className="App">
            <form>
                <input
                    id="nameInput"
                    name="name"
                    type="select"
                    onChange={handleChange}
                    value={newClock.name}
                    
                ></input>
                <select
                    id="timezoneInput"
                    name="timezone"
                    onChange={handleChange}
                    value={newClock.timezone}
                >   
                    <option value="">Select time zone</option>
                    {zones.map((zone) => (
                        <option value={zone.value}>{zone.name}</option>
                    ))}
                </select>

                <button onClick={handleSubmit}>Добавить</button>
            </form>
            <div className="clocks">
                {clocks.map((clock) => (
                    <Watches
                        id={clock.id}
                        name={clock.name}
                        handleDelete={handleDelete}
                        hourDegrees={getHourDegrees(clock.timezone)}
                        minuteDegrees={getMinuteDegrees()}
                        secondDegrees={getSecondDegrees()}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
