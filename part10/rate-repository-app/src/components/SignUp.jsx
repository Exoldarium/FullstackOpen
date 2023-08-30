import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from 'yup';
import useSignUp from "../hooks/useSignUp";

export const styles = StyleSheet.create({
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
    .max(30, ({ max }) => `Username must be at least ${max} characters`)
    .required('Username is Required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .max(50, ({ max }) => `Username must be at least ${max} characters`)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
    .required('Retype your password'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e)
    }
  };

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
            <TextInput
              name="passwordConfirmation"
              placeholder="Confirm password"
              style={styles.textInput}
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              secureTextEntry
            />
            {errors.passwordConfirmation &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text>
            }
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;