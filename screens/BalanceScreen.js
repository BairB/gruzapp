import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NumericInput from '../components/NumericInput';
import styles from '../styles';
import LoadingButton from '../components/LoadingButton';
import Icon from 'react-native-vector-icons/Entypo';

@inject('store')
@observer
class BalanceScreen extends React.Component {
    state = {
        sum: null,
        message: '',
        sum: ''
    };

    static navigationOptions = {
        title: 'Пополнение баланса',
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center',
            color: 'white'
        }
    };

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            (async () => {
                try {
                    await this.props.store.getUserInfo();
                    //await CacheManager.clearCache();
                } catch (error) {
                    // TODO добавить вывод ошибки пользователю
                    console.log(error);
                    console.log('awdwadawdОшибка при получении новых данных, проверьте подключение к сети');
                    return;
                }

                this.setState({ ...this.props.store, message: '' });
            })();
        });
    }

    componentWillUnmount() {
        if (this.willFocusSubscription) {
            this.willFocusSubscription.remove();
        }
    }

    render() {
        return (
            <View style={styles.balance}>
                <View style={styles.balanceContainer}>
                    <View >
                        <View style={styles.balanceInfo}>
                            <Icon name='wallet' size={25} color='#1AA3FA' style={{ paddingRight: 10 }} />
                            <Text style={{ marginBottom: 15, fontSize: 16, fontWeight: 'bold' }}>
                                Баланс: <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>{this.props.store.balance}</Text>{' '}
                                р.
                    </Text>
                        </View>
                        <Text style={styles.regStep3Text}>Введите сумму пополнения</Text>
                        <NumericInput
                            style={styles.input}
                            placeholder='Сумма'
                            onChangeText={sum => this.setState({ sum })}
                            value={this.state.sum}
                        />
                    </View>
                    <Text style={{ color: 'red' }}>{this.state.message}</Text>

                    <View style={styles.regStep3PassportPhoto}>
                        <LoadingButton style={styles.buttonBottom} onPress={this._goToRobokassa}>
                            <Text style={{ color: 'white' }}>ПЕРЕЙТИЙ К ОПЛАТЕ</Text>
                        </LoadingButton>
                    </View>
                </View>
            </View>
        );
    }

    _goToRobokassa = async () => {
        if (!this.state.sum) return this.setState({ message: "Необходимо заполнить поле 'Сумма'" });

        this.props.navigation.navigate('Robokassa', {
            sum: this.state.sum,
            userId: await AsyncStorage.getItem('userId')
        });
    };
}

export default BalanceScreen;



{/* 
    <View style={styles.balanceContainer}>
                    <View >
                        <View style={styles.balanceInfo}>
                            <Icon name='wallet' size={25} color='#1AA3FA' style={{ paddingRight: 10 }} />
                            <Text style={{ marginBottom: 15, fontSize: 16, fontWeight: 'bold' }}>
                                Баланс: <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>{this.props.store.balance}</Text>{' '}
                                р.
                    </Text>
                        </View>
                        <Text style={styles.regStep3Text}>Введите сумму пополнения</Text>
                        <NumericInput
                            style={styles.input}
                            placeholder='Сумма'
                            onChangeText={sum => this.setState({ sum })}
                            value={this.state.sum}
                        />
                    </View>
                    <Text style={{ color: 'red' }}>{this.state.message}</Text>

                    <View style={styles.regStep3PassportPhoto}>
                        <LoadingButton style={styles.buttonBottom} onPress={this._goToRobokassa}>
                            <Text style={{ color: 'white' }}>ПЕРЕЙТИЙ К ОПЛАТЕ</Text>
                        </LoadingButton>
                    </View>
                </View> 
            */}