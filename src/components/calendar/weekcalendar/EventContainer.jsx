import EventCell from "./EventCell";

const EventContainer = ({ events, handleEventClick }) => {
    return (
        <>
            {events.map((event, index) => (
                <EventCell
                    key={index}
                    event={event}
                    handleClick={handleEventClick}
                />
            ))}
        </>
    );
};

export default EventContainer;
