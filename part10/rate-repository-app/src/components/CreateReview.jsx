import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./SignIn";
import { Formik } from "formik";
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { REVIEW_MUTATION } from "../graphql/mutations";

const loginValidationSchema = yup.object().shape({
  repoOwner: yup
    .string()
    .required('Repository Owner is Required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  repoRating: yup
    .number()
    .min(1, `Rating must be between 0 and 100`)
    .max(100, `Rating must be between 0 and 100`)
    .required('Repository rating is required'),
  repoReview: yup
    .string()
});

export default function CreateReview() {
  const [submitReview] = useMutation(REVIEW_MUTATION);

  const submitReviewOnPress = async (values) => {
    const valuesToSubmit = {
      ownerName: values.repoOwner,
      rating: Number(values.repoRating),
      repositoryName: values.repoName,
      text: values.repoReview
    }
    console.log(valuesToSubmit)
    try {
      const res = await submitReview({
        fetchPolicy: 'cache-and-network',
        variables: {
          valuesToSubmit
        }
      });
      console.log(res);
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
              name="repoOwner"
              placeholder="Repository Owner"
              style={styles.textInput}
              onChangeText={handleChange('repoOwner')}
              onBlur={handleBlur('repoOwner')}
              value={values.repoOwner}
              keyboardType="repoOwner"
            />
            {errors.repoOwner &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.repoOwner}</Text>
            }
            <TextInput
              name="repoName"
              placeholder="Repository name"
              style={styles.textInput}
              onChangeText={handleChange('repoName')}
              onBlur={handleBlur('repoName')}
              value={values.repoName}
            />
            {errors.repoName &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.repoName}</Text>
            }
            <TextInput
              name="repoRating"
              placeholder="Repository rating"
              style={styles.textInput}
              onChangeText={handleChange('repoRating')}
              onBlur={handleBlur('repoRating')}
              value={values.repoRating}
            />
            {errors.repoRating &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.repoRating}</Text>
            }
            <TextInput
              name="repoReview"
              placeholder="Repository review"
              style={styles.textInput}
              onChangeText={handleChange('repoReview')}
              onBlur={handleBlur('repoReview')}
              value={values.repoReview}
              multiline
            />
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  )
}