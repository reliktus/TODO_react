import { computed } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { IToDoListProps } from "./IToDoListProps";

@observer
export default class ToDoList extends React.Component<IToDoListProps> {
  @computed get list() {
    return this.props.toDoList;
  }
  render() {
    return <div>{this.list}</div>;
  }
}
