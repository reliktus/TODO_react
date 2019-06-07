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
        const DoneListItems = this.store.doneList.map((item, index) => <div key={index}>{item}</div>);

        return (
            <div className={style.doneList}>
                {DoneListLabel}
                {DoneListItems}
            </div>
        );
    }
}
