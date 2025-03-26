import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import {Button} from "@react-navigation/elements";
import * as React from "react";

function EinkaufsZettelScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>EinkaufsZettel grgrgScreen</Text>
            <Button onPress={() => navigation.navigate('Home')}>
                Home
            </Button>
        </View>
    );
}
export default EinkaufsZettelScreen;