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

async function handleStatusChange(taskId: number, newStatus: string){
    try {
        console.log("id"+taskId)
      console.log(newStatus)
      await dataService.updateTaskStatus(taskId, newStatus);
      console.log("done")
      // Fetch and update tasks after the status change
      const updatedTasks = await dataService.getAllTasks();
      setTasks(updatedTasks);
    } catch (err:any) {
      console.error(err.message);
    }
  };

  async function handlePriorityChange (taskId: number, newPriority: string) {
    try {
      await dataService.updateTaskPriority(taskId, newPriority);
      // Fetch and update tasks after the priority change
      const updatedTasks = await dataService.getAllTasks();
      setTasks(updatedTasks);
    } catch (err:any) {
      console.error(err.message);
    }
  };
    return (
        <div className="TasksList">
            <table>
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Customer</th>
                    <th>Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks&&tasks.map(t=>
                    <tr key={t.taskId}>
                        <td>{t.item}</td>
                        <td>
                        <select
                         defaultValue={t.status}
                         onChange={(e) => handleStatusChange(t.taskId, e.target.value)}
                         >
                        <option value="pending">Pending</option>
                        <option value="At Work">At Work</option>
                        <option value="Almost Done">Almost Done</option>
                        <option value="done">Done</option>
                       </select>
                       </td>
                        <td>{t.date}</td>
                        <td>
                        <select
                        value={t.priority}
                        onChange={(e) => handlePriorityChange(t.taskId, e.target.value)}
                        >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        </select>
                        </td>
                        <td>{t.customerName}</td>
                        <td>{t.employeeName}</td>
                    </tr>)}
                </tbody>
            </table>
			
        </div>
    );
}

export default TasksList;
