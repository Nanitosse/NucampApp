// import { useState } from "react";
// import {CAMPSITES} from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import { Platform, View  } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import CampsiteInfoScreen from './CampsiteInfoScreen';



const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#5637DD'
                },
                headerTinColor: '#fff'

            }}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Diorectory' }}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({route}) => ({
                    title: route.params.campsite.name

                })}
            />



        </Stack.Navigator>
    )
}


const Main = () => {
    // const [camp, setCampsites] = useState(CAMPSITES);
    return (
        <View style={{ flex: 1, paddingTop:Platform.OS==='ios'? 0 :Constants.StatusBarHeight }}>
            <DirectoryNavigator /> 
        </View>
    );

}

export default Main;