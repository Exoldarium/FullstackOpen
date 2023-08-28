import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(
      `${this.namespace}:token`,
    );

    return token ? JSON.parse(token) : [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    const token = await this.getAccessToken();
    const newToken = [...token, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(newToken),
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;