import { Watches } from "./components/Watches";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const zones = require("./zones.json");

function App() {
    const [clocks, setClоcks] = useState([
        { name: "Greenwich", timezone: 0, id: uuidv4() },
    ]);
    const [newClock, setNewClock] = useState({
        name: `clock ${clocks.length}`,
        timezone: Math.floor(Math.random() * 27) - 12,
        id: uuidv4(),
    });
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
        setNewClock({
            name: `clock ${clocks.length + 1}`,
            timezone: Math.floor(Math.random() * 27) - 12,
            id: uuidv4(),
        });
    }, [clocks])

    const getHourDegrees = (timezone) =>
        ((hours + Number(timezone)) / 12) * 360 + (minutes / 60) * 30;

    const getMinuteDegrees = () => (minutes / 60) * 360 + (seconds / 60) * 6;

    const getSecondDegrees = () => (seconds / 60) * 360;

    const getHours = (timezone) => {
        let newHours = Number(hours) + Number(timezone);
        if (newHours === 0) return 0;
        else if (newHours < 0) return newHours + 24;
        else if (newHours >= 24) return newHours - 24;
        else return newHours;
    };

    const handleChange = (e) => {
        setNewClock({
            ...newClock,
            [e.target.name]: e.target.value,
            id: uuidv4(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClоcks([...clocks, newClock]
        );
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
                    {zones.map((zone) => (
                        <option value={zone.value}>{zone.name}</option>
                    ))}
                </select>

                <button id="submit" onClick={handleSubmit}>
                    Добавить
                </button>
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
                        hours={getHours(clock.timezone)}
                        minutes={minutes}
                        seconds={seconds}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
