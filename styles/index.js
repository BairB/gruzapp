import { StyleSheet, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },

    backgroundContainer: {
        flex: 2,
        width: null,
        height: null
    },

    logoText: {
        color: '#1AA3FA',
        fontSize: 42,
        fontWeight: '500'
    },

    logoIcon: {
        marginTop: 15
    },

    input: {
        width: WIDTH - 16,
        height: 45,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginBottom: 15,
        paddingLeft: -6,
        justifyContent: 'flex-start',
    },

    inputSumComplete: {
        height: 45,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        justifyContent: 'center',
        paddingLeft: 15,
        marginHorizontal: 12,
        marginTop: 12,
        marginBottom: 6
    },

    datePickerText: {
        fontSize: 16,
        color: 'grey'
    },

    inputHalf: {
        flex: 1,
        height: 45,
        borderBottomWidth: 1,
        borderColor: 'grey',
        fontSize: 16,
        paddingLeft: -6,
        marginBottom: 15
    },

    inputWithIcon: {
        height: 45,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },

    inputWithIconCountryCode: {
        height: 45,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        paddingLeft: 71
    },

    countryCode: {
        position: 'absolute',
        top: 12,
        paddingLeft: 48,
        fontSize: 16
    },

    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 15
    },

    inputContainer: {
        marginTop: 10,
        width: WIDTH - 55,
        marginHorizontal: 25,
        backgroundColor: '#102542'
        //        flex: 1
    },

    policy: {
        marginHorizontal: 45,
        flexDirection: 'row',
        flex: 1
    },

    btnEye: {
        position: 'absolute',
        top: 8,
        right: 20
    },

    button: {
        width: WIDTH - 100,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#1AA3FA',
        justifyContent: 'center',
        marginTop: 10
    },

    buttonConfirmAlone: {
        width: WIDTH / 2,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FFC234',
        alignSelf: 'center',
        justifyContent: 'center',
        color: 'white'
    },

    buttonConfirm: {
        width: WIDTH / 3,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FFC234',
        justifyContent: 'center'
    },

    buttonCancel: {
        width: WIDTH / 3,
        height: 45,
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    buttonBottom: {
        width: WIDTH / 2,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#1AA3FA',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },

    text: {
        color: '#FFC234',
        fontSize: 16,
        textAlign: 'center'
    },

    buttonText: {
        fontSize: 16,
        textAlign: 'center'
    },

    blackText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },

    mainMenuItemText: {
        color: 'black',
        fontSize: 20
        //   textAlign: 'center'
    },

    h2: {
        fontSize: 18
    },

    description: {
        color: 'grey',
        marginHorizontal: 35,
        textAlign: 'center',
        top: 10,
        marginBottom: 10
    },

    descriptionTwo: {
        color: 'grey',
        marginHorizontal: 6,
        textAlign: 'left',
        marginBottom: 10
    },

    //for ScrollView
    registrationScreen: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingTop: 10
    },

    registrationPhoto: {
        width: '100%'
    },

    camButton: {
        backgroundColor: '#FFC234',
        marginBottom: 15,
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center'
    },

    camButton: {
        backgroundColor: '#FFC234',
        marginBottom: 15,
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center'
    },

    choiceCameraRoll: {
        height: 200,
        backgroundColor: 'white',
        shadowColor: 'black',
        width: WIDTH * 0.9,
        elevation: 5,
        borderRadius: 10
    },

    choiceCameraRollItem: {
        backgroundColor: '#1AA3FA',
        borderRadius: 10,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    choiceCameraRollCancel: {
        backgroundColor: '#102542',
        borderRadius: 10,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: HEIGHT,
        width: WIDTH
    },

    photoButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16
    },

    fullScreenPicture: {
        marginVertical: 10
    },

    registrationQuestion: {
        marginTop: 10,
        fontSize: 16,
        color: 'grey'
    },

    drawerUserContainer: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFC234',
        //   alignContent: "center",
        alignItems: 'center',
        padding: 18,
        paddingTop: 40
    },

    drawerUserName: {
        flex: 2,
        textAlign: 'center',
        fontSize: 24,
        paddingLeft: 6
    },

    drawerTopItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 56,
        borderColor: '#C4C4C4',
        padding: 12
    },

    drawerFontTopItem: {
        fontSize: 16
    },

    drawerLicenseAgreement: {
        alignSelf: 'center',
        color: '#c69523',
        //   paddingTop: 120,
        //   Self: 'flex-end',

        paddingBottom: 16
    },

    instructionBase: {
        marginHorizontal: 15,
        marginTop: 10
    },

    instructionView: {
        padding: 5,
        borderRadius: 3,
        justifyContent: 'center'
    },

    instructionViewTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center'
    },

    instructionTitle: {
        fontSize: 16
    },

    instructionText: {
        // flex: 1,
        // justifyContent: 'flex-start',
        // padding: 5
    },

    orderRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 12,
        paddingVertical: 4
        // borderWidth: 1, borderColor: 'green'
    },

    executorsRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 12,
        paddingVertical: 4
        // borderWidth: 1, borderColor: 'green'
    },

    cardExecutorH2: {
        color: 'black',
        fontSize: 16,
        marginLeft: 16,
        marginVertical: 12
    },

    cardH2: {
        color: 'black',
        fontSize: 16,
        marginLeft: 16
        //   textAlign: 'center'
    },

    cardRowTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cardMargins: {
        marginHorizontal: 12,
        marginVertical: 6
    },

    orderText: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10
    },

    orderChevronIcon: {
        alignSelf: 'flex-start'
    },

    orderIcon: {
        marginRight: 12
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    cardBase: {
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#f1f1f1',
        // borderWidth: 1,
        // borderColor: 'red',
        borderRadius: 10
    },

    cardChat: {
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginHorizontal: 12,
        marginTop: 6
    },

    cardButtonText: {
        fontWeight: 'bold'
    },

    cardButton: {
        padding: 12
    },

    clockText: {
        marginTop: 2
    },

    locationText: {
        marginLeft: 8,
        marginRight: 12
    },

    locationPointNameText: {
        marginRight: 12
    },

    descriptionText: {
        marginRight: 32
    },

    mainTopBackground: {
        flex: 1,
        backgroundColor: '#102542',
        padding: 18,
    },

    mainFontUserName: {
        fontSize: 32,
        textAlign: 'center',
        paddingBottom: 6
    },

    mainFontUserType: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4D443F',
        fontWeight: '100',
        paddingBottom: 42
        //     padding: 12
    },

    mainFontBalance: {
        fontSize: 36,
        textAlign: 'center',
        paddingBottom: 6,
        color: 'white',
    },

    mainWorkingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        padding: 12
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    buttonContainerAlone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    absoluteButtonContainer: {
        position: 'absolute',
        left: 25,
        right: 25,
        bottom: 16
    },

    executorBase: {
        marginHorizontal: 15,
        marginBottom: 5
    },

    spaceBottom: {
        marginBottom: 16 + 45 + 16
    },

    cardDescription: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 20
    },

    executorText: {
        marginBottom: 10,
        marginTop: 10
    },

    executorTextDisp: {
        marginBottom: 10
    },

    executorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12
    },

    sis: {
        backgroundColor: '#102542',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
    },

    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#102542'
    },

    inputBlock: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#102542'
    },

    sisNumberText: {
        color: 'white'
    },

    logoBoy: {
        marginTop: 80,
        marginBottom: 32
    },

    regBlock: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#102542'
    },

    inputContainerReg: {
        marginTop: 10,
        width: WIDTH - 16,
        marginHorizontal: 25,
        backgroundColor: 'white',
        flexDirection: 'column'
        //        flex: 1
    },
    regStep: {
        justifyContent: 'flex-start',
        width: WIDTH - 16,
        marginBottom: 5,
    },
    regStep2Picture: {
        backgroundColor: '#EEF5F9',
        justifyContent: 'center',
        alignItems: 'center',
        height: 240,
        width: WIDTH,
    },
    regStep2Text: {
        fontWeight: 'bold',
        marginTop: 5
    },
    regStep1: {
        flexDirection: 'column',
        width: WIDTH - 16
    },
    regStep3pasport: {
        flexDirection: 'column',
        flex: 1
    },
    regStep3Text: {
        marginTop: 5,
        color: 'grey',
        fontSize: 12,
    },
    regStep1Repeat: {
        color: '#1AA3FA',
        fontSize: 16,
    },
    regStep1Text: {
        marginTop: 5,
        fontSize: 16,
    },
    regStep1RepeatView: {
        flexDirection: 'column'
    },
    regStep1Button: {
        width: WIDTH - 16,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#1AA3FA',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    regStep1ConfirmView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    regStep3Photo: {
        height: 104,
        width: 104,
        backgroundColor: '#EEF5F9',
        marginTop: 5,
        marginRight: 8,
    },
    regStep3PhotoInfo: {
        height: 104,
        width: 104,
        marginTop: 5,
        borderColor: '#EEF5F9',
        borderWidth: 1,
        padding: 8,
    },
    regStep3PassportPhoto: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    regStep3License: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    balance: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    balanceContainer: {
        marginTop: 10,
        height: HEIGHT,
        width: WIDTH - 16,
    },
    balanceInfo: {
        flexDirection: 'row',
        height: 40
    },
    mainBalance: {
        position: 'absolute',
        marginLeft: 20,
        backgroundColor: 'grey',
        width: WIDTH - 90,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    mainBalanceView: {
        backgroundColor: '#102542',
        flexDirection: 'row',
        width: WIDTH - 40,
        height: 104,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainBalanceIcon: {
        position: 'absolute',
        // marginLeft: WIDTH - 97,
    },
    mainBalanceIconView: {
        height: 56,
        width: 56,
        marginLeft: WIDTH - 97,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },


});
export default styles;
