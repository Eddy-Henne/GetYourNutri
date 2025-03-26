import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import {Button} from "@react-navigation/elements";
import * as React from "react";

function EinkaufenScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Einkaufen Screen</Text>
            <Button onPress={() => navigation.navigate('EinkaufsZettel')}>
                Einkaufszettel
            </Button>
            <Button onPress={() => navigation.navigate('Home')}>
                Home
            </Button>
        </View>
    );
}
export default EinkaufenScreen;