import { Button, Text, View } from "react-native"
import { style } from './style' 

const HomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
        <Text style={ style.text }>Hello World</Text>
        <Text>This is Signup Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

export default HomeScreen