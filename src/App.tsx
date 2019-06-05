import { observer } from 'mobx-react';
import * as React from 'react';
import styles from './App.module.scss';
import ToDoList from './components/toDoList/ToDoList';
import listStore from './stores/listStore';

@observer
export default class App extends React.Component<{}, { taskName: string }> {
    private store: listStore;

    constructor(props: any) {
        super(props);
        this.store = new listStore();
        this.state = {
            taskName: ''
        };
    }

    componentDidMount() {
        this.firstInit();
    }

    private firstInit() {
        this.store.loadItems();
    }

    render() {
        return (
            <div className={styles.app}>
                <div className={styles.container + ' ' + styles.column}>
                    <div>
                        <input
                            placeholder="Write task name.."
                            value={this.state.taskName}
                            onChange={this.updateTaskName}
                        />
                        <button onClick={this.addTask}>Add task</button>
                    </div>
                    <ToDoList toDoList={this.store.toDoList} />
                </div>
            </div>
        );
    }

    private addTask = () => {
        console.log('addtask:');
        this.store.addTask(this.state.taskName);
    };

    private updateTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ taskName: event.target.value });
    };
}
