import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    height: 100,
    // display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuDiv: {
    margin: 20,
    color: 'white'
  }
  // ...
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to='/'>
            <Text style={styles.menuDiv}>Repositories</Text>
          </Link>
          <Link to='/signin'>
            <Text style={styles.menuDiv}>Sign in</Text>
          </Link>
        </ScrollView>
      </View>
    </Pressable >
  )
};

export default AppBar;