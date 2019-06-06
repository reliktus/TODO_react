import styles from 'App.module.scss';
import ToDoList from 'components/toDoList/ToDoList';
import { observer } from 'mobx-react';
import * as React from 'react';
import listStore from 'stores/listStore';

@observer
export default class App extends React.Component<{}, { taskName: string }> {
    private store: listStore;

    constructor(props: any) {
        super(props);
        this.store = new listStore();
    }

    componentDidMount() {
        this.store.loadItems();
    }

    render() {
        return (
            <div className={styles.app}>
                <div>
                    <input
                        placeholder="Write task name.."
                        value={this.store.newTask}
                        onChange={this.updateTaskName}
                        onKeyPress={this.addTaskByButton}
                    />
                    <button onClick={this.addTask}>Add task</button>
                </div>
                <ToDoList toDoList={this.store.toDoList} />
            </div>
        );
    }

    private addTaskByButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            this.addTask();
            this.store.clearTaskName();
        }
    };

    private addTask = () => {
        this.store.addTask();
    };

    private updateTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.store.updateNewTaskName(event.target.value);
    };
}
