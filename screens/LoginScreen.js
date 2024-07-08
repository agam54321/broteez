import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput,KeyboardAvoidingView  } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import Logo from "../assets/main-logo.png";
// import { } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", justifyContent:"center", alignItems: "center"}}
    >
      <View>
        <Image
          source={Logo}
          style={{ width: 200, height: 100, resizeMode: "contain" }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 12,
              color: "041E42",
            }}
          >
            Aapka swagat hai! Login karein.
          </Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#edf2f7",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                height: 25,
                width: 300,
                marginLeft: 16,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#edf2f7",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: password ? 16 : 16,
                color: "gray",
                marginVertical: 10,
                height: 25,
                width: 300,
                marginLeft: 16,
              }}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <View style={{marginTop:12, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <Text>
            Keep me logged in
          </Text>

          <Text style={{color:"#007FFF", fontWeight:500}}>Forgot Password</Text>
        </View>

        <View style={{marginTop:70}}/>
              <Pressable style={{width:350, backgroundColor:"#febf00", borderRadius:6, padding:15, marginLeft:"auto", marginRight:"auto" }}>
                <Text style={{textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Login</Text>
              </Pressable>

              <Pressable onPress={()=> navigation.navigate("Register")} style={{marginTop:15}}>
                <Text style={{textAlign:"center", color:"gray", fontSize:15}}>Don't have an account? Sign Up</Text>
              </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
