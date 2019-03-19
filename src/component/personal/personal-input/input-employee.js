import React from 'react';
import { View } from 'react-native';
import { InputComponent,ButtonComponent } from '@directives';

class InputEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() { 
        return(
            <View>
                <InputComponent 
                    label="NIK"
                    iconName={null}
                    keyboardType="numeric"
                    placeholder="Masukan nomor NRP"
                    value={this.state.nrp}
                    onChange={(nrp) => this.setState({nrp})}/>

                <InputComponent 
                    label="Nama Perusahaan"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan nama perusahaan"
                    value={this.state.selectedCompany != null ? this.state.selectedCompany.label: null}
                    onChange={(company) => this.setState({company})}
                    isButton={true}
                    onClickBtn={()=> this.setState({openPopupCompany: true})}/>   

                <InputComponent 
                    label="Tanggal Masuk"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Masukan tanggal masuk"
                    value={this.state.joinDate}
                    onChange={(joinDate) => this.setState({joinDate})}/>  

                <InputComponent 
                    label="Divisi"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Divisi"
                    value='IT'
                    onChange={(division) => this.setState({division})}/>  

                <InputComponent 
                    label="Jabatan"
                    iconName={null}
                    keyboardType="default"
                    placeholder="Jabatan"
                    value='Senopati'
                    onChange={(jabatan) => this.setState({jabatan})}/>    

                <ButtonComponent type="primary" text="Update data pegawai" onClick={()=>console.log('ok')} disabled={false} isSubmit={false}/>
            </View>
        )
    }
}

export default InputEmployee;