import axios from "axios";
import TaskModel from "../Models/Task-Model";
import appConfig from "../Utils/Config";

class DataService {

   public async  getAllTasks():Promise<TaskModel[]>{

    const response=await axios.get<TaskModel[]>(appConfig.TasksUrl)
    const tasks=response.data
    return tasks

   }


}

const dataService = new DataService();

export default dataService;