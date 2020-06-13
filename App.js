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
// import * as Sentry from 'sentry-expo';
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

// Sentry.init({
//   dsn: 'https://0e1b57b2048e42f4b3fe74c41c03dc6a@o281169.ingest.sentry.io/5260568', 
//   enableInExpoDevelopment: true,
//   debug: true,
// });

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
