import { Image, StyleSheet, Text, View } from "react-native"
import theme from "../theme";
import { Link } from "react-router-native";
import SingleRepository from "./SingleRepository";

export const repoStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  logo: {
    width: 66,
    height: 58,
  },
  mainDiv: {
    margin: 5,
  },
  language: {
    color: 'white',
    backgroundColor: theme.colors.languageBackground,
    width: '20%',
    borderRadius: 5,
    textAlign: 'center',
    padding: 1,
  },
  topDiv: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    width: '90%'
  },
  bottomDiv: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3
  },
  nameDiv: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <>
      <Link to={`/${item.id}`}>
        <View style={repoStyles.mainDiv}>
          <View style={repoStyles.topDiv}>
            <Image
              style={repoStyles.tinyLogo}
              source={{
                uri: `${item.ownerAvatarUrl}`,
              }}
            />
            <View style={repoStyles.nameDiv}>
              <Text>{item.fullName}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
          <Text style={repoStyles.language}>{item.language}</Text>
          <View style={repoStyles.bottomDiv}>
            <Text style={{ padding: 3 }}>Stars {item.stargazersCount}</Text>
            <Text style={{ padding: 3 }}>Forks {item.forksCount}</Text>
            <Text style={{ padding: 3 }}>Reviews {item.reviewCount}</Text>
            <Text style={{ padding: 3 }}>Rating {item.ratingAverage}</Text>
          </View>
        </View>
      </Link>
      <SingleRepository />
    </>
  )
}

export default RepositoryItem;