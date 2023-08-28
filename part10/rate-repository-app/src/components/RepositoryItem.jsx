import { Image, StyleSheet, Text, View } from "react-native"
// import { format } from "../utils/utils";
import theme from "../theme";

const styles = StyleSheet.create({
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
    <View style={styles.mainDiv}>
      <View style={styles.topDiv}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${item.ownerAvatarUrl}`,
          }}
        />
        <View style={styles.nameDiv}>
          <Text>{item.fullName}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.language}>{item.language}</Text>
      <View style={styles.bottomDiv}>
        <Text style={{ padding: 3 }}>Stars {item.stargazersCount}</Text>
        <Text style={{ padding: 3 }}>Forks {item.forksCount}</Text>
        <Text style={{ padding: 3 }}>Reviews {item.reviewCount}</Text>
        <Text style={{ padding: 3 }}>Rating {item.ratingAverage}</Text>
      </View>
    </View>
  )
}

export default RepositoryItem;