import { observable } from 'mobx';

export default class listStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: string[] = [];
    @observable public newTask: string = '';

    public loadItems() {
        if (localStorage.getItem('toDoList')) {
            this.createLocalStorageLists();
        } else {
            this.updateListsInLocalStorage();
        }
    }

    private createLocalStorageLists() {
        console.log('there is toDoStore');
        this.toDoList = JSON.parse(localStorage.getItem('toDoList')!);
        this.doneList = JSON.parse(localStorage.getItem('doneList')!);
    }

    private updateListsInLocalStorage() {
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    }

    public clearLocalStorageAndReload() {
        localStorage.removeItem('toDoList');
        localStorage.removeItem('doneList');
        this.toDoList.length = 0;
        this.doneList.length = 0;
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
        this.doneList.push(this.toDoList[taskIndex]);
        this.toDoList.splice(taskIndex, 1);
        this.updateListsInLocalStorage();
    };
}
