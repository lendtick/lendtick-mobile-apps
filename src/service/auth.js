import React from 'react';
import { AsyncStorage } from 'react-native';
import { store } from '@services/store';
import { connect } from 'react-redux';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        AsyncStorage.getItem('token').then((token)=>{
            this.props.navigation.navigate(token == null ? 'LoginUser' : 'PersonalUser');
        });
    };

    render() { return null; }
}

const mapStateToProps = (state) => {
	return {
        personal: state.personal
	}
}
const mapDispatchToProps = (dispatch) => {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth)