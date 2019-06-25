import styles from 'App.module.scss';
import AddTaskInput from 'components/AddTaskInput/AddTaskInput';
import DoneList from 'components/doneList/DoneList';
import ToDoList from 'components/toDoList/ToDoList';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import listStore from 'stores/listStore';

@observer
export default class App extends React.Component<{}, { taskName: string }> {
    private listStore: listStore;

    constructor(props: any) {
        super(props);
        this.listStore = new listStore();
    }

    componentDidMount() {
        this.listStore.loadItems();
    }

    clearData = () => {
        this.listStore.clearLocalStorage();
    };

    // private displayLolcalStorage = () => {
    //     var values = [],
    //         keys = Object.keys(localStorage),
    //         i = keys.length;

    //     while (i--) {
    //         values.push(localStorage.getItem(keys[i]));
    //     }
    //     console.log('all local stores', values);
    // };

    render() {
        const stores = { store1: this.listStore };
        return (
            <Provider {...stores}>
                <div className={styles.app}>
                    <AddTaskInput />
                    <ToDoList />
                    {this.listStore.doneList.length > 0 && <DoneList />}
                    <button onClick={this.clearData}>clear store</button>
                </div>
            </Provider>
        );
    }
}
