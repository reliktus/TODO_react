import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import listStore from 'stores/listStore';
import { IToDoListProps } from './IToDoListProps';
import styles from './ToDoList.module.scss';

@inject('store1')
@observer
export default class ToDoList extends React.Component<IToDoListProps, {}> {
    @computed get store1() {
        return this.props.store1 as listStore;
    }

    private GotTasksToDo(): boolean {
        return this.store1.toDoList.length > 0;
    }

    private removeTask = (index: number) => {
        this.store1.removeTask(index);
    };

    private markTaskDone = (index: number) => {
        this.store1.markTaskDone(index);
    };

    render() {
        const toDoList = this.store1.toDoList.map((item, index) => (
            <div key={index} className={styles.row}>
                <div>
                    [ {index + 1} ] {item}
                </div>
                <span className={styles.done} onClick={() => this.markTaskDone(index)}>
                    <button>V</button>
                </span>
                <span className={styles.remove}>
                    <button onClick={() => this.removeTask(index)}>X</button>
                </span>
            </div>
        ));
        const showToDoTask = (
            <div className={styles.tasks}>
                <div>You have got {this.store1.toDoList.length} tasks to do:</div>
                {toDoList}
            </div>
        );
        const noTaskMessage = <div className={styles.noTasks}>You have done all Your tasks. Have a nice day :)</div>;
        return <div className={styles.toDoList}>{this.GotTasksToDo() ? showToDoTask : noTaskMessage}</div>;
    }
}
