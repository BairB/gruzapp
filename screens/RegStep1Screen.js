import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';

import {
    DatePickerAndroid,
    Keyboard,
    KeyboardAvoidingView,
    Picker,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import LocalImage from '../components/LocalImage';
import NumericInput from '../components/NumericInput';
import styles from '../styles';
import ChoiceCameraRoll from './modals/ChoiceCameraRoll';

class RegStep1Screen extends React.Component {
    state = {
        Visible: false,
        phone: '',
        password: '',
    };
    static navigationOptions = {
        title: 'Регистрация',
        headerLeft: null,
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center',
            color: 'white'
        }
    };

    componentDidMount() {
        (async () => {
            try {
                (async () =>
                    this.setState({
                        cities: [
                            { name: 'Город', id: 1 },
                            ...(await axios.get('/cities/1000/1')).data.map(({ name, id }) => ({
                                name,
                                id
                            }))
                        ]
                    }))();
            } catch (err) {
                console.log(err);
            }
        })();

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        });
    }

    componentWillUnmount() {
        if (this.keyboardDidHideListener) {
            this.keyboardDidHideListener.remove();
        }
    }

    render() {
        return (

            <ScrollView contentContainerStyle={styles.registrationScreen}>

                <View style={styles.inputContainerReg} behavior='padding' enabled>
                    <View style={styles.regStep}>
                        <Text style={{ color: '#1AA3FA', fontSize: 22 }}>Шаг 1/3</Text>
                    </View>

                    {
                        !this.state.Visible ? (<View>
                            <Text style={styles.regStep3Text}>Номер телефона</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите ваш номер телефона'
                                placeholderTextColor='grey'
                                onChangeText={phone => this.setState({ phone })} />
                        </View>) : (<View>

                            <View style={styles.regStep1RepeatView}>
                                <Text style={styles.regStep1Text}>На ваш номер отправлен код подтверждения.</Text>
                                <TouchableOpacity>
                                    <Text style={styles.regStep1Repeat}>Повторить?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.regStep1ConfirmView}>
                                <Text style={styles.regStep1Text}>Ведите код подтверждения</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder='Введите код подтверждения'
                                secureTextEntry={true}
                                placeholderTextColor='grey'
                                onChangeText={password => this.setState({ password })}
                            />
                        </View>)
                    }

                </View>
                <Text style={{ color: 'red' }}>{this.state.message}</Text>
                {!this.state.Visible ? <LoadingButton style={styles.regStep1Button} onPress={this._nextScreen}>
                    <Text style={{ color: 'white' }}>ПОЛУЧИТЬ КОД ПОДТВЕРЖДЕНИЯ</Text>
                </LoadingButton> :
                    <LoadingButton style={styles.buttonBottom} onPress={this._nextScreen}>
                        <Text style={{ color: 'white' }}>ПОДТВЕРДИТЬ</Text>
                    </LoadingButton>
                }
            </ScrollView>

        );
    }

    _nextScreen = async () => {
        const city = this.state.cities.filter(({ id }) => id === this.state.cityId)[0].name;
        if (
            typeof this.state.pictureUri === 'number' ||
            this.state.lastname === '' ||
            this.state.firstname === '' ||
            this.state.patronimyc === '' ||
            this.state.phone === '' ||
            this.state.password === '' ||
            this.state.birthDate === 'Дата рождения' ||
            this.state.height === '' ||
            this.state.weight === '' ||
            city === '' ||
            this.state.cityId === '' ||
            this.state.street === '' ||
            this.state.house === '' ||
            this.state.flat === ''
        ) {
            this.setState({ message: 'Все поля должны быть заполнены' });
        } else {
            const userData = {
                name: `${this.state.lastname} ${this.state.firstname} ${this.state.patronimyc}`,
                login: this.state.phone,
                phoneNum: this.state.phone,
                password: this.state.password,
                birthDate: this.state.birthDate,
                address: `${city} ${this.state.street} ${this.state.house} ${this.state.flat}`,
                city: this.state.cityId,
                height: this.state.height,
                weight: this.state.weight,
                isDriver: this.state.isDriver
            };
            console.log(userData);
            this.props.navigation.navigate('Documents', { ...userData, avatar: this.state.pictureUri });
        }
    };

    openDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                console.log(year, month, day);

                let date = new Date(year, month, day);
                this.setState({ birthDate: date });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };

    openCameraRoll = () => {
        this.setState({ choiceModalVisible: true });
    };

    closeModals = () => {
        this.setState({
            choiceModalVisible: false
        });
    };

    pickFromCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.setState({ choiceModalVisible: false });
            const { cancelled, uri } = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
                quality: 0.3
            });
            if (!cancelled) this.setState({ pictureUri: uri });
        }
    };

    selectPicture = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            this.setState({ choiceModalVisible: false });
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                quality: 0.3
            });
            if (!cancelled) this.setState({ pictureUri: uri });
        }
    };
}

export default RegStep1Screen;
