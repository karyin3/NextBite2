'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'native-base';
import firebase from 'firebase';
import ListingItem from './ListingItem';

export default class CurrentDonations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'Current Donations',
    };

    componentDidMount() {

        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let currentDonationCards = [];
                let userListings = [];
                console.log("1 curr donations state beginning of didmount", this.state.currentDonationCards)
                console.log('1 curr donation beginning of didmount', currentDonationCards);
                console.log('1 curr user listings beginning didmount', userListings)

                // query for vendor's listingIds
                let pendingRescueRef = firebase.database().ref(`users/${user.uid}/pendingRescues`);

                pendingRescueRef.on('value', (snapshot) => {
                    currentDonationCards = [];
                    userListings = [];
                    //this.setState({userListings: []})
                    console.log("2 userlistings state before push", this.state.userListings)

                    //this.setState({ currentDonationCards: currentDonationCards })
                    snapshot.forEach(function (child) {
                        let pendingRescueObj = {}
                        pendingRescueObj['randomKey'] = child.key;
                        pendingRescueObj['listingId'] = child.val().listingId;
                        //pendingRescueKey.push(child.key)
                        //userListings.push(child.val().listingId)
                        userListings.push(pendingRescueObj);
                        console.log("2 userlistings object after push", userListings)

                    });
                    //thisComponent.setState({ userListings: userListings })
                    console.log("2 userlistings state after push", this.state.userListings)
                    console.log("2 curr donations after pendingrescueref", this.state.currentDonationCards)


                    //query for details of each listing
                    let listings = userListings.map((obj) => {
                        //console.log("3 obj listingid", obj.listingId)
                        console.log('3 curr donations after userlistingsref', this.state.currentDonationCards)
                        let listingDetailRef = firebase.database().ref(`listings/${obj.listingId}`);
                        listingDetailRef.once('value', (snapshot) => {
                            let listingDetailObj = {};
                            snapshot.forEach(function (child) {
                                listingDetailObj[child.key] = child.val()

                            });

                            listingDetailObj["listingId"] = obj.listingId;

                            // retrieve volunteer's name for the listing
                            let usersRef;
                            let volunteerName = "";
                            if (listingDetailObj.claimed === 'yes') {
                                usersRef = firebase.database().ref(`users/${listingDetailObj.claimedBy}`);
                                usersRef.once('value', (snapshot) => {
                                    volunteerName = `${snapshot.child("firstName").val()} ${snapshot.child("lastName").val()}`;
                                });
                            }
                            console.log('4 making card', listingDetailObj['listingId'])
                            // create one donation card
                            let oneCard = (<ListingItem
                                timestamp={new Date(listingDetailObj.time)}
                                location={listingDetailObj.location}
                                boxes={listingDetailObj.boxes}
                                weight={listingDetailObj.weight}
                                tag={listingDetailObj.tags}
                                expiration={listingDetailObj.expirationDate}
                                claimed={listingDetailObj.claimed}
                                volunteer={volunteerName}
                                delivered={listingDetailObj.delivered}
                                dropoff={listingDetailObj.dropoffLocation}
                                listingID={listingDetailObj.listingId}
                                pendingRescueKey={obj.randomKey}
                                navigation={this.props.navigation}
                            />);

                            // add donation card to array
                            currentDonationCards.push(oneCard)

                            currentDonationCards.sort(function (a, b) {
                                return new Date(a.props.expiration) - new Date(b.props.expiration);
                            });

                            this.setState({ currentDonationCards: currentDonationCards })
                            console.log("5 after pushing card", this.state.currentDonationCards)
                        });
                    });
                });
            } else {
                this.setState({ userId: null })
            }
        });
    }

    componentWillUnmount() {
        if (this.unregister) {
            this.unregister();
        }
        //firebase.database().ref(`users/${user.uid}/pendingRescues`).off();

    }

    render() {
        console.log("state", this.state.currentDonationCards)
        return (
            <ScrollView style={styles.cards}>
                {this.state.currentDonationCards}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cards: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#f6f6f6'
    }
});