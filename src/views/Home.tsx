import React from 'react';
import {useMedia} from '../hooks/apiHooks';
import {View, Text, FlatList} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();
  console.log(mediaArray);
  navigation.navigate('Single');
  return (
    <View>
      <Text>My media</Text>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} navigation={navigation} />}
      />
    </View>
  );
};

export default Home;
