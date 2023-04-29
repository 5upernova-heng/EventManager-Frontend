import { useContext } from "react";
import { TimeContext } from "../App";

const RefreshTime = () => {
    const { sync, toggleSync } = useContext(TimeContext);
    return (
        <button
            className="btn btn-outline-dark"
            onClick={() => {
                sync ? {} : toggleSync();
            }}
            role="button"
        >
            <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
    );
};

export default RefreshTime;
