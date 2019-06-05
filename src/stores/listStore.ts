import { observable } from 'mobx';

export default class toStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: string[] = [];

    public loadItems() {
        const newItems = ['task1', 'task2', 'task3'];
        this.toDoList = [...newItems];
    }

    public addTask(task: string) {
        this.toDoList.push(task);
    }
}
