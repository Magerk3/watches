export const Watches = ({
    id,
    name,
    handleDelete,
    hourDegrees,
    minuteDegrees,
    secondDegrees,
    hours,
    minutes,
    seconds,
}) => {
    return (
        <div className="clock-container">
            <button className="delButton" id={id} onClick={handleDelete}>
                X
            </button>
            <h1 className="name">{name}</h1>
            <h2>
                {hours < 10 ? "0" + hours : hours}:
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
            </h2>
            <div className="clock" id={id + "clock"}>
                <div
                    className="hour-hand"
                    style={{ transform: `rotate(${hourDegrees}deg)` }}
                ></div>
                <div
                    className="minute-hand"
                    style={{ transform: `rotate(${minuteDegrees}deg)` }}
                ></div>
                <div
                    className="second-hand"
                    style={{ transform: `rotate(${secondDegrees}deg)` }}
                ></div>
            </div>
        </div>
    );
};
