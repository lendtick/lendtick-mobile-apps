import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/service/store';
import { rooter } from './src/service/rooter';
import { createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RootStack />
			</Provider>
		);
	}
}

const RootStack = createSwitchNavigator(rooter,{
	initialRouteName: 'Init',
	mode: 'modal'
});