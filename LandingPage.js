'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Container, Content} from 'native-base';
import logo from './resources/img/logo.png';
import SignIn from './SignIn';

export default class LandingPage extends Component {
    render() {
        return(
            <Container>
                <Image source={logo} style={styles.logo}/>
                <SignIn />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: '100%'
    }
});