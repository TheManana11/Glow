import { Button, Text, View } from "react-native"
import { style } from './style' 

const HomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
        <Text style={ style.text }>Hello World</Text>
        <Text>This is Login Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  )
}

export default HomeScreen