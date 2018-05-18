'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
        let userListings = [];
        let currentDonationCards = []
        let volunteer = ""

        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // query for vendor's listingIds
                let listingRef = firebase.database().ref(`users/${user.uid}/listings`);
                listingRef.on('value', (snapshot) => {
                    snapshot.forEach(function (child) {
                        let listingObj = child.val();
                        userListings.push(listingObj.listingId)
                    });
                    this.setState({ userListingsId: userListings })

                    //query for details of each listing
                    let listing = userListings.map((listingId) => {
                        let listingDetailRef = firebase.database().ref(`listings/${listingId}`);
                        listingDetailRef.on('value', (snapshot) => {
                            let listingDetailObj = {};
                            snapshot.forEach(function (child) {
                                listingDetailObj[child.key] = child.val()
                            });

                            if (listingDetailObj.claimedby) {
                                // retrieve volunteer's name for the listing
                                let usersRef = firebase.database().ref(`users/${listingDetailObj.claimedby}`);
                                usersRef.on('value', (snapshot) => {
                                    snapshot.forEach(function (child) {
                                        if (child.key == 'firstName') {
                                            volunteer += child.val() + " ";
                                        }
                                        if (child.key == 'lastName') {
                                            volunteer += child.val();
                                        }
                                    });
                                });
                            }

                            currentDonationCards.push(<ListingItem
                                timestamp={listingDetailObj.time}
                                location={listingDetailObj.location}
                                numBox={listingDetailObj.boxes}
                                weight={listingDetailObj.weight}
                                tag={listingDetailObj.tags}
                                expiration={listingDetailObj.expirationDate}
                                claim={listingDetailObj.claimed}
                                volunteer={volunteer}
                            />);

                            this.setState({ donationCards: currentDonationCards })
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
    }

    render() {
        return (
            <ScrollView style={styles.cards}>
                {this.state.donationCards}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cards: {
        width: '100%',
        height: '100%',
    }
});