import React from "react";
import PropTypes from "prop-types";
import STYLE from "../../style";

function MessageCard({ message, deleteHandler }) {
    const { title, type: category, info } = message;
    const renderRelatedEvent = () => {
        return info.map((event) => (
            <p className="fs-6 mb-0">
                {`[${STYLE.getCategoryLabel(event.category)}] ${event.title}`}
            </p>
        ));
    };
    const messageLabel = STYLE.getMessageLabel(category);
    return (
        <div className="d-flex justify-content-between align-items-center border m-2">
            <div className="d-flex">
                <div
                    className={`ms-2 me-3 my-1 p-1 bg-${STYLE.getCategoryColor(
                        category
                    )} rounded`}
                ></div>
                <div className="d-flex flex-column justify-content-between pe-1">
                    <p className="fw-bold fs-5 mb-1">{`[${messageLabel}] ${title}`}</p>
                    <p className="fs-6 fw-bold mb-0">相关事件：</p>
                    {renderRelatedEvent()}
                </div>
            </div>
            <button
                className="btn-close me-2"
                type="button"
                onClick={deleteHandler}
            ></button>
        </div>
    );
}

MessageCard.propTypes = {
    message: PropTypes.object.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default MessageCard;