import EventCell from "./EventCell";

const EventContainer = ({ events }) => {
    return (
        <>
            {events.map((event, index) => (
                <EventCell key={index} event={event} />
            ))}
        </>
    );
};

export default EventContainer;
