import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { IToDoListProps } from './IToDoListProps';
import styles from './ToDoList.module.scss';

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
                {this.list.map((item, index) => {
                    return (
                        <div key={index} className={styles.row}>
                            <div>
                                [ {index + 1} ] {item}
                            </div>
                            <button>V</button>
                            <button onClick={() => this.removeTask(item)}>X</button>
                        </div>
                    );
                })}
            </div>
        );
    }

    private removeTask = (task: string) => {
        console.log(task);
    };
}
