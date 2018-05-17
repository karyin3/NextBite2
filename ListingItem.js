'use strict';

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Container, Card, CardItem} from 'native-base';
import firebase from 'firebase';

export default class ListingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'post': '',
        };
    }

    render() {
        return(
            <Container>
                <Card>
                    
                </Card>
            </Container>
        );
    }
}