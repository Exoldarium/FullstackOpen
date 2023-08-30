import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useContext';

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_USER);

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to='/'>
            <Text style={styles.menuDiv}>Repositories</Text>
          </Link>
          {data?.me ?
            <>
              <Link to='/createReview'>
                <Text style={styles.menuDiv}>Create review</Text>
              </Link>
              <Text style={styles.menuDiv} onPress={signOut}>Sign out</Text>
            </>
            :
            <>
              <Link to='/signin'>
                <Text style={styles.menuDiv}>Sign in</Text>
              </Link>
              <Link to='/signup'>
                <Text style={styles.menuDiv}>Sign up</Text>
              </Link>
            </>
          }
        </ScrollView>
      </View>
    </Pressable >
  )
};

export default AppBar;