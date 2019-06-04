import { observer } from "mobx-react";
import * as React from "react";
import listStore from "./stores/listStore";

@observer
export default class App extends React.Component {
  private store: listStore;

  constructor(props: any) {
    super(props);
    this.store = new listStore();
  }

  componentDidMount() {
    this.store.loadItems();
  }

  render() {
    return <div>{this.store.itemList}</div>;
  }
}
