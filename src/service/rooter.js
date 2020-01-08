import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator,createSwitchNavigator } from 'react-navigation';
import { Variable } from '@styles';

// Balance
// ========================== //
import BalanceComponent from '../component/personal-attr/balance.component';
import BalanceAboutComponent from '../component/personal-attr/balance-about.component';
import PinjamanComponent from '../component/personal-attr/pinjaman.component';
import LoanComponent from '../component/personal-attr/loan.component';
import MiddleLoanComponent from '../component/personal-attr/middle-loan.component';

// Other
// ========================== //
import InitComponent from '../component/init/init.component';
import walkThroughComponent from '../component/walkthrough/walkthrough.component';
import AbotComponent from '../component/other/about.component';
import FAQComponent from '../component/other/faq.component';
import QRCodeComponent from '../component/other/qrcode.component';
import ContactComponent from '../component/other/contact.component';


// Login
// ========================== //
import LoginComponent from '../component/login/login.component';
import LoginFirstComponent from '../component/login/login-first.component';
import LoginSecondComponent from '../component/login/login-second.component';
import GantiPassComponent from '../component/login/ganti-password.component';
import Register2Component from '../component/login/register.component';
import ForgotPassComponent from '../component/login/forgot-password.component';
import ForgotPassSuccessComponent from '../component/login/forgot-pass-success.component';

const LoginUser = createStackNavigator({
    LoginUser: LoginComponent,
    LoginFirst: LoginFirstComponent,
    LoginSecond: LoginSecondComponent,    
    GantiPass: GantiPassComponent,
    Register2: Register2Component,
    forgotPass: ForgotPassComponent,
    forgotPassSuccess: ForgotPassSuccessComponent,

    Register: RegisterComponent,
    Term: TermComponent,
    Otp: OtpComponent,
    Search: SearchComponent,
    RegisterSuccess: RegisterSuccessComponent
},{
    initialRouteName: 'LoginUser',
    mode: 'modal'
});

// Payment
// ========================== //
import MainPaymentComponent from '../component/payment/main-payment.component';
import VAComponent from '../component/payment/va.component';
import MicroloanPayment from '../component/payment/microloan-payment.component';
import MiddlePayment from '../component/payment/middleloan-payment.component';
import SplitPayment from '../component/payment/split-payment.component';
import paymentFinishComponent from '../component/payment/finish.payment';

const Payment = createStackNavigator({
    Payment: MainPaymentComponent,
    VAPayment: VAComponent,
    MicroloanPayment:MicroloanPayment,
    MiddlePayment: MiddlePayment,
    SplitPayment: SplitPayment,
    FinishPayment: paymentFinishComponent
},{
    initialRouteName: 'Payment',
    mode: 'modal'
});

// Register
// ========================== //
import RegisterComponent from '../component/register/register.component';
import TermComponent from '../component/register/terms.component';
import OtpComponent from '../component/register/otp.component';
import RegisterSuccessComponent from '../component/register/register-success.component';

// Search
// ========================== //
import SearchComponent from '../component/register/search.component';


// Personal
// ========================== //
import personalComponent from '../component/personal/personal.component';
import GantiPassUserComponent from '../component/personal/ganti-pass-user.component';
import DataPersonalComponent from '../component/personal/data-personal.component';
import AddressComponent from '../component/personal/address/address.component';
import AddressDetailComponent from '../component/personal/address/address-detail.component';
import AddressFormComponent from '../component/personal/address/address-form.component';
import listHistoryOrderComponent from '../component/personal/history-order/list-history-order.component';
import detailHistoryOrderComponent from '../component/personal/history-order/detail-history-order.component';

const PersonalUser = createStackNavigator({
    PersonalUser: personalComponent,
    FAQ: FAQComponent,
    About: AbotComponent,
    Contact: ContactComponent,
    QRCode: QRCodeComponent,
    GantiPassUser: GantiPassUserComponent,
    DataPersonal: DataPersonalComponent,
    Address: AddressComponent,
    AddressDetail: AddressDetailComponent,
    AddressForm: AddressFormComponent,
    Balance: BalanceComponent,
    BalanceAbout: BalanceAboutComponent,
    Pinjaman: PinjamanComponent,
    Loan: LoanComponent,
    MiddleLoan: MiddleLoanComponent,
    ListHistoryOrder: listHistoryOrderComponent,
    DetailHistoryOrder: detailHistoryOrderComponent,
},{
    initialRouteName: 'PersonalUser',
    mode: 'modal'
});

