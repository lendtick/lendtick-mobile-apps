import React from 'react';
import { store } from '@services/store';
import { connect } from 'react-redux';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const checkUser = this.props.personal.data;
        this.props.navigation.navigate(checkUser == null ? 'LoginUser' : 'PersonalUser');
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