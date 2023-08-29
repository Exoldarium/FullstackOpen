import { useQuery } from "@apollo/client";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPO } from "../graphql/queries";
import useRepositories from "../hooks/useRepositories";
import { repoStyles } from "./RepositoryItem";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repositories, oneRepo, id }) => {
  const singleRepo = repositories.filter(repo => repo.id === id);
  console.log(singleRepo)

  if (id) {
    return (
      <View style={repoStyles.mainDiv}>
        <View style={repoStyles.topDiv}>
          <Image
            style={repoStyles.tinyLogo}
            source={{
              uri: `${singleRepo[0].ownerAvatarUrl}`,
            }}
          />
          <View style={repoStyles.nameDiv}>
            <Text>{singleRepo[0].fullName}</Text>
            <Text>{singleRepo[0].description}</Text>
          </View>
        </View>
        <Text style={repoStyles.language}>{singleRepo[0].language}</Text>
        <View style={repoStyles.bottomDiv}>
          <Text style={{ padding: 3 }}>Stars {singleRepo[0].stargazersCount}</Text>
          <Text style={{ padding: 3 }}>Forks {singleRepo[0].forksCount}</Text>
          <Text style={{ padding: 3 }}>Reviews {singleRepo[0].reviewCount}</Text>
          <Text style={{ padding: 3 }}>Rating {singleRepo[0].ratingAverage}</Text>
        </View>
        <Button title="Open in github" onPress={async () => await Linking.openURL(oneRepo?.repository.url)}></Button>
      </View>
    )
  }
};

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  const newDate = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

  return (
    <View>
      <Text>{review.user.username}</Text>
      <Text>{review.rating}</Text>
      <Text>{newDate}</Text>
      <Text>{review.text}</Text>
    </View>
  )
  // Single review item
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id
    }
  });
  const { repositories } = useRepositories();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  const reviewNodes = data ? data?.repository.reviews.edges.map(edge => edge.node) : [];
  // console.log(reviewNodes);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repositories={repositoryNodes} oneRepo={data} id={id} />}
      ItemSeparatorComponent={ItemSeparator}
    // ...
    />
  );
};

export default SingleRepository;