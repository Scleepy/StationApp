import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Realm from 'realm';
import ViewCodes from './screens/viewCodes';

import {API_KEY, APP_ID} from '@env';
import {ChangeStreamDocument} from 'mongodb';

const app = new Realm.App({id: APP_ID});

const connect = async () => {
  const credentials = Realm.Credentials.apiKey(API_KEY);

  try {
    await app.logIn(credentials);
    console.log('Connected to Cluster');
  } catch (err) {
    console.log(err);
  }
};

const watcher = async () => {
  const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
  const collection = mongodb?.db('BinusRecycle').collection('MsQuest');

  // if (collection) {
  //   const filter = {
  //     $match: {'updateDescription.updatedFields.uid': {$exists: true}},
  //   };

  //   const stream = collection.watch([filter]);
  //   stream.on('change', change => {
  //     console.log('Update detected:', change);
  //     console.log();
  //     // Do something with the updated document here
  //   });
  // }
};

function App() {
  useEffect(() => {
    connect();
    watcher();
  }, []);

  changeNavigationBarColor('#F5F4F9', true);
  return (
    <View>
      <StatusBar backgroundColor={'#F5F4F9'} barStyle="dark-content" />
      <ViewCodes />
    </View>
  );
}

export default App;
