import React from 'react';
import { View,Text,Image,ActivityIndicator } from 'react-native';
import { Col,Row,Grid } from "react-native-easy-grid";
import Feather from 'react-native-vector-icons/Feather';
import { Typography, Variable } from '../../styles/index';
import { styles } from './profile.style';

import profileService from './profile-service';

class ProfileUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true
        };
    }

    componentWillMount() {
        this.fetchInfoUser();   
    }

    fetchInfoUser(){
        profileService.getInfoUser().then(res =>{
            this.setState(res.data[0]);
            this.setState({isloading: false});
        }, err =>{
            this.fetchInfoUser();
        })
    }

    render() {
        return (
            <View>
                {this.state.isloading ? 
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="small" color="#6a6a6a" />
                    </View>
                :
                    <Grid>
                        <Col style={{width:100}}>
                            <Image style={styles.userImage} source={require("../../../assets/profile/user.jpg")} />
                        </Col>
                        <Col>
                            <View style={styles.userDesc}>
                                <Text style={styles.name}>{this.state.name}</Text>
                                <Grid>
                                    <Row style={{marginBottom:5}}>
                                        <Col style={{width:30}}>
                                            <Feather name="map-pin" size={20} color="#ed2a34" />
                                        </Col>
                                        <Col><Text style={Typography.singleText}>{this.state.domicile_address}</Text></Col>
                                    </Row>
                                </Grid>
                            </View>
                        </Col>
                    </Grid>
                }
            </View>
        );
    }
}

export default ProfileUser;