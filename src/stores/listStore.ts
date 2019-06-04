import { observable } from "mobx";

export default class toStore {
  @observable public itemList: string[] = [];

  public loadItems() {
    const newItems = ["task1", "task2", "task3"];
    this.itemList = [...newItems];
  }
}
