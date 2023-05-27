import React, { useContext, useState } from "react";
import SelectButtonGroup from "../forms/SelectButtonGroup";
import { EventContext } from "../../context/EventContextProvider";
import STYLE from "../../style";
import { toast } from "react-toastify";

export default function SearchBar() {
    const { searchLabels, toggleSearchLabels, searchEvent, setView } =
        useContext(EventContext);
    const [inputStr, setInput] = useState("");
    const renderButtons = () => {
        return STYLE.keywordLabel.map((label, index) => {
            return (
                <button
                    key={index}
                    type="button"
                    className={`btn btn-outline-secondary ${
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
        <>
            <div className="btn-group" role="group">
                {renderButtons()}
            </div>
            <div className="flex-grow-1">
                <input
                    className="p-2 form-control me-auto"
                    placeholder="搜索事件"
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                ></input>
            </div>
            <button
                className="btn btn-secondary"
                onClick={() => {
                    if (searchLabels.every((value) => !value)) {
                        toast("最少选择一个搜索标签哦~");
                    } else {
                        const keyWordList = inputStr.split(" ");
                        searchEvent(keyWordList);
                        setView(2);
                    }
                }}
            >
                搜索
            </button>
        </>
    );
}
