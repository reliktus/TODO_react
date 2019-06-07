import { observable } from 'mobx';

export default class listStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: string[] = [];
    @observable public newTask: string = '';

    public loadItems() {
        if (localStorage.getItem('toDoList')) {
            console.log('there is toDoStore');
            this.toDoList = JSON.parse(localStorage.getItem('toDoList')!);
        } else {
            localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
            localStorage.setItem('doneList', JSON.stringify(this.doneList));
        }
    }

    public clearLocalStorage() {
        localStorage.removeItem('toDoList');
        this.toDoList.length = 0;
        this.loadItems();
    }

    public addNewTask() {
        this.toDoList.push(this.newTask);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
    }

    public updateNewTaskName(inputValue: string) {
        this.newTask = inputValue;
    }

    public clearTaskName() {
        this.newTask = '';
    }

    public removeTask = (taskIndex: number) => {
        this.toDoList.splice(taskIndex, 1);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
    };

    public markTaskDone = (taskIndex: number) => {
        this.doneList.push(this.toDoList[taskIndex]);
        this.toDoList.splice(taskIndex, 1);
    };
}
