import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { store } from './store';
import { Variable } from '../styles/index';

// Import Component
// ========================== //
import InitComponent from '../component/init/init.component';

import walkThroughComponent from '../component/walkthrough/walkthrough.component';
import HomeComponent from '../component/home/home.component';

import LoginComponent from '../component/login/login.component';
import ForgotPasswordComponent from '../component/login/forgotpassword.component';
import SignupComponent from '../component/login/signup.component';

import CreaditComponent from '../component/creadit/creadit.component';
import CreditHistoryComponent from '../component/creadit/credit-history.component';
import CreditHistoryDetail from '../component/creadit/credit-history-detail.component';

import ServiceComponent from '../component/service/service.component';
import PaketDataComponent from '../component/service/paket-data/paket-data.component';
import PulsaCompnent from '../component/service/pulsa/pulsa.component';
import ListrikComponent from '../component/service/listrik/listrik.component';
import PinjamanTunaiComponent from '../component/service/pinjaman-tunai/pinjaman-tunai.component';

import PaketDataConfirmation from '../component/service/paket-data/paket-data-confirmasi.component';

import InitProfile from '../component/profile/init.profile';
import ProfileComponent from '../component/profile/profile.component';
import ProfileInfo from '../component/profile/profile-info.component';
import ProfileEditComponent from '../component/profile/profile-edit.component';

import AboutComponent from '../component/profile/about.component';
import AddressComponent from '../component/profile/address/address.component';
import AddressDetailComponent from '../component/profile/address/address-detail.component';
import AddressFormComponent from '../component/profile/address/address-form.component';
import ContactComponent from '../component/profile/contact.component'
import ChangePassComponent from '../component/profile/change-password.component';

import ListProductComponent from '../component/products/products-list.component';
import ProductDetailComponent from '../component/products/product-detail.component';
import ProductConfirmationComponent from '../component/products/product-confirmation.component';

import CartComponent from '../component/shop/cart.component';
import CheckoutComponent from '../component/shop/checkout.component';
import CheckoutSuccessComponent from '../component/shop/checkout-success.component';

// Create Child Page
// ========================== //
const Home = createStackNavigator({
    Main: HomeComponent,
    ListProduct: ListProductComponent,
    ProductDetail: ProductDetailComponent,
    ProductConfirm: ProductConfirmationComponent
},{
    initialRouteName: 'Main',
    mode: 'modal'
});

const Service = createStackNavigator({
    Main: ServiceComponent,
    PaketData: PaketDataComponent,
    PaketDataConfirmation: PaketDataConfirmation,
    Pulsa: PulsaCompnent,
    Listrik: ListrikComponent,
    PinjamanTunai: PinjamanTunaiComponent
},{
    initialRouteName: 'Main',
    mode: 'modal'
});

const Credit = createStackNavigator({
    Main: CreaditComponent,
    CreditHistory: CreditHistoryComponent,
    CreditHistoryDetail: CreditHistoryDetail
},{
    initialRouteName: 'Main',
    mode: 'modal'
});

const Shop = createStackNavigator({
    Main: CartComponent,
    Checkout: CheckoutComponent,
    CheckoutSuccess: CheckoutSuccessComponent
},{
    initialRouteName: 'Main',
    mode: 'modal',
});

const Profile = createStackNavigator({
    Main: InitProfile,
    MainProfile: ProfileComponent,
    ProfileInfo: ProfileInfo,
    About: AboutComponent,
    Contact: ContactComponent,
    Address: AddressComponent,
    AddressDetail: AddressDetailComponent,
    AddressForm: AddressFormComponent,
    ChangePass: ChangePassComponent,
    ProfileEdit: ProfileEditComponent,

    Login: LoginComponent,
    ForgotPass: ForgotPasswordComponent,
    Signup: SignupComponent
},{
    initialRouteName: 'Main',
    mode: 'modal'
});

// Set Tab Rootind
// ========================== //
const tabsRoot = createBottomTabNavigator({
    Home: Home,
    Service: Service,
    Credit: Credit,
    Profile: Profile,    
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName){
                case "Home" :  iconName = 'home'; break;
                case "Service" :  iconName = 'grid'; break;
                case "Credit" :  iconName = 'credit-card'; break;
                case "Profile" :  iconName = 'user'; break;
            }
            return <Feather name={iconName} size={20} color="#6a6a6a" />;
        },
        tabBarPosition: 'top'
    }),
    tabBarOptions: {
        activeTintColor: Variable.colorPrimary,
        inactiveTintColor: Variable.colorContent,
        labelStyle: {
            fontSize: Variable.fontSize,
            marginBottom: 12,
            marginTop: -12
        },
        style: {
            height: 70,
            borderTopColor: '#dfdfdf',
            borderBottomWidth: 1,
            borderColor: '#dfdfdf',
            backgroundColor: '#fff'
        }
    }
});

// Set Rooting
// ========================== //
export const rooter = {
    Init: InitComponent,
    Walkthrough: walkThroughComponent,
    Shop: Shop,
    Dashboard: {
        screen: tabsRoot,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
};