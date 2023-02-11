

export const Watches = ({
    id,
    name,
    handleDelete,
    hourDegrees,
    minuteDegrees,
    secondDegrees,
}) => {
    return (
        <div className="clock-container">
            <button className="delButton" id={id} onClick={handleDelete}>
                X
            </button>
            <h1 className="name">{name}</h1>
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
