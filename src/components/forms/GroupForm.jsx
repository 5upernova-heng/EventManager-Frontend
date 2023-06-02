import React, { useContext } from "react";
import { GroupContext } from "../../context/GroupContextProvider";
import MemberSelector from "./MemberSelector";

export default function GroupForm({ disableInput }) {
    const { joinClass, quitClass, submitGroup, changeSubmitGroup } =
        useContext(GroupContext);
    const { name, members } = submitGroup;
    const changeId = (name) => {
        changeSubmitGroup({ name });
    };

    const toggleMember = async (id) => {
        console.log(members, id);
        if (members.includes(id)) {
            const result = await quitClass(id);
            if (result === 0) {
                const index = members.indexOf(id);
                members.splice(index, 1);
            }
        } else {
            const result = await joinClass(id, submitGroup.name);
            if (result === 0) {
                members.push(id);
            }
        }
        changeSubmitGroup({ members });
    };

    return (
        <div>
            <label className="fw-bold  mb-1" htmlFor={name}>
                组织名
            </label>
            <div className="input-group flex-nowrap">
                <input
                    id={name}
                    value={name}
                    name={name}
                    type="text"
                    className="form-control"
                    disabled={disableInput}
                    onChange={(e) => {
                        changeId(e.target.value);
                    }}
                />
            </div>
            <p className="mt-3 mb-1 fw-bold">组织成员</p>
            <MemberSelector
                members={members}
                toggleMember={async (id) => toggleMember(id)}
            />
        </div>
    );
}

GroupForm.propType = {};
