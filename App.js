import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import { rooter } from '@services/rooter';
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