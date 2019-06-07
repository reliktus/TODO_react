import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import listStore from 'stores/listStore';
import { IAddTaskInput } from './IAddTaskInput';

@inject('store1')
@observer
export default class AddTaskInput extends Component<IAddTaskInput> {
    @computed get store() {
        return this.props.store1 as listStore;
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

    private updateTaskNameInStore = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.store.updateNewTaskName(event.target.value);
    };
    render() {
        return (
            <div>
                <input
                    placeholder="Write task name.."
                    value={this.store.newTask}
                    onChange={this.updateTaskNameInStore}
                    onKeyPress={this.addTaskByButton}
                />
                <button onClick={this.addTask}>Add task</button>
            </div>
        );
    }
}
