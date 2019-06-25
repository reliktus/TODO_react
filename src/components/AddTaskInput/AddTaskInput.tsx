import { Button, TextField } from '@material-ui/core';
import Constants from 'Constants';
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
    private CONST = new Constants();

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
        return (
            <div>
                <TextField
                    label={this.CONST.AddTaskPlaceholder}
                    variant="outlined"
                    value={this.store.newTask}
                    onChange={this.updateTaskNameInStore}
                    onKeyPress={this.addTaskByButton}
                />
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={this.addTask}
                    disabled={!this.store.newTask}
                >
                    {this.CONST.AddTaskLabel}
                </Button>
            </div>
        );
    }
}
