import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
// import { useEffect } from "react";
// import AuthStorage from "../utils/authStorage";

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
  },
});

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, ({ min }) => `Username must be at least ${min} characters`)
    .required('Username is Required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      // console.log(res);
    } catch (e) {
      console.log(e)
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const newToken = new AuthStorage('addNewToken');

  //     await newToken.setAccessToken(result?.data?.authenticate?.accessToken)
  //     const token = await newToken.getAccessToken();
  //     await newToken.removeAccessToken();
  //     console.log(token);
  //   })();
  // });

  return (
    <View style={styles.loginContainer}>
      <Text>Login Screen</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <>
            <TextInput
              name="username"
              placeholder="username"
              style={styles.textInput}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              keyboardType="username"
            />
            {errors.username &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
            }
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;