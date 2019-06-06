import { observer } from 'mobx-react';
import React, { Component } from 'react';
import style from './DoneList.module.scss';

export default class DoneList extends Component {
    render() {
        return <div className={style.doneList}>Done list:</div>;
    }
}
