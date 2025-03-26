import {useNavigation} from "@react-navigation/native";
import {Text, TextInput, View} from "react-native";
import {Button} from "@react-navigation/elements";
import * as React from "react";

function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', width: 80}}
                placeholder={"Username"}
            />
            <TextInput
                style={{height: 40, borderColor: 'gray', width: 80}}
                placeholder={"Password"}
            />
            <Button
                onPress={() => {
                    navigation.navigate('Home')}
                }>
                Home
            </Button>
        </View>
    );
}
export default LoginScreen;