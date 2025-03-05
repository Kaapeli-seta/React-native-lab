import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import React from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';
import {Video} from 'expo-av';
import {Button, Card, Icon, ListItem} from '@rneui/base';
import {useMedia} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUpdateContext, useUserContext} from '../hooks/contextHooks';
import {useNavigation} from '@react-navigation/native';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params.item;
  const {deleteMedia} = useMedia();
  const {user} = useUserContext();
  const {triggerUpdate} = useUpdateContext();
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      deleteMedia(item.media_id, token);
      triggerUpdate();
      navigation.goBack();
    } catch {}
  };
  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        {item.media_type.includes('image') ? (
          <Image style={styles.image} src={item.filename} alt={item.title} />
        ) : (
          <Video style={styles.image} source={{uri: item.filename}} useNativeControls />
        )}
        <ListItem>
          <Icon name="today" />
          <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
        </ListItem>
        {/* <Likes item={item} /> */}
        <ListItem>
          <Text>{item.description}</Text>
        </ListItem>
        <ListItem>
          <Icon name="inventory" />
          <Text>Type: {item.media_type}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>Owner: {item.username}</Text>
        </ListItem>
        <ListItem>
          <Icon name="image" />
          <Text>{Math.round(item.filesize / 1024)} kB</Text>
        </ListItem>
        {user?.user_id === item.user_id && (
          <ListItem>
            <Button title="Delete" color="error" onPress={handleDelete} />
          </ListItem>
        )}
        {/* <Comments item={item} /> */}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {height: 300},
});
export default Single;
