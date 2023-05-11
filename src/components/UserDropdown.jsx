import React, { useContext } from "react";
import { AuthContext } from "../Context";

function UserDropdown() {
    const { auth, setAuth } = useContext(AuthContext);
    const authLabel = ["Normal", "Admin", "Root"];
    const renderNavItems = () => {
        return authLabel.map((label, index) => (
            <li key={index}>
                <a className="dropdown-item" onClick={() => setAuth(index)}>
                    {label}
                </a>
            </li>
        ));
    };
    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-dark"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {authLabel[auth]}
            </button>
            <ul className="dropdown-menu">{renderNavItems()}</ul>
        </div>
    );
}

export default UserDropdown;
