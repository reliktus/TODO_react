import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
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
        const tableToDoList = (
            <Paper>
                <Table size="small">
                    <TableHead>
                        <div className={styles.toDoList__label}>TO DO LIST</div>
                        <TableRow>
                            <TableCell>Number:</TableCell>
                            <TableCell>Task name:</TableCell>
                            <TableCell>Mark done</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.store1.toDoList.map((item, index) => (
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item}</TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => this.markTaskDone(index)}>
                                    V
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => this.removeTask(index)}>
                                    X
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableBody />
                </Table>
            </Paper>
        );
        const showToDoTask = <div className={styles.tasks}>{tableToDoList}</div>;
        const noTaskMessage = <div className={styles.noTasks}>You have done all Your tasks. Have a nice day :)</div>;
        return <div className={styles.toDoList}>{this.GotTasksToDo() ? showToDoTask : noTaskMessage}</div>;
    }
}
