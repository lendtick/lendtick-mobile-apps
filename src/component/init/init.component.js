import React from 'react';
import { AsyncStorage } from 'react-native';
import { Permissions,Font } from 'expo';

class InitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    async componentDidMount(){
        // Permission Notification
        // ======================================== //
        Permissions.askAsync(Permissions.NOTIFICATIONS);

        // Load Font
        // ======================================== //
        await Font.loadAsync({
            'font-bold': require('@assets/font/Poppins/Poppins-Bold.ttf'),
            'font-medium': require('@assets/font/Poppins/Poppins-Medium.ttf'),
            'font-regular': require('@assets/font/Poppins/Poppins-Regular.ttf'),
            'font-light': require('@assets/font/Poppins/Poppins-Light.ttf'),
            'font-extra-light': require('@assets/font/Poppins/Poppins-ExtraLight.ttf'),
            'font-thin': require('@assets/font/Poppins/Poppins-Thin.ttf'),
        });

        // Direct Page as token & status isNew user
        // ======================================== //
        AsyncStorage.getItem('isNew').then((result)=>{
            if(result){
                switch(Number(result)){
                    case 0 :
                        this.props.navigation.navigate('Home');
                    break;
                    case 1 :
                        this.props.navigation.navigate('LoginFirst');
                    break;
                    case 2 :
                        this.props.navigation.navigate('Register2');
                    break;
                }
            }else{
                AsyncStorage.getItem('keeped').then((e)=>{
                    if(e){
                        this.props.navigation.navigate('Home');
                    }else{
                        this.props.navigation.navigate('Walkthrough');
                    }
                });
            }
        });

    }
    render() { return(null) }
}


export default InitComponent;