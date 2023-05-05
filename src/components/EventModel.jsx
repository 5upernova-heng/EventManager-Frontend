const EventModel = ({ id, headerLabel, bodyComponent, footerComponent }) => {
    return (
        <div className="modal fade" tabIndex="-1" id={id} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{headerLabel}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{bodyComponent}</div>
                    <div className="modal-footer">{footerComponent}</div>
                </div>
            </div>
        </div>
    );
};

export default EventModel;
