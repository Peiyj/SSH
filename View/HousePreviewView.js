// HousePreviewView will display a preview of a house. It is intended to be used with Flatlist. 
// When the preview is touched, it will call the onTouch props. 
// Usage: <HousePreviewView house={ahouse} onTouch={this.onHouseTouch} />
// The HousePreviewView will display the information about ahouse and will call this.onHouseTouch when touched. 

import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Button, Alert, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon, Card, Badge, SearchBar } from 'react-native-elements';
import RF from "react-native-responsive-fontsize";
import ImageHorizontalScrollView from '../View/ImageHorizontalScrollView';
import BadgesView from '../View/BadgesView';
import User from '../Model/User';
import firebase from 'firebase';
import HouseFavButton from './HouseFavButton';

export default class HousePreviewView extends React.Component {

	render() {
		let item = this.props.house;
		let onTouch = this.props.onTouch;
		let favDisabled = this.props.favDisabled ? this.props.favDisabled : false;

		if (!item) {
			return (<View></View>);
		}

		var favButton;
		if (!favDisabled) {
			favButton = (<HouseFavButton house={this.props.house}/>);
		}
		
		return (
			<TouchableHighlight
				onPress={() => {onTouch(this.props.house)}}>
				<View style={{
						backgroundColor: 'white',
						alignItems: "stretch",
						marginBottom: 10,
						padding: 5,
						height: '50%'
				}}>
					<ImageHorizontalScrollView pictureUrls={item.pictures} />
					<View>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}>
							<Text style={{fontSize: RF(2.5), fontWeight: 'bold'}}>{item.filters_house.title}</Text>
							<Text style={{fontSize: RF(2.5), color: 'rgb(50, 150, 255)'}}>{"$ " + item.filters_house.price}</Text>
						</View>
					
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
							<Text style={{fontSize: RF(2)}}>{item.filters_house.num_bedroom + "B" + item.filters_house.num_bathroom + "B | " + item.filters_house.num_parking + " parking"}</Text>
							{favButton}
						</View>
					
					</View>

					<BadgesView tags={item.filters_house.additional_tags} />
				</View>
			</TouchableHighlight>
		)
	}
}