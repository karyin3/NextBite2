'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body, Button } from 'native-base';
import firebase from 'firebase';

export default class ListingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    checkStatus() {
        if (this.props.claim === 'no') {
            return "Waiting to be claimed"
        } else if (this.props.claim === 'yes') {
            return "Claimed by: " + this.props.volunteer
        }
    }

    render() {
        let timestamp = "Created at: " + this.props.timestamp
        let location = "Pickup location: " + this.props.location
        let numBox = "Number of boxes: " + this.props.boxes
        let weight = "Approximate weight: " + this.props.weight
        let tag = "Types of food: " + this.props.tag
        let expiration = "Latest pickup time: " + this.props.expiration
        let claimed = "Status: " + this.checkStatus()

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Created at</Text>
                                <Text>Pickup Location</Text>
                                <Text>Number of boxes</Text>
                                <Text>Approximate weight</Text>
                                <Text>Types of food</Text>
                                <Text>Latest pickup time</Text>
                                <Text>Status</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    }
});