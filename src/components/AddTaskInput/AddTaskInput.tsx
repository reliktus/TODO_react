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
        }
    };

    private addTask = () => {
        this.store.addNewTask();
        this.store.clearTaskName();
    };

    private updateTaskNameInStore = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.store.updateNewTaskName(event.target.value);
    };
    render() {
        const AddTaskLabel = 'Add task';
        const AddTaskPlaceholder = 'Write task name..';
        return (
            <div>
                <input
                    placeholder={AddTaskPlaceholder}
                    value={this.store.newTask}
                    onChange={this.updateTaskNameInStore}
                    onKeyPress={this.addTaskByButton}
                />
                <button onClick={this.addTask}>{AddTaskLabel}</button>
            </div>
        );
    }
}
