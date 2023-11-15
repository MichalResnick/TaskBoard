import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">

			<NavLink to="/tasks">Tasks</NavLink>
            <span> | </span>
			<NavLink to="/insert">Insert</NavLink>
        </div>
    );
}

export default Menu;
