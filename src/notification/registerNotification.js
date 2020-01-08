import { Platform,AsyncStorage } from 'react-native';
<<<<<<< HEAD
import { Permissions,Notifications } from 'expo';
=======
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
>>>>>>> master
import { API } from '@services/API';

var urlPutToken = API.auth + '/fcm/token';


export default async function registerNotification(){
    const { status: existingStatus } = await Permissions.getAsync(
    	Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    return AsyncStorage.getItem('token').then((result)=>{
		fetch(urlPutToken, {
			method: 'PUT',
			body: JSON.stringify({
				type: Platform.OS,
				token: token
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': result
			})
		}).then(response => response.json())
		.then(json => console.log(json))
		.catch(err => {
			console.log(err);
		});
	});
}