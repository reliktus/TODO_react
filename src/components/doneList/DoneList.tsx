import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import listStore from 'stores/listStore';
import style from './DoneList.module.scss';
import { IDoneList } from './IDoneList';

@inject('store1')
@observer
export default class DoneList extends React.Component<IDoneList, {}> {
    @computed get store() {
        return this.props.store1 as listStore;
    }

    render() {
        const DoneListLabel = 'Done list:';
        const DoneListItems = (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task name:</TableCell>
                            <TableCell>Finish date:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.store.doneList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );

        return (
            <div className={style.doneList}>
                {DoneListLabel}
                {DoneListItems}
            </div>
        );
    }
}
