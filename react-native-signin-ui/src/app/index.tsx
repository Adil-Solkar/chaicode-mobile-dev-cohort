import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <Image
          source={require("@/assets/images/telecarelogo.webp")}
          style={{
            width: 50,
            height: 40,
            marginBottom: 10,
          }}
        />

        <Text style={styles.h1}>Sign In</Text>
        <Text>Lets's experience the joy of telecare AI.</Text>
      </View>

      {/* form */}

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter your email..."
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          style={[styles.input, isEmailFocused && styles.inputFocused]}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password..."
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          style={[styles.input, isPasswordFocused && styles.inputFocused]}
        />

        {/* Pressable onPress prop will handle sign in */}
        <Pressable style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>Sign In</Text>
          <FontAwesome6 name="arrow-right-long" size={20} color="white" />
        </Pressable>
      </KeyboardAvoidingView>

      {/* social links */}
      <View style={styles.socialLinksContainer}>
        <View style={styles.socialLink}>
          <EvilIcons name="sc-facebook" size={28} color="black" />
        </View>

        <View style={styles.socialLink}>
          <AntDesign name="google" size={24} color="black" />
        </View>

        <View style={styles.socialLink}>
          <Entypo name="instagram" size={24} color="black" />
        </View>
      </View>

      <View>
        <Text>
          Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
        <Text style={styles.linkText}>Forgot your password</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    display: "flex",
    alignItems: "center",
  },

  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },

  formContainer: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 50,
  },

  label: {
    paddingLeft: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderColor: "#333",
    borderWidth: 1,
    width: "90%",
    borderRadius: 15,
  },

  inputFocused: {
    borderColor: "#32CD32",
  },

  signInBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#32CD32",
  },

  signInBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  socialLinksContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  socialLink: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },

  linkText: {
    color: "#32CD32",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
