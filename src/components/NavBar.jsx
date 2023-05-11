import Time from "./Time";
import { useState } from "react";
import { Link } from "react-router-dom";
import RefreshTime from "./forms/RefreshTime";
import UserDropdown from "./UserDropdown";

function renderNavItems(routes) {
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const renderLinkClass = (route) => {
        return route.path === currentPath ||
            (route.path === "/calendar" && currentPath === "/")
            ? "nav-link active"
            : "nav-link";
    };
    return routes.map((route) => {
        if (route.showOnTab) {
            return (
                <li className="nav-item px-1 align-self-end" key={route.path}>
                    <Link
                        className={renderLinkClass(route)}
                        onClick={() => {
                            setCurrentPath(route.path);
                        }}
                        to={route.path}
                    >
                        <p className="mb-0 fs-5">{route.label}</p>
                    </Link>
                </li>
            );
        }
    });
}

function NavBar({ routes }) {
    return (
        <>
            <div className="d-flex px-2">
                <ul className="nav nav-tabs flex-grow-1">
                    <Link
                        className="navbar-brand d-flex align-items-center p-2"
                        to="/"
                    >
                        <img
                            src="/src/assets/bupt_logo.svg"
                            alt="Logo"
                            width="35"
                            height="35"
                            className="d-inline-block"
                        />
                        <p className="d-inline-block fw-bold fs-4 mx-1 my-0">
                            日程管理系统
                        </p>
                    </Link>
                    {renderNavItems(routes)}
                </ul>
                <div className="d-flex justify-content-center align-items-center border-bottom pe-2">
                    <Time />
                    <div className="px-1"></div>
                    <RefreshTime />
                    <div className="px-1"></div>
                    <UserDropdown />
                </div>
            </div>
        </>
    );
}

export default NavBar;
