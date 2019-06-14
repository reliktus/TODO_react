import Constants from 'Constants';
import { observable } from 'mobx';

export default class listStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: string[] = [];
    @observable public newTask: string = '';
    private APP = new Constants();

    public loadItems() {
        if (localStorage.getItem(this.APP.listNames.toDoList)) {
            console.log('Store ', this.APP.listNames.toDoList, ' found.');
            this.toDoList = JSON.parse(localStorage.getItem(this.APP.listNames.toDoList)!);
            this.toDoList = JSON.parse(localStorage.getItem(this.APP.listNames.doneList)!);
        } else {
            localStorage.setItem(this.APP.listNames.toDoList, JSON.stringify(this.toDoList));
            localStorage.setItem(this.APP.listNames.doneList, JSON.stringify(this.doneList));
        }
    }

    public clearLocalStorage() {
        localStorage.removeItem(this.APP.listNames.toDoList);
        localStorage.removeItem(this.APP.listNames.doneList);
        this.toDoList.length = 0;
        this.doneList.length = 0;
        this.loadItems();
    }

    public addNewTask() {
        this.toDoList.push(this.newTask);
        localStorage.setItem(this.APP.listNames.toDoList, JSON.stringify(this.toDoList));
    }

    public updateNewTaskName(inputValue: string) {
        this.newTask = inputValue;
    }

    public clearTaskName() {
        this.newTask = '';
    }

    public removeTask = (taskIndex: number) => {
        this.toDoList.splice(taskIndex, 1);
        localStorage.setItem(this.APP.listNames.toDoList, JSON.stringify(this.toDoList));
    };

    public markTaskDone = (taskIndex: number) => {
        this.doneList.push(this.toDoList[taskIndex]);
        this.toDoList.splice(taskIndex, 1);
    };
}
