import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
    DatePickerAndroid,
    Keyboard,
    KeyboardAvoidingView,
    Picker,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import LoadingButton from '../components/LoadingButton';
import LocalImage from '../components/LocalImage';
import NumericInput from '../components/NumericInput';
import styles from '../styles';
import ChoiceCameraRoll from './modals/ChoiceCameraRoll';

class RegStep3Screen extends React.Component {
    state = {
        Visible: false,
        phone: '',
        password: '',
        license: false,
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
                        <Text style={{ color: '#1AA3FA', fontSize: 22 }}>Шаг 3/3</Text>
                    </View>

                    <Text style={styles.regStep2Text}>Паспортные данные</Text>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.regStep3pasport}>
                            <Text style={styles.regStep3Text}>Номер</Text>
                            <NumericInput
                                onlyNum
                                style={styles.inputHalf}
                                placeholder='Введите номер'
                                onChangeText={house => this.setState({ house })}
                                value={this.state.house}
                            />
                        </View>
                        <View style={{ width: 15 }} />
                        <View style={styles.regStep3pasport}>
                            <Text style={styles.regStep3Text}>Серия</Text>
                            <NumericInput
                                onlyNum
                                style={styles.inputHalf}
                                placeholder='Введите серия'
                                onChangeText={flat => this.setState({ flat })}
                                value={this.state.flat}
                            /></View>
                    </View>
                    <Text style={styles.regStep3Text}>Фото страниц паспорта</Text>

                    <View style={styles.regStep3PassportPhoto}>
                        <TouchableOpacity style={styles.regStep3Photo}>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.regStep3Photo}>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.regStep3PhotoInfo}>
                            <Icon name='info' size={14} color='#1AA3FA' />
                            <Text style={styles.regStep3Text}>Фото первой страницы и страницы с регистрацией</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.regStep3Text}>Номер договора</Text>
                    <NumericInput
                        onlyNum
                        style={styles.inputHalf}
                        placeholder='Введите номер'
                        onChangeText={house => this.setState({ house })}
                        value={this.state.house}
                    />

                    <CheckBox
                        checked={this.state.license}
                        checkedColor='#1AA3FA'
                        uncheckedColor='grey'
                        checkedIcon='check-square'
                        onPress={() => this.setState({ license: !this.state.license })}
                        title='Лицензионное соглашение'
                    />


                    <View style={styles.regStep3PassportPhoto}>
                        <LoadingButton style={styles.buttonBottom} onPress={this._nextScreen}>
                            <Text style={{ color: 'white' }}>СОХРАНИТЬ</Text>
                        </LoadingButton>
                    </View>
                </View>

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

export default RegStep3Screen;
