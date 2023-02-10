import { useEffect } from "react";

export const Watches = ({ timezone, id, name, handleDelete }) => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            // console.log(now)
            const offset = new Date().getTimezoneOffset();
            //console.log(offset);

            const hours = now.getHours() + Number(timezone) + offset / 60;
            // console.log(hours)
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
            const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
            const secondDegrees = (seconds / 60) * 360;

            document.getElementById(
                `${id}hour`
            ).style.transform = `rotate(${hourDegrees}deg)`;
            document.getElementById(
                `${id}min`
            ).style.transform = `rotate(${minuteDegrees}deg)`;
            document.getElementById(
                `${id}sec`
            ).style.transform = `rotate(${secondDegrees}deg)`;
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock-container">
            <button className="delButton" id={id} onClick={handleDelete}>X</button>
            <h1 className="name">{name}</h1>
            <div className="clock" id={id + "clock"}>
                
                <div className="hour-hand" id={id + "hour"}></div>
                <div className="minute-hand" id={id + "min"}></div>
                <div className="second-hand" id={id + "sec"}></div>
            </div>
        </div>
    );
};
