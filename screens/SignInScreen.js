import React from "react";
import { View, Text, Image, StyleSheet, Alert, Animated } from "react-native";
import { Input, Button, Logo, Heading, BackgroundWrapper, AlertStatus, TextFont } from "../components/uiComponents";
import { getPlatformValue } from "../components/utils";
import Icon from "react-native-vector-icons/FontAwesome";
export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Kryptonite"
  };

  state = {
    username: "",
    password: "",
    animation: {
      usernamePostionLeft: new Animated.Value(795),
      passwordPositionLeft: new Animated.Value(905),
      loginPositionTop: new Animated.Value(1402),
      statusPositionTop: new Animated.Value(1542)
    }
  };

  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text
    });
  }

  handePressSignIn() {
    Alert.alert("Button pressed", "User sign in");
  }

  handlePressSignUp() {
    //this.props.navigation.navigate("SignUp");
    Alert.alert("Button pressed", "User sign up");
    this.props.navigation.navigate("SignUp");
  }

  componentDidMount() {
    const timing = Animated.timing;
    Animated.parallel([
      timing(this.state.animation.usernamePostionLeft, {
        toValue: 0,
        duration: 700
      }),
      timing(this.state.animation.passwordPositionLeft, {
        toValue: 0,
        duration: 900
      }),
      timing(this.state.animation.loginPositionTop, {
        toValue: 0,
        duration: 700
      }),
      timing(this.state.animation.statusPositionTop, {
        toValue: 0,
        duration: 700
      })
    ]).start();
  }

  render() {
    return (
      <BackgroundWrapper>
        <View style={loginStyle.loginContainer}>
          <Logo />
          <Heading marginTop={16} color="#ffffff" textAlign="center">
            {"Kryptonite"}
          </Heading>
          <View style={loginStyle.formContainer}>
            <Animated.View
      style={{
        position: "relative",
        left: this.state.animation.usernamePostionLeft
      }}
      >
              <Input
      label="Username"
      icon={<Icon name="user" />}
      value={this.state.username}
      onChange={this.handleChangeInput.bind(this, "username")}
      />
            </Animated.View>
            <Animated.View
      style={{
        position: "relative",
        left: this.state.animation.passwordPositionLeft
      }}
      >
              <Input
      label="Password"
      icon={<Icon name="key" />}
      value={this.state.password}
      marginTop={23}
      onChange={this.handleChangeInput.bind(this, "password")}
      secureTextEntry
      />
            </Animated.View>
            <Animated.View
      style={{
        position: "relative",
        top: this.state.animation.loginPositionTop
      }}
      >
              <Button marginTop={60} onPress={this.handePressSignIn.bind(this)}>
                Sign in
              </Button>
            </Animated.View>
            <Animated.View
      style={{
        alignItems: "center",
        marginTop: 20
      }}
      >
              <Text
      style={{
        color: "#ffffff",
        fontSize: 16,
        textDecorationLine: "underline"
      }}
      onPress={this.handlePressSignUp.bind(this)}
      >
                {"Don't have account? Sign up here!"}
              </Text>
            </Animated.View>
          </View>
        </View>
        <Animated.View
      style={{
        position: "relative",
        top: this.state.animation.statusPositionTop
      }}
      >
          <AlertStatus
      textHelper="Don't have account"
      textAction="Sign up"
      onPressAction={this.handlePressSignUp.bind(this)}
      />
        </Animated.View>
      </BackgroundWrapper>
      );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

const loginStyle = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 49
  },
  formContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: getPlatformValue("android", 25, 45)
  }
});
