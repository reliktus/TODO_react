import { observable } from 'mobx';

export default class listStore {
    @observable public toDoList: string[] = [];
    @observable public doneList: string[] = [];
    @observable public newTask: string = '';

    public loadItems() {
        const newItems = ['task1', 'task2', 'task3'];
        this.toDoList = [...newItems];
    }

    public addTask() {
        this.toDoList.push(this.newTask);
    }

    public updateNewTaskName(inputValue: string) {
        this.newTask = inputValue;
    }

    public removeTask(taskIndex: number) {
        console.log('remove task index in store', taskIndex);
        this.toDoList.splice(taskIndex, 1);
    }
}
