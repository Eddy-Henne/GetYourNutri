import {useNavigation} from "@react-navigation/native";
import {Text, TextInput, View} from "react-native";
import {Button} from "@react-navigation/elements";
import * as React from "react";

function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            {}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <TextInput
                placeholder={"Username"}
                style={{height: 40, borderColor: 'gray', width: 80}}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder={"Password"}
                style={{height: 40, borderColor: 'gray', width: 80}}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button
                onPress={() => {
                    handleLogin(username, password);
                }}>
                Login
            </Button>
            <Button
                onPress={() => {
                    navigation.navigate('Home', {post1: username, post2: password});
                }}>
                Home
            </Button>
        </View>
    );

    async function handleLogin(username: string, password: string) {
        if (!username || !password) {
            setError("Username und Password sind erforderlich.");
            return;
        }
        try {
            const base64Credentials = btoa(`${username}:${password}`);
            const authHeader = new Headers();
            authHeader.append("Authorization", `Basic ${base64Credentials}`);

            const loginRequest = new Request("http://10.0.2.2:8080/api/users/login", {
                method: "POST",
                headers: authHeader,
            });

            const loginResponse = await fetch(loginRequest);

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                setError(errorData.message || "Fehler beim Login.");
                return;
            }

            const meRequest = new Request("http://10.0.2.2:8080/api/users/me", {
                method: "GET",
                headers: authHeader,
            });

            const meResponse = await fetch(meRequest);
            if (!meResponse.ok) {
                const errorData = await meResponse.json();
                setError(errorData.message || "Fehler beim Abrufen der Benutzerdaten.");
                return;
            }

            const meData = await meResponse.json();
            navigation.navigate('Home', { post3: meData.id, post4: meData.username });
            /*
            else {
                const responseData = await loginRequest.json();
                console.log("Login erfolgreich", responseData);
                navigation.navigate('Home');

             */
            }
         catch (error) {
            console.error("Fehler beim Login", error);
            setError("Es gab ein Problem mit der Anfrage.");
        }
    }

}
export default LoginScreen;


/*
const authHeader = new Headers();
authHeader.append("Content-Type", "application/json");

const authRequest = new Request("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: authHeader,
});

const response = await fetch(authRequest);

 */