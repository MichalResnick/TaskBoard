import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";

import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import TasksList from "../../DataArea/TasksList/TasksList";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/tasks" element={<TasksList />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
