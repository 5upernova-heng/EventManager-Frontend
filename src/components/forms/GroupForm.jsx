import React, { useContext } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { GroupContext } from "../../context/GroupContextProvider";
import MemberSelector from "./MemberSelector";

export default function GroupForm() {
    const { submitGroup, changeSubmitGroup } = useContext(GroupContext);
    const { name, members } = submitGroup;
    const changeId = (name) => {
        changeSubmitGroup({ name });
    };

    const toggleMember = (id) => {
        if (members.includes(id)) {
            const index = members.indexOf(id);
            members.splice(index, 1);
        } else {
            members.push(id);
        }
    };

    return (
        <div>
            <Input
                label="组织名"
                name="groupNameInput"
                type={"text"}
                value={name}
                onChange={(e) => {
                    changeId(e.target.value);
                }}
            />
            <MemberSelector members={members} toggleMember={toggleMember} />
        </div>
    );
}

GroupForm.propType = {};
