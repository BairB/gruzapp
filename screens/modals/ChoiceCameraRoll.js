import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../styles";

class ChoiceCameraRoll extends React.Component {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.closeModal();
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(52, 52, 52, 0.8)"
                    }}
                >
                    <View style={styles.choiceCameraRoll}>
                        <TouchableOpacity
                            style={styles.choiceCameraRollItem}
                            onPress={this.props.pickFromCamera}
                        >
                            <Text style={{ color: 'white' }}>Сделать фото...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceCameraRollItem} onPress={this.props.selectPicture}>
                            <Text style={{ color: 'white' }}>Выбрать из галереи...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.choiceCameraRollCancel}
                            onPress={() => {
                                this.props.closeModal();
                            }}
                        >
                            <Text style={{ color: 'white' }}>ОТМЕНА</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
export default ChoiceCameraRoll;
