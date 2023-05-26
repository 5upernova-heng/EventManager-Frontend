import React from "react";
import Input from "./Input";
import PropTypes from "prop-types";

export default function OrgForm({ org, changeSubmit }) {
    // mode: add(0), modify(1)
    const changeAuth = (auth) => {
        changeSubmit({ authLevel: auth });
    };

    const changeId = (id) => {
        changeSubmit({ id });
    };

    return (
        <div>
            <Input
                label="组织名"
                type={"text"}
                value={org.id}
                onChange={(e) => {
                    console.log(e.target.value);
                    changeId(e.target.value);
                    console.log(org);
                }}
            />
            <div className="d-flex align-items-center justify-content-end mt-3">
                <button className="btn btn-sm btn-primary mx-2">
                    提交修改
                </button>
            </div>
        </div>
    );
}

OrgForm.propType = {
    mode: PropTypes.number.isRequired,
};
