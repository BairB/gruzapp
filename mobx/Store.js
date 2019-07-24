import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { action, observable, runInAction } from 'mobx';
import io from 'socket.io-client';
import { URL } from '../constants';
import NetworkRequests from './NetworkRequests';
import networkErrorHandler from '../utils/networkErrorHandler';

const TAG = '~Store.js~';

class ObservableStore {
    lastOrderPullTime = null;
    @observable.shallow orders = [];
    @observable.shallow workers = [];
    @observable order = null;
    @observable dispatcher = null;

    @observable balance = '';
    @observable name = '';
    @observable isDriver = false;
    @observable onWork = false;
    @observable orderIdOnWork = '';
    @observable userId = '';

    @observable avatar = '';

    @observable phone = '';
    @observable firstName = '';
    @observable lastName = '';
    @observable patronymic = '';
    @observable city = '';
    @observable cityId = '';
    @observable street = '';
    @observable house = '';
    @observable flat = '';
    @observable birthDate = 'Дата рождения';
    @observable height = '';
    @observable weight = '';

    @observable veh_is_open = false;
    @observable veh_height = '';
    @observable veh_width = '';
    @observable veh_length = '';
    @observable veh_loadingCap = '';
    @observable veh_frameType = '';
    @observable vehicle0 = '';
    @observable vehicle1 = '';
    @observable vehicle2 = '';
    @observable refreshImage = Number(new Date());

    @observable socketChat = undefined;
    @observable chatHistory = [];

    @action async updateUserInfo() {
        const userId = await AsyncStorage.getItem('userId');

        const response = await NetworkRequests.getWorker(userId);

        runInAction(() => {
            //console.log(`get /worker/${userId} response.data >>>>`, response.data);
            this.balance = (+response.data.balance).toFixed(2);
            this.name = response.data.name;
            this.isDriver = response.data.isDriver;
            this.orderIdOnWork = response.data.order;
            //this.onWork = response.data.onWork;
            this.avatar = URL + response.data.photos.user;
            //console.log('avatar ', this.avatar);
        });
    }

    @action async setUserId(userId) {
        runInAction(() => {
            this.userId = userId;
        });
    }

    @action async getUserInfo() {
        const userId = await AsyncStorage.getItem('userId');

        const response = await NetworkRequests.getWorker(userId);

        runInAction(() => {
            // console.log(`get /worker/${userId} response.data >>>>`, response.data);
            const date = new Date(response.data.birthDate);

            for (let key in response.data) this[key] = response.data[key];
            this.balance = (+response.data.balance).toFixed(2);

            // this.balance = response.data.balance;
            // this.name = response.data.name;
            // this.isDriver = response.data.isDriver;
            // this.onWork = response.data.onWork; // на данный момент всегда false, необходимо смотреть response.data.order
            this.orderIdOnWork = response.data.order; // null когда грузчиком не выполняется заказ
            this.avatar = URL + response.data.photos.user;
            this.phone = response.data.phoneNum;
            [this.lastName, this.firstName, this.patronymic] = response.data.name.split(' ');
            [this.city, this.street, this.house, this.flat] = response.data.address.split(' ');
            this.cityId = response.data.city;
            this.birthDate = date;
            this.vehicle0 = URL + response.data.photos.vehicle0;
            this.vehicle1 = URL + response.data.photos.vehicle1;
            this.vehicle2 = URL + response.data.photos.vehicle2;
            // this.height = response.data.height;
            // this.weight = response.data.weight;

            // this.veh_is_open = response.data.veh_is_open;
            // this.veh_height = response.data.veh_height;
            // this.veh_width = response.data.veh_width;
            // this.veh_length = response.data.veh_length;
            // this.veh_loadingCap = response.data.veh_loadingCap;
            // this.veh_frameType = response.data.veh_frameType;

            // console.log('User Info >>>> ', response.data);
        });
    }

    @action async setOnWork(value) {
        this.onWork = value;
    }

    @action async getOrders() {
        const response = await NetworkRequests.getOpenOrders();

        runInAction(() => {
            this.orders = response.data;
        });
    }

    @action async clearOrders() {
        runInAction(() => {
            this.orders = [];
        });
    }

    @action async startChatSocket(order_id) {
        if (this.socketChat === undefined) {
            const token = await AsyncStorage.getItem('token');
            console.log(token);

            if (token) {
                runInAction(() => {
                    this.socketChat = io(URL + '/chat', { query: { token, order_id } });
                });
            }
        }
    }

    @action async addChatMessage(message) {
        runInAction(() => {
            console.log('[MESASAGE]', message);
            this.chatHistory = [message, ...this.chatHistory];
        });
    }

    @action async pullFulfilingOrderInformation(id) {
        if (!id) {
            id = this.orderIdOnWork;
        } else {
            runInAction(() => {
                this.orderIdOnWork = id;
            });
        }

        const { data: order } = await NetworkRequests.getOrder(id);

        runInAction(() => {
            this.order = order;
            this.lastOrderPullTime = Date.now();
        });

        const PromisePullDispatcher = this.pullDispatcherById(order.creating_dispatcher);
        const PromisePullWorkers = this.setWorkersByArray(order.workers.data);

        await Promise.all([PromisePullDispatcher, PromisePullWorkers]);
    }

    async startFulfillingOrder(id) {
        await NetworkRequests.startOrder(id);

        await this.pullFulfilingOrderInformation(id);
    }

    async cancelFulfillingOrder() {
        await NetworkRequests.cancelOrder();
    }

    @action async pullDispatcherById(id) {
        const response = await NetworkRequests.getDispatcher(id);
        runInAction(() => {
            this.dispatcher = response.data;
        });
    }

    @action async setWorkersByArray(workers) {
        let workersData = workers.map(worker => {
            return {
                id: worker.id._id,
                name: worker.id.name,
                phoneNum: worker.id.phoneNum,
                avatar: URL + worker.id.photos.user,
                isDriver: worker.id.isDriver
            };
        });
        runInAction(() => {
            this.workers = workersData;
        });
    }

    @action async refreshImages() {
        runInAction(() => {
            this.refreshImage = this.refreshImage + 1;
        });
        console.log('refresh Image: ' + this.refreshImage);
    }
}

const Store = new ObservableStore();

export default Store;
//userName: response.data.name,
//userType: response.data.isDriver,
//workingStatus: response.data.onWork
