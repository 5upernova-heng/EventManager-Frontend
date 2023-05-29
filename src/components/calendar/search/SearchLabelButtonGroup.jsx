import React, { useContext } from "react";
import STYLE from "../../../style";
import { SearchContext } from "../../../context/SearchContextProvider";

export default function SearchLabelButtonGroup() {
    const { searchLabels, toggleSearchLabels } = useContext(SearchContext);
    const renderButtons = () => {
        return STYLE.keywordLabel.map((label, index) => {
            return (
                <button
                    key={index}
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${
                        searchLabels[index] ? "active" : ""
                    }`}
                    onClick={() => toggleSearchLabels(index)}
                >
                    {label}
                </button>
            );
        });
    };
    return (
        <div className="btn-group" role="group">
            {renderButtons()}
        </div>
    );
}
