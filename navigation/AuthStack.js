import Reacht from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createStackNavigator } from "react-navigation";

export default createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});
