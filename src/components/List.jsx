import React, { useState } from "react";
import PropTypes from "prop-types";

function List({ title, data, renderMethod, addModalId }) {
    const fontStyle = "fw-bold fs-5 mb-0";

    /**Prevent index out of bound */
    const renderData = () => {
        if (data === undefined || data.length === 0)
            return (
                <div className="border rounded rounded-4 p-2 ">
                    <p
                        className={`${fontStyle} text-center`}
                    >{`暂无${title}`}</p>
                </div>
            );
        return data.map(renderMethod);
    };
    return (
        <>
            <p className="text-center fw-bold fs-4">{`${title}列表`}</p>
            <div className="border rounded rounded-4">{renderData()}</div>
            <div className="mt-3 d-flex justify-content-end align-items-center">
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${addModalId}`}
                >
                    {`添加${title}`}
                </button>
            </div>
        </>
    );
}

List.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    renderMethod: PropTypes.func.isRequired,
    addModalId: PropTypes.string,
};

export default List;
