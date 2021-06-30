/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useMemo, useCallback} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MiMapView} from '@mappedin/react-native-sdk';
import {mapOptions} from './app.json';
import BottomSheet from '@gorhom/bottom-sheet';

const App: () => React$Node = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [-1, '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const expandBottomSheet = () => bottomSheetRef.current.expand();

  const asyncFunction = () =>
    new Promise((resolve) => {
      console.log('asyncFunction start');
      setTimeout(() => {
        console.log('timeout start');
        resolve();
        console.log('timeout end');
      }, 1000);
      console.log('asyncFunction end');
    });

  const showAlert = () => Alert.alert('Alert', 'Message');

  const waitAndShowAlert = async () => {
    console.log('waitAndShowAlert start');
    await asyncFunction();
    console.log('waitAndShowAlert after calling asyncFunction');
    showAlert();
    console.log('waitAndShowAlert end');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <MiMapView style={styles.map} options={mapOptions} />
        <Button title={'SHOW ALERT IN A SEC'} onPress={waitAndShowAlert} />
        <Button title={'EXPAND BOTTOM SHEET'} onPress={expandBottomSheet} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button title={'SHOW ALERT IN A SEC'} onPress={waitAndShowAlert} />
          </View>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default App;
