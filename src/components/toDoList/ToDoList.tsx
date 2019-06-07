import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { IToDoListProps } from './IToDoListProps';
import styles from './ToDoList.module.scss';

@inject('store')
@observer
export default class ToDoList extends React.Component<IToDoListProps, {}> {
    @computed get list() {
        return this.props.toDoList;
    }

    render() {
        return (
            <div className={styles.toDoList}>
                {this.GotTasksToDo() ? this.showToDoTask() : this.showNoTaskMessage()}
            </div>
        );
    }

    private GotTasksToDo(): boolean {
        return this.list.length > 0;
    }

    private showNoTaskMessage() {
        return <div className={styles.noTasks}>You have done all Your tasks. Have a nice day :)</div>;
    }

    private showToDoTask() {
        return (
            <div className={styles.tasks}>
                <div>You have got {this.list.length} tasks to do:</div>
                {/* {this.getSnapshotBeforeUpdate.} */}
                {this.list.map((item, index) => (
                    <div key={index} className={styles.row}>
                        <div>
                            [ {index + 1} ] {item}
                        </div>
                        <span className={styles.done}>
                            <button>V</button>
                        </span>
                        <span className={styles.remove}>
                            <button onClick={() => this.removeTask(index)}>X</button>
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    private removeTask = (index: number) => {
        // this.props.store.removeTask(index);
    };
}
