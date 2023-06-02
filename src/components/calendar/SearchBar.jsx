import React, { useContext, useState } from "react";
import { EventContext } from "../../context/EventContextProvider";
import { SearchContext } from "../../context/SearchContextProvider";
import { toast } from "react-toastify";

export default function SearchBar() {
    const { searchLabels, searchEvent } = useContext(SearchContext);
    const { setView } = useContext(EventContext);
    const [inputStr, setInput] = useState("");
    return (
        <>
            <div className="flex-grow-1">
                <input
                    className="p-2 form-control me-auto"
                    placeholder="搜索事件"
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onFocus={() => {
                        setView(2);
                    }}
                ></input>
            </div>
            <button
                className="btn btn-secondary"
                onClick={() => {
                    if (searchLabels.every((value) => !value)) {
                        toast("最少选择一个搜索标签哦~");
                    } else {
                        const keyWordList =
                            inputStr === "" ? [] : inputStr.split(" ");
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
