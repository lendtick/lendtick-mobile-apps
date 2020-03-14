// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import { rooter } from '@services/rooter';
import { createSwitchNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: ...']);
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