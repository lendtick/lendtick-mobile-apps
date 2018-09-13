import React from 'react';
import { View,ActivityIndicator,StyleSheet,AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import { store } from '../../service/store';

class InitProfile extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Profile",
        headerStyle: {
            backgroundColor: '#fff',
            overflow: 'hidden',
        },
        headerTintColor: '#3a3a3a',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#3a3a3a',
            letterSpacing: .5,
            width: Dimensions.get('window').width - 35,
            textAlign: 'center'
        },
        headerLeft: null,
        headerRight: null,
    });

    constructor(props) {
        super(props);
        this.state = {};

        store.subscribe(() => {
            let obj = store.getState().login;
            console.log(obj.isLogin);
            if(obj.isLogin){
                this.props.navigation.replace("MainProfile");
            }else{
                this.props.navigation.replace("Login");
            }
        });
    }

    componentWillMount(){
        AsyncStorage.getItem('token').then((result)=>{
            if(result != null){
                this.props.navigation.replace("MainProfile");
            }else{
                this.props.navigation.replace("Login");
            }
        });
    }

    render() { return(
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#6a6a6a" />
        </View>
    ) }
}

const styles = StyleSheet.create ({
    container: {
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#ffffff',
       height: '100%'
    },
 })


export default InitProfile;
