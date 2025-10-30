import { makeAutoObservable } from 'mobx';

export class ActivityStore {
    filter = 'all';
    startDate = new Date().toISOString();
    hostName = '';
    categoryType = '';

    constructor() {
        makeAutoObservable(this);
    }

    setFilter = (filter: string) => {
        this.filter = filter;
    };

    setStartDate = (date: Date) => {
        this.startDate = date.toISOString();
    };

    setHostName = (hostName: string) => {
        this.hostName = hostName;
    };
    setCategoryType = (categoryType: string) => {
        this.categoryType = categoryType;
    };
}
