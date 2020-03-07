import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import { Platform } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { purple, white } from '../utils/colors';

const router = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'android' ? (
          <Entypo name="text-document" size={30} color={purple} />
        ) : (
          <MaterialIcons name="format-list-bulleted" size={30} color={white} />
        )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'android' ? (
          <Entypo name="grid" size={30} color={purple} />
        ) : (
          <MaterialIcons name="playlist-add" size={30} color={white} />
        )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'android' ? purple : white,
    style: {
      padding: 10,
      height: Platform.OS === 'android' ? 60 : 'auto',
      //fontSize: 18,
      backgroundColor: Platform.OS === 'android' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav =
  Platform.OS === 'android'
    ? createBottomTabNavigator(router, navigationOptions)
    : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(TabNav);
