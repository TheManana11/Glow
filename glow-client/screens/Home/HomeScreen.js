import { Button, Text, View } from "react-native"
import { style } from './style' 

const HomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
        <Text style={ style.text }>Hello World</Text>
        <Text>This is Home Screen</Text>
        <Button title="Go to Login" onPress={() => navigation.navigate('Signup')} />
    </View>
  )
}

export default HomeScreen