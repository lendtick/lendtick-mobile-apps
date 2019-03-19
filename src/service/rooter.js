import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Variable } from '@styles';

// Register
// ========================== //
import RegisterComponent from '../component/register/register.component';
import TermComponent from '../component/register/terms.component';
import OtpComponent from '../component/register/otp.component';
import RegisterSuccessComponent from '../component/register/register-success.component';

// Login
// ========================== //
import LoginComponent from '../component/login/login.component';
import LoginFirstComponent from '../component/login/login-first.component';
import LoginSecondComponent from '../component/login/login-second.component';
import GantiPassComponent from '../component/login/ganti-password.component';
import Register2Component from '../component/login/register.component';
import ForgotPassComponent from '../component/login/forgot-password.component';
import ForgotPassSuccessComponent from '../component/login/forgot-pass-success.component';

// Personal
// ========================== //
import personalComponent from '../component/personal/personal.component';
import GantiPassUserComponent from '../component/personal/ganti-pass-user.component';
import DataPersonalComponent from '../component/personal/data-personal.component';
import AddressComponent from '../component/personal/address/address.component';
import AddressDetailComponent from '../component/personal/address/address-detail.component';
import AddressFormComponent from '../component/personal/address/address-form.component';

// Balance
// ========================== //
import BalanceComponent from '../component/personal-attr/balance.component';
import BalanceAboutComponent from '../component/personal-attr/balance-about.component';
import PinjamanComponent from '../component/personal-attr/pinjaman.component';
import NonMicroloanComponent from '../component/personal-attr/non-microloan.component';
import MicroloanComponent from '../component/personal-attr/microloan.component';

// Credit
// ========================== //
import CreditComponent from '../component/credit/credit.component';
import CreditDetailComponent from '../component/credit/credit.detail.component';

// Services
// ========================== //
import ServiceComponent from '../component/service/service.component';
import PaketDataComponent from '../component/service/paket-data/paket-data.component';
import PulsaCompnent from '../component/service/pulsa/pulsa.component';
import PulsaConfirmation from '../component/service/pulsa/pulsa-confirmation.component';
import ListrikComponent from '../component/service/listrik/listrik.component';
import PinjamanTunaiComponent from '../component/service/pinjaman-tunai/pinjaman-tunai.component';
import PaketDataConfirmation from '../component/service/paket-data/paket-data-confirmasi.component';

// Home
// ========================== //
import HomeComponent from '../component/home/home.component';
import ListProductComponent from '../component/products/products-list.component';
import ProductDetailComponent from '../component/products/product-detail.component';
import ProductConfirmationComponent from '../component/products/product-confirmation.component';

// Other
// ========================== //
import InitComponent from '../component/init/init.component';
import walkThroughComponent from '../component/walkthrough/walkthrough.component';
import AbotComponent from '../component/other/about.component';
import FAQComponent from '../component/other/faq.component';
import QRCodeComponent from '../component/other/qrcode.component';

const Login = createStackNavigator({
    Login: LoginComponent,
    LoginFirst: LoginFirstComponent,
    LoginSecond: LoginSecondComponent,    
    GantiPass: GantiPassComponent,
    Register2: Register2Component,
    forgotPass: ForgotPassComponent,
    forgotPassSuccess: ForgotPassSuccessComponent,
},{
    initialRouteName: 'Login',
    mode: 'modal'
});

const Register = createStackNavigator({
    Register: RegisterComponent,
    Term: TermComponent,
    Otp: OtpComponent,
    RegisterSuccess: RegisterSuccessComponent
},{
    initialRouteName: 'Register',
    mode: 'modal'
});

const Personal = createStackNavigator({
    main: personalComponent,
    FAQ: FAQComponent,
    About: AbotComponent,
    QRCode: QRCodeComponent,
    GantiPassUser: GantiPassUserComponent,
    DataPersonal: DataPersonalComponent,
    Address: AddressComponent,
    AddressDetail: AddressDetailComponent,
    AddressForm: AddressFormComponent,
    Balance: BalanceComponent,
    BalanceAbout: BalanceAboutComponent,
    Pinjaman: PinjamanComponent,
    NonMicroloan: NonMicroloanComponent,
    Microloan: MicroloanComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});

const Home = createStackNavigator({
    main: HomeComponent,
    ListProduct: ListProductComponent,
    ProductDetail: ProductDetailComponent,
    ProductConfirm: ProductConfirmationComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});

const Credit = createStackNavigator({
    main: CreditComponent,
    CreditDetail: CreditDetailComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});

const Service = createStackNavigator({
    main: ServiceComponent,
    PaketData: PaketDataComponent,
    PaketDataConfirmation: PaketDataConfirmation,
    Pulsa: PulsaCompnent,
    PulsaConfirmation: PulsaConfirmation,
    Listrik: ListrikComponent,
    PinjamanTunai: PinjamanTunaiComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});

// Set Tab Rootind
// ========================== //
const tabsRoot = createBottomTabNavigator({
    Home: Home,
    Service: Service,
    Credit: Credit,
    User: Personal,    
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName){
                case "Home" :  iconName = 'home'; break;
                case "Service" :  iconName = 'grid'; break;
                case "Credit" :  iconName = 'credit-card'; break;
                case "User" :  iconName = 'user'; break;
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
            fontFamily: Variable.fontMedium,
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
  
export const rooter = {
    Init: InitComponent,
    Walkthrough: walkThroughComponent,
    Login: Login,
    Register: Register,
    Dashboard: {
        screen: tabsRoot,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
};