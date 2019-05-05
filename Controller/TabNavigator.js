import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import HousingSearchPage from './HousingSearchPage';

const TabNavigator = createBottomTabNavigator(
	{
		HousingSearchPage: {
			screen: HousingSearchPage, 
			navigationOptions: {
				tabBarLabel:"Home",
				tabBarIcon: <Icon name="home" type="font-awesome"/>
			}
		},
		//RoommateSearchPage: {screen: RoommateSearchPage}
		/*CreateHousingRoommatePageIDKIDK: {
			screen: CreateHousingRoommatePageIDKIDK,
			navigationOptions: {
				title: 'Profile Page',
				headerLeft: null
			}
		}*/
	},
);

export default TabNavigator;