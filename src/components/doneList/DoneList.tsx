import { observer } from 'mobx-react';
import React from 'react';
import style from './DoneList.module.scss';

@observer
export default class DoneList extends React.Component<{}, {}> {
    render() {
        return <div className={style.doneList}>Done list:</div>;
    }
}
