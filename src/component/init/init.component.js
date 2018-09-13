import React from 'react';

class InitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount(){
        this.props.navigation.navigate('Walkthrough');
    }
    render() { return(null) }
}


export default InitComponent;