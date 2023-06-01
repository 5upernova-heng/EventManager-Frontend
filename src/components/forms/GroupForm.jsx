import React, { useContext } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { GroupContext } from "../../context/GroupContextProvider";

export default function GroupForm() {
    const { submitGroup, changeSubmitGroup } = useContext(GroupContext);
    const changeId = (name) => {
        changeSubmitGroup({ name });
    };
    return (
        <div>
            <Input
                label="组织名"
                name="groupNameInput"
                type={"text"}
                value={submitGroup.name}
                onChange={(e) => {
                    changeId(e.target.value);
                }}
            />
        </div>
    );
}

GroupForm.propType = {};
