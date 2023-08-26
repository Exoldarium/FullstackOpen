import { ApolloProvider } from '@apollo/client';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

import createApolloClient from './src/utils/apollo';

const apolloClient = createApolloClient();

// http://192.168.1.13:5000/api/repositories

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;