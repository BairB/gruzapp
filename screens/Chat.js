import { inject, observer } from 'mobx-react/native';
import React from 'react';
import { Text, View } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { toJS } from 'mobx';
import NetworkRequests from '../mobx/NetworkRequests';
import { URL } from '../constants';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
//const socket = (async()=>{await getChatSocket('5ce66399dcc0097d8b95dc17')})();

const TAGdidMount = '~Chat.js componentDidMount() ~';
const TAGidToName = '~Chat.js idToName() ~';
let socket;

@inject('store')
@observer
class Chat extends React.Component {
	state = {
		messages: [],
		chatHistory: []
	};

	static navigationOptions = {
		title: 'Чат с диспетчером'
	};

	workersChatData = []; // имена и аватарки людей в чате

	setMessage(id, text, sender, name, avatar) {
		return {
			_id: id,
			text: text,
			user: {
				_id: sender,
				name: name,
				avatar: avatar
			}
		};
	}

	componentDidMount = async () => {
		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			(async () => {
				console.log('WILL FOCUS');

				socket = io(URL + '/chat', {
					query: {
						token: await AsyncStorage.getItem('token'),
						order_id: this.props.store.orderIdOnWork
					}
				});
				//console.log(TAGdidMount, 'socketChat.connected from store:', socket.connected);

				socket.on('history', async result => {
					console.log(TAGdidMount, 'callback socket.on "history" called');

					//console.log(result);
					this.setState({ chatHistory: [] });
					for (const item of result) {
						const { text, sender } = item;
						const { name, avatar } = await this.idToName(sender);
						this.addChatMessage(this.setMessage(Math.random(), text, sender, name, avatar));
					}
				});

				socket.on('chat message', async result => {
					const { sender, text } = result;
					const { name, avatar } = await this.idToName(sender);
					this.addChatMessage(this.setMessage(Math.random(), text, sender, name, avatar));
					//console.log(result);
				});
			})();
		});
		let storeDispatcher = toJS(this.props.store.dispatcher);
		console.log(TAGdidMount, 'dispatcher from store:', storeDispatcher);

		let disp = this.workersChatData.find(item => item.id === storeDispatcher._id);
		console.log(TAGdidMount, 'dispatcher in workersChatData:', disp);

		if (!disp) {
			console.log(TAGdidMount, 'add dispatcher to workersChatData');
			this.workersChatData.push({
				id: storeDispatcher._id,
				name: storeDispatcher.name,
				avatar: require('../images/camera.png')
			});
		}

		//await this.props.store.startChatSocket(this.props.store.orderIdOnWork);
	};

	componentWillUnmount() {
		if (this.willFocusSubscription) {
			this.willFocusSubscription.remove();
		}
		socket.disconnect();
	}

	addChatMessage(message) {
		console.log('[MESASAGE]', message);
		this.setState({ chatHistory: [message, ...this.state.chatHistory] });
	}

	idToName = async id => {
		//workerChatData
		console.log(TAGidToName, 'call worker idToName with id:', id);

		let workerData = this.workersChatData.find(item => item.id === id);
		let name = null;
		let avatar = null;

		if (workerData) {
			name = workerData.name;
			avatar = workerData.avatar;
		} else {
			try {
				const { data: newWorkerData } = await NetworkRequests.getWorker(id);
				console.log(TAGidToName, 'newWorkerData', newWorkerData);
				this.workersChatData.push({
					id: newWorkerData._id,
					name: newWorkerData.name,
					avatar: URL + newWorkerData.photos.user
				});

				name = newWorkerData.name;
				avatar = URL + newWorkerData.photos.user;
			} catch (error) {
				console.log(TAGidToName, error);
			}
		}

		return { name, avatar };
	};

	render() {
		const arr = [...this.state.chatHistory];
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					backgroundColor: '#FFFFFF',
					padding: 8
				}}
				key={this.props.id}
			>
				<GiftedChat
					messages={arr}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: this.props.store.userId
					}}
					alwaysShowSend={true}
					renderSend={this.renderSend}
					placeholder='Введите сообщение...'
					renderUsernameOnMessage={true}
				/>
			</View>
		);
	}

	renderSend(props) {
		return (
			<Send {...props}>
				<Text style={{ marginBottom: 10, fontSize: 16 }}>Отправить</Text>
			</Send>
		);
	}

	onSend(messages = []) {
		messages.forEach(message => {
			//console.log(message);

			socket.emit('chat message', message.text);
		});

		this.setState({
			chatHistory: GiftedChat.append([...this.state.chatHistory], messages).map(v => ({
				...v,
				createdAt: undefined
			}))
		});
	}
}

export default Chat;
