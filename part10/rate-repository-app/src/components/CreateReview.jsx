import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./SignIn";
import { Formik } from "formik";
import * as yup from 'yup';
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const loginValidationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository Owner is Required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(1, `Rating must be between 0 and 100`)
    .max(100, `Rating must be between 0 and 100`)
    .required('Repository rating is required'),
  text: yup
    .string()
});

export default function CreateReview() {
  const navigate = useNavigate();
  const [create, result] = useCreateReview();

  const submitReviewOnPress = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      await create({ ownerName, rating, repositoryName, text });
      console.log(result);
      navigate(`${result?.createReview?.repositoryId}`)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Text>Create a review</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          repoOwner: '',
          repoName: '',
          repoRating: Number(),
          repoReview: ''
        }}
        onSubmit={submitReviewOnPress}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <>
            <TextInput
              name="ownerName"
              placeholder="Repository Owner"
              style={styles.textInput}
              onChangeText={handleChange('ownerName')}
              onBlur={handleBlur('ownerName')}
              value={values.ownerName}
              keyboardType="ownerName"
            />
            {errors.ownerName &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.ownerName}</Text>
            }
            <TextInput
              name="repositoryName"
              placeholder="Repository name"
              style={styles.textInput}
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
              value={values.repositoryName}
            />
            {errors.repositoryName &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.repositoryName}</Text>
            }
            <TextInput
              name="rating"
              placeholder="Repository rating"
              style={styles.textInput}
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
            />
            {errors.rating &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.rating}</Text>
            }
            <TextInput
              name="text"
              placeholder="Repository review"
              style={styles.textInput}
              onChangeText={handleChange('text')}
              onBlur={handleBlur('text')}
              value={values.text}
              multiline
            />
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  )
}