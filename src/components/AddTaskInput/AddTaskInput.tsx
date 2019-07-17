import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Constants from 'common/Constants';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import listStore from 'stores/listStore';
import styles from './AddTaskInput.module.scss';
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

    private clearTaskName = () => {
        this.store.clearTaskName();
    };

    render() {
        return (
            <div className={styles.column}>
                <TextField
                    autoFocus={true}
                    margin="normal"
                    label={this.CONST.AddTaskPlaceholder}
                    variant="outlined"
                    value={this.store.newTask}
                    onChange={this.updateTaskNameInStore}
                    onKeyPress={this.addTaskByButton}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {this.store.newTask && (
                                    <IconButton edge="end" aria-label="Clear task name" onClick={this.clearTaskName}>
                                        X
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }}
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
