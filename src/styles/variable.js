import { Platform } from 'react-native';
export const Variable = {
    colorTitle: "#3a3a3a",
    colorContent: "#6a6a6a",
    ontFamily: "Roboto",
    colorPrimary: '#b6d35b',
    colorPrimary2: '#e9f7db',
    colorPrimaryText: '#77ae42',
    borderRadius: 4,
    borderRadiusCircle: 23,
    fontSize: 14,
    boxShadow: {
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: "#cfcfcf",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
            }
        }),
    }
};