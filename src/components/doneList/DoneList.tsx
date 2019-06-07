import { inject, observer } from 'mobx-react';
import React from 'react';
import style from './DoneList.module.scss';
import { IDoneList } from './IDoneList';

@inject('store1')
@observer
export default class DoneList extends React.Component<IDoneList, {}> {
    render() {
        const { store1 } = this.props;
        if (!store1) return null;
        const list = store1.toDoList;
        return <div className={style.doneList}>Done list:{list}</div>;
    }
}