// Home
// ========================== //
import HomeComponent from '../component/home/home.component';
import ListProductComponent from '../component/products/products-list.component';
import ProductDetailComponent from '../component/products/product-detail.component';
import ProductConfirmationComponent from '../component/products/product-confirmation.component';

const Home = createStackNavigator({
    main: HomeComponent,
    ListProduct: ListProductComponent,
    ProductDetail: ProductDetailComponent,
    ProductConfirm: ProductConfirmationComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});


// Credit
// ========================== //
import CreditComponent from '../component/credit/credit.component';
import CreditDetailComponent from '../component/credit/credit.detail.component';
import CreditTermComponent from '../component/credit/credit-term.component';
import CreditDocumentComponent from '../component/credit/credit-document.component';
import CreditCompleteComponent from '../component/credit/credit-complete.component';
import CreditFinishComponent from '../component/credit/credit-finish.component';

const Credit = createStackNavigator({
    main: CreditComponent,
    CreditDetail: CreditDetailComponent,
    CreditTerm: CreditTermComponent,
    CreditDocument: CreditDocumentComponent,
    CreditComplete: CreditCompleteComponent,
    CreditFinish: CreditFinishComponent
},{
    initialRouteName: 'main',
    mode: 'modal'
});

// Biller
// ========================== //
import BillerComponent from '../component/biller/biller.component';
import PaketDataComponent from '../component/biller/paket-data/paket-data.component';
import PulsaCompnent from '../component/biller/pulsa/pulsa.component';
import PulsaConfirmation from '../component/biller/pulsa/pulsa-confirmation.component';
import ListrikComponent from '../component/biller/listrik/listrik.component';
import PinjamanTunaiComponent from '../component/biller/pinjaman-tunai/pinjaman-tunai.component';
import PaketDataConfirmation from '../component/biller/paket-data/paket-data-confirmasi.component';
import ListrikConfirmation from '../component/biller/listrik/listrik-comfirm.component';

import BpjsComponent from '../component/biller/bpjs/bpjs.component';
import BpjsConfirmation from '../component/biller/bpjs/bpjs-confirm.component';
import AirComponent from '../component/biller/air/air.component';
import AirConfirmation from '../component/biller/air/air-confirm.component';

const Biller = createStackNavigator({
    main: BillerComponent,
    PaketData: PaketDataComponent,
    PaketDataConfirmation: PaketDataConfirmation,
    Pulsa: PulsaCompnent,
    PulsaConfirmation: PulsaConfirmation,
    Listrik: ListrikComponent,
    PinjamanTunai: PinjamanTunaiComponent,
    ListrikConfirmation: ListrikConfirmation,
    Bpjs:BpjsComponent,
    BpjsConfirmation:BpjsConfirmation,
    Air:AirComponent,
    AirConfirmation:AirConfirmation,
},{
    initialRouteName: 'main',
    mode: 'modal'
});

// Authentication
// ========================== //
import Auth from './auth';
const User = createSwitchNavigator({
    main: Auth,
    Login: LoginUser,
    Personal: PersonalUser,
},{
    initialRouteName: 'main',
});

// Set Tab Rootind
// ========================== //
const tabsRoot = createBottomTabNavigator({
    Home: Home,
    Service: Biller,
    Credit: Credit,
    User: User,    
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName){
                case "Home" :  iconName = 'home'; break;
                case "Service" :  iconName = 'appstore-o'; break;
                case "Credit" :  iconName = 'creditcard'; break;
                case "User" :  iconName = 'user'; break;
            }
            return <AntDesign name={iconName} size={20} color="#6a6a6a" />;
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
    // Login: Login,
    // Register: Register,
    Payment: Payment,
    Dashboard: {
        screen: tabsRoot,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
};