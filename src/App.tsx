import styles from 'App.module.scss';
import DoneList from 'components/doneList/DoneList';
import ToDoList from 'components/toDoList/ToDoList';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import listStore from 'stores/listStore';

@observer
export default class App extends React.Component<{}, { taskName: string }> {
    private listStore: listStore;

    constructor(props: any) {
        super(props);
        this.listStore = new listStore();
    }

    componentDidMount() {
        this.listStore.loadItems();
    }

    private addTaskByButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            this.addTask();
            this.listStore.clearTaskName();
        }
    };

    private addTask = () => {
        this.listStore.addTask();
    };

    private updateTaskNameInStore = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.listStore.updateNewTaskName(event.target.value);
    };

    render() {
        const stores = { store1: this.listStore };
        return (
            <Provider {...stores}>
                <div className={styles.app}>
                    <input
                        placeholder="Write task name.."
                        value={this.listStore.newTask}
                        onChange={this.updateTaskNameInStore}
                        onKeyPress={this.addTaskByButton}
                    />
                    <button onClick={this.addTask}>Add task</button>
                    <ToDoList />
                    {this.listStore.doneList.length > 0 && <DoneList />}
                </div>
            </Provider>
        );
    }
}
