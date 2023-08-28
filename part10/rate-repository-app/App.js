import { ApolloProvider } from '@apollo/client';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apollo';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

// http://192.168.1.13:5000/api/repositories

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;