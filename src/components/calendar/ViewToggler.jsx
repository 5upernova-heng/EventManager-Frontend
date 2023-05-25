import React, { useContext } from "react";
import SelectButtonGroup from "../forms/SelectButtonGroup";
import STYLE from "../../style";
import { EventContext } from "../../context/EventContextProvider";

function ViewToggler() {
    const { view, setView } = useContext(EventContext);
    return (
        <SelectButtonGroup
            buttonsInfo={STYLE.parseButtonInfo(STYLE.viewStyle, view)}
            changeSelect={setView}
        />
    );
}

export default ViewToggler;
