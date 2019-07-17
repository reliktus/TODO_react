import Constants from 'common/Constants';
import { observable } from 'mobx';
import { doneItem } from './listStore';

export interface doneItem {
    name: string;
    time: string;
}

export default class listStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: doneItem[] = [];
    @observable public newTask: string = '';
    private APP = new Constants();

    public loadItems() {
        if (localStorage.getItem(this.APP.listNames.toDoList)) {
            this.getDataFromLocalStorage();
        } else {
            this.updateListsInLocalStorage();
        }
    }
    private getDataFromLocalStorage() {
        this.toDoList = JSON.parse(localStorage.getItem(this.APP.listNames.toDoList)!);
        this.doneList = JSON.parse(localStorage.getItem(this.APP.listNames.doneList)!);
    }

    private updateListsInLocalStorage() {
        localStorage.setItem(this.APP.listNames.toDoList, JSON.stringify(this.toDoList));
        localStorage.setItem(this.APP.listNames.doneList, JSON.stringify(this.doneList));
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
        this.updateListsInLocalStorage();
    }

    public updateNewTaskName(inputValue: string) {
        this.newTask = inputValue;
    }

    public clearTaskName() {
        this.newTask = '';
    }

    public removeTask = (taskIndex: number) => {
        this.toDoList.splice(taskIndex, 1);
        this.updateListsInLocalStorage();
    };

    public markTaskDone = (taskIndex: number) => {
        let doneTask: doneItem = { name: this.toDoList[taskIndex], time: 'new Date()' };
        console.log(doneTask.time);
        // this.doneList.push(this.toDoList[taskIndex]);
        this.doneList.push(doneTask);
        this.toDoList.splice(taskIndex, 1);
        this.updateListsInLocalStorage();
    };
}
