import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Platform, TouchableHighlight} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Typography, Input } from '@styles';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Variable } from '../styles/variable';

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

// Reducer
// ======================= //
export const inputReducer = (state = {
    isFocus: false,
    arrDate:[],
}, action) => {
	switch (action.type) {
		case 'ON_FOCUS':
			state = {
                ...state,
                isFocus: action.value
            }
        break;
        case 'UPDATE_DATE' :
            state = {
                ...state,
                arrDate: action.arrDate
            }
        break;
	}
	return state;
}

class InputAutocomplete extends Component {

    // static renderFilm(film) {
    //     const { title, director, opening_crawl, episode_id } = film;
    //     const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;
    
    //     return (
    //         <View>
    //             <Text style={styles.titleText}>{roman}. {title}</Text>
    //             <Text style={styles.directorText}>({director})</Text>
    //             <Text style={styles.openingText}>{opening_crawl}</Text>
    //         </View>
    //     );
    // }

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            query: '',
            // query: this.props.onChange,
            companies:[],
            propCompany : this.props.onChange,
            nameComp: ''
        };
    }

    componentDidMount() {
        // fetch(`${API}/films/`).then(res => res.json()).then((json) => {
        //     const { results: films } = json;
        //     this.setState({ films });
        // });
        this.fetchListCompany();
    }
    
    fetchListCompany(){
        // this.setState({ arrCompany: []});
        // registerService.getListCompany().then( res => res.json()).then((json) => {
        //     const { data: companies} = json;
        //     console.log(json);
        //     this.setState({ companies });
        // });
        registerService.getListCompany().then(res =>{
            // console.log(res['data']);
            _.map(res['data'],(x)=>{
                // let obj = {value: x.id_company, label: x.name_company};
                let obj = res['data'];
                // this.state.companies.push(obj);
                this.setState({
                    companies: obj
                })
            });
            // this.setState({
            //     companies: this.state.companies
            // })
        }, err =>{
            Alert.alert(
                'Error',
                'Pastikan koneksi tersambung, silakan coba lagi',
                [{text: 'OK', onPress: () => this.fetchListCompany()}],
                {cancelable: false},
            );
        })
    }

    findFilm(query) {
        if (query === '') {
            return [];
        }

        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.title.search(regex) >= 0);
    }

    findCompanies(query) {
        if (query === '') {
            return [];
        }

        const { companies } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        data = companies.filter(company => company.name_company.search(regex) >= 0);
        // console.log(data);
        return data;
    }

    _handleChangeText = ({ nativeEvent: { text } }) => {
        this.setState({ query: text });
    };

    render() {
        const { query } = this.state;
        // const films = this.findFilm(query);
        const companies = this.findCompanies(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={{position:'relative'}}>
                <View style={[Input.wrapInput,{backgroundColor:this.props.disabled ? '#f8f8ff' : '#ffffff'}]}>
                    {this.props.label != null ? <Text style={Typography.label}>{this.props.label}</Text> : null}
                    {this.props.showIcon ? 
                        <TouchableHighlight onPress={this.props.onClickIcon} underlayColor="transparent" style={this.props.label != null ? [Input.icon,{top: 10}] : [Input.icon,{top:8 + this.props.topIcon}]}>
                            <AntDesign name={this.props.iconName} size={18} color={this.props.iconColor}/>
                        </TouchableHighlight> : null}
                        <Autocomplete
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.inputText}
                            data={companies.length === 1 && comp(query, companies[0].name_company) ? [] : companies}
                            defaultValue={query}
                            // onChangeText={ text => this.setState({ query: text }) }
                            onChange={ this._handleChangeText }
                            value={this.props.value}
                            placeholder={this.props.placeholder}
                            renderItem={({ name_company, id_company }) => (
                                <TouchableOpacity onPress={() => this.setState({ query: name_company })}>
                                    <Text style={styles.itemText}>
                                        {/* {title} ({release_date.split('-')[0]}) */}
                                        {name_company}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        {this.props.isButton ? <TouchableHighlight style={Input.highlight} onPress={this.props.onClickBtn} underlayColor="transparent"><Text></Text></TouchableHighlight> : null}
                </View>
                {/* <View style={styles.descriptionContainer}>
                {films.length > 0 ? (
                    AutocompleteExample.renderFilm(films[0])
                ) : (
                    <Text style={styles.infoText}>
                    Enter Title of a Star Wars movie
                    </Text>
                )}
                </View> */}
                {this.props.disabled ? <View style={{position:'absolute',left:0,top:0,width:'100%',height: '100%', opacity:0.5,backgroundColor:'#ffffff'}} /> : null}
            </View>
        );
    }
}

InputAutocomplete.propTypes = {
    label: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    showIcon: PropTypes.bool,
    topIcon: PropTypes.number,
    disabled: PropTypes.bool,
    data:PropTypes.array,
};

InputAutocomplete.defaultProps = {
    label: 'Label Name',
    iconName: 'user',
    iconColor: '#b6c4e4',
    placeholder: 'Placeholder Name',
    value: null,
    showIcon: true,
    topIcon: 0,
    disabled: false,
    data:[]
}

const mapStateToProps = (state) => {
	return {
		input: state.input
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onFocus: (event) => {
			dispatch({
				type: 'ON_FOCUS',
				value: event
			})
        },
        onChangeDate: (arrDate) =>{
            dispatch({
				type: 'UPDATE_DATE',
				arrDate: arrDate
			})
        }
	}
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 25
    },
    inputText: {
        // fontSize: Variable.fontSize,
        borderRadius: Variable.borderRadius,
        // color: Variable.colorContent,
        width: '100%',
        paddingTop: 5,
        position: 'relative',
        zIndex: 1,
    },
    itemText: {
      fontSize: 15,
      margin: 2
    },
    descriptionContainer: {
      // `backgroundColor` needs to be set otherwise the
      // autocomplete input will disappear on text input.
      backgroundColor: '#F5FCFF',
      marginTop: 8
    },
    infoText: {
      textAlign: 'center'
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center'
    },
    directorText: {
      color: 'grey',
      fontSize: 12,
      marginBottom: 10,
      textAlign: 'center'
    },
    openingText: {
      textAlign: 'center'
    }
  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputAutocomplete);
// export default InputAutocomplete;