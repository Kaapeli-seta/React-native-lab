import React from 'react';
import {useMedia} from '../hooks/apiHooks';
import {View, Text, FlatList} from 'react-native';
import MediaListItem from '../components/MediaListItem';

const Home = () => {
  const {mediaArray} = useMedia();
  console.log(mediaArray);
  return (
    <View>
      <Text>My media</Text>
      <FlatList data={mediaArray} renderItem={({item}) => <MediaListItem item={item} />} />
    </View>
  );
};

export default Home;
