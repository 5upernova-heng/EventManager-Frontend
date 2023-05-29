import React, { useContext } from "react";
import STYLE from "../../../style";
import { SearchContext } from "../../../context/SearchContextProvider";
import SelectButtonGroup from "../../forms/SelectButtonGroup";

export default function SearchModeButtonGroup() {
    const { searchMode, setSearchMode } = useContext(SearchContext);
    return (
        <SelectButtonGroup
            buttonsInfo={STYLE.parseButtonInfo(
                STYLE.searchModeStyle,
                searchMode
            )}
            changeSelect={setSearchMode}
        />
    );
}
