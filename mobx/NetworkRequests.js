import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import networkErrorHandler from '../utils/networkErrorHandler';

const TAG = '~NetworkRequest.js~';

async function getDispatcher(id) {
    let response;
    try {
        response = await axios.get(`/dispatcher/${id}`);
        console.log(TAG, 'getDispatcher response.data: ', response.data);
    } catch (error) {
        networkErrorHandler(TAG, error, `get /dispatcher/${id}`);
    }

    return response;
}

async function startOrder(id) {
    try {
        const userId = await AsyncStorage.getItem('userId');
        let response = await axios.patch(`/order/workers/${id}/${userId}`);
        console.log(TAG, 'startOrder response.status:', response.status, response.data.msg);
    } catch (error) {
        networkErrorHandler(TAG, error, `patch /order/workers/${id}/${userId}`);
    }
}

async function cancelOrder() {
    try {
        let response = await axios.post(`/order/cancel_work`);
        console.log(TAG, 'cancelOrder response.status:', response.status);
    } catch (error) {
        networkErrorHandler(TAG, error, `post /order/cancel_work`);
    }
}

async function getOrder(id) {
    let response;
    try {
        response = await axios.get(`/order/${id}`);
        //console.log(TAG, 'getOrder response.data:', response.data);
    } catch (error) {
        networkErrorHandler(TAG, error, `get /order/${id}`);
    }

    return response;
}

async function getOpenOrders() {
    let response;
    try {
        response = await axios.get(`/order/open/60/1`);
        //console.log(TAG, 'getOrder response.data:', response.data);
    } catch (error) {
        networkErrorHandler(TAG, error, `get /order/open/60/1`);
    }

    return response;
}

async function getWorker(id) {
    let response;
    try {
        response = await axios.get(`/worker/${id}`);
    } catch (error) {
        networkErrorHandler(TAG, error, `get /worker/${id}`);
    }

    return response;
}

async function completeOrder(data) {
    try {
        console.log(TAG, data);
        let response = await axios.post('/order/end_work', data);
        console.log(TAG, 'completeOrder response.data:', response.data);
        console.log(TAG, 'completeOrder response.status:', response.status);
    } catch (error) {
        networkErrorHandler(TAG, error, 'post /order/end_work');
    }
}

async function clearPushToken() {
    try {
        await axios.post('/push_token', { token: null });
    } catch (error) {
        networkErrorHandler(TAG, error, 'post /push_token');
    }
}

export default {
    cancelOrder,
    getDispatcher,
    startOrder,
    getOrder,
    getOpenOrders,
    getWorker,
    completeOrder,
    clearPushToken
};
