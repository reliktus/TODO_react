import styles from 'App.module.scss';
import DoneList from 'components/doneList/DoneList';
import ToDoList from 'components/toDoList/ToDoList';
import { observer, Provider } from 'mobx-react';
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

    render() {
        return (
            <Provider store={this.store}>
                <div className={styles.app}>
                    <input
                        placeholder="Write task name.."
                        value={this.store.newTask}
                        onChange={this.updateTaskName}
                        onKeyPress={this.addTaskByButton}
                    />
                    <button onClick={this.addTask}>Add task</button>
                    <ToDoList toDoList={this.store.toDoList} />
                    {this.store.doneList.length > 0 && <DoneList />}
                </div>
            </Provider>
        );
    }
}
