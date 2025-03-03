import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type MediaItemProps = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: MediaItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(item.title + ' clicked');
        navigation.navigate('Single', {item});
      }}
    >
      <Image
        style={styles.image}
        source={{uri: item.thumbnail || (item.screenshots && item.screenshots[2]) || undefined}}
      />
      <Text> {item.title}</Text>
      <Text>Created at: {new Date(item.created_at).toLocaleString('fi-FI')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f5',
  },
  image: {height: 300},
});

export default MediaListItem;
