import React, { Component } from 'react';
import { ScrollView,View,StatusBar,TouchableHighlight,Text,Alert,FlatList,ActivityIndicator,SafeAreaView } from 'react-native';
import { Col,Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import { List, ListItem, SearchBar } from "react-native-elements";
import * as _ from "lodash";
// import { getUsers, contains } from "./init-search.component";
import users from "./users";
import { AntDesign } from '@expo/vector-icons';

import registerService from './register.service';
import { ButtonComponent, BlockLogo, InputCheckbox, AlertBox } from '@directives';
import { Main,Variable,Input,Typography } from '@styles';

class SearchComponent extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Search",
        headerTitleStyle: Variable.headerTitleStyle,
        headerStyle: {
            elevation:0,
            backgroundColor: '#42A9A0',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
    });

    constructor(props) {
        super(props);
        // this.state = { 
        //     isSubmit: false,
        //     checked: false,
        //     isFailed: false,
        //     message: null
        // };

        this.state = {
            loading: false,
            data: [],
            error: null,
            query: "",
            fullData: [],
          };
    }

    componentDidMount(){
        this.fetchListCompany();
        this.makeRemoteRequest();
    }
    
    fetchListCompany(){
        this.setState({ arrCompany: []});
        registerService.getListCompany().then(res =>{
            _.map(res['data'],(x)=>{
                let obj = {value: x.id_company, label: x.name_company};
                this.state.arrCompany.push(obj);
            });
            this.setState({
                arrCompany: this.state.arrCompany
            })
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchListCompany()}],
                {cancelable: false},
            );
        })
    }

    contains = (arr, query) => {
        const { label } = arr;
        if (label.includes(query)) {
            console.log('data');
            return true;
        }
        return false;
    }

    getUsers = (limit = 20, query = "") => {

        return new Promise((resolve, reject) => {
            if (query.length === 0) {
                // console.log('comp ==>',_.take(this.state.arrCompany, limit));
                resolve(_.take(this.state.arrCompany, limit));
            } else {
                const formattedQuery = this.state.arrCompany.toUpperCase();
                const results = _.filter(this.state.arrCompany, comp => {
                    return this.contains(comp, formattedQuery);
                });
                resolve(_.take(results, limit));
            }
        });
    };

    makeRemoteRequest = _.debounce(() => {
        this.setState({ loading: true });
        // console.log(this.getUsers());
        this.getUsers(20, this.state.query)
          .then(companies => {
            this.setState({
              loading: false,
              data: companies,
              fullData: companies
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
        //   console.log('user ==>',companies);
      }, 250);
    
    handleSearch = text => {
        const formattedQuery = text.toUpperCase();
        const data = _.filter(this.state.arrCompany, user => {
            return this.contains(user, formattedQuery);
        });
        console.log(data);
        this.setState({ data, query: text }, () => this.makeRemoteRequest());
    };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    
	renderHeader = () => {
	return (
		<SearchBar
		placeholder="Type Here..."
		lightTheme
		round
		onChangeText={this.handleSearch}
		/>
	);
	};

	renderFooter = () => {
		if (!this.state.loading) return null;

		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: "#CED0CE"
				}}
			>
			<ActivityIndicator animating size="large" />
			</View>
		);
	};

	renderItem = ({item}) => {
		return(
			<ListItem
				title={item.label}
			/>
		);
	}
    
    render() {
        return (
            // <View style={{height:'100%',backgroundColor:'white'}}>
                // <SafeAreaView>
                    // <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.value}
                        // ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        // ListFooterComponent={this.renderFooter}
                    />
                    // </List>
                // </SafeAreaView>
            // {/* </View> */}

        );
    }
}

// const mapStateToProps = (state) => {
// 	return {
// 		register: state.register
// 	}
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setRegister: (e) => {
// 			dispatch({
// 				type: 'FILL_REGISTER',
// 				data: e
// 			})
//         },
// 	}
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(SearchComponent)

const mapStateToProps = (state) => {
	return {
		register: state.register
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setRegister: (e) => {
			dispatch({
				type: 'FILL_REGISTER',
				data: e
			})
        },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchComponent)