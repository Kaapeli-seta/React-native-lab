import {useMedia} from '../hooks/apiHooks';
import {View, FlatList} from 'react-native';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useUpdateContext} from '../hooks/contextHooks';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray, loading} = useMedia();
  const {triggerUpdate} = useUpdateContext();

  const onRefresh = async () => {
    triggerUpdate();
  };
  console.log(mediaArray);
  mediaArray.reverse();
  return (
    <View>
      <FlatList
        onRefresh={onRefresh}
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} navigation={navigation} />}
        refreshing={loading}
      />
    </View>
  );
};

export default Home;
