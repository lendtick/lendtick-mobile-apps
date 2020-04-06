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

// global.XMLHttpRequest = global.originalXMLHttpRequest
//   ? global.originalXMLHttpRequest
//   : global.XMLHttpRequest;
// global.FormData = global.originalFormData
//   ? global.originalFormData
// 	: global.FormData;
// fetch; // Ensure to get the lazy property

// // RNDebugger only
// if (window.__FETCH_SUPPORT__) {
// 	window.__FETCH_SUPPORT__.blob = false
// }
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