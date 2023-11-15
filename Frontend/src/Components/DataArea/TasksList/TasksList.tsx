import { useEffect, useState } from "react";
import TaskModel from "../../../Models/Task-Model";
import "./TasksList.css";
import dataService from "../../../Services/DataService";

function TasksList(): JSX.Element {

const[tasks,setTasks]=useState<TaskModel[]>([])

useEffect(()=>{
  dataService.getAllTasks()
  .then(tasks=>setTasks(tasks))
  .catch(err=>alert(err.message))

})
    return (
        <div className="TasksList">
            <table>
                <thead>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Customer</th>
                    <th>Employee</th>
                </thead>
                <tbody>
                    {tasks&&tasks.map(t=>
                    <tr key={t.taskId}>
                        <td>{t.item}</td>
                        <td>{t.status}</td>
                        <td>{t.date}</td>
                        <td>{t.priority}</td>
                        <td>{t.customerName}</td>
                        <td>{t.employeeName}</td>
                    </tr>)}
                </tbody>
            </table>
			
        </div>
    );
}

export default TasksList;
