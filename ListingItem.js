'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body, Button } from 'native-base';

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
        //let volunteer = "Claimed by: " + this.props.claimedby

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{timestamp}</Text>
                                <Text>{location}</Text>
                                <Text>{numBox}</Text>
                                <Text>{weight}</Text>
                                <Text>{tag}</Text>
                                <Text>{expiration}</Text>
                                <Text>{claimed}</Text>
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