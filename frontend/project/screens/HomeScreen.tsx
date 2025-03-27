import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {Text, View} from "react-native";
import {Button} from "@react-navigation/elements";


function HomeScreen({route}) {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                onPress={() => navigation.navigate('Einkaufen')}
            >Einkaufen
            </Button>
            <Button
                onPress={() => navigation.navigate('Login')}
            >Go to Login
            </Button>
            <Text style={{ margin: 10 }}>Post: {route.params?.post1}</Text>
            <Text style={{ margin: 10 }}>Post: {route.params?.post2}</Text>
            <Text style={{ margin: 10 }}>Post: {route.params?.post3}</Text>
            <Text style={{ margin: 10 }}>Post: {route.params?.post4}</Text>

        </View>
    );
}
export default HomeScreen;




















/*
function HomeScreen({route}: {route: any}) {
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = React.useState(false);


    //let loggedIn = false;



    return (
        loggedIn ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Home Screen</Text>
                    <Button
                        onPress={() => {
                            navigation.navigate('Details');
                        }}
                    >
                        Go to Details
                    </Button>
                </View>
            ) :
            navigation.navigate('Login', {transLogged: loggedIn})
    );


}

 */