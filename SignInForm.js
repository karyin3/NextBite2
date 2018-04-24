'use strict';

import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password':'',
        };
    }

    /**
     * A helper function to validate a value based on a hash of validations
     * second parameter has format e.g.,
     * {required: true, minLength: 5, email: true}
     * (for required field, with min length of 5, and valid email)
     */
    validate(value, validations) {
        let errors = { isValid: true, style: '' };

        if (value !== '') { //check validations
            if (validations.required) {
                errors.required = true;
                errors.isValid = false;
            }

            if (validations.minLength && value.length < validations.minLength) {
                errors.minLength = validations.minLength;
                errors.isValid = false;
            }

            //handle email type
            if (validations.email) {
                //pattern comparison from w3c
                //https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
                let valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
                if (!valid) {
                    errors.email = true;
                    errors.isValid = false;
                }
            }
        }
        return errors; //return data object
    }

    // handle sign in button
    signIn() {
        this.props.signInCallback(this.state.email, this.state.password);
    }

    render() {
        let emailErrors = this.validate(this.state.email, { required: true, email: true });
        let passwordErrors = this.validate(this.state.password, { required: true, minLength: 8 });

        return (
            <Container style={styles.container} >
                <Content>
                    <Form>
                        <InputField
                            label='Email'
                            keyboard='email-address'
                            handleChange={(text) => this.setState({ email: text})}
                            secure={false}
                        />
                        <EmailErrorMsg 
                            error={emailErrors}
                        />
                        <InputField
                            label='Password'
                            keyboard='default'
                            handleChange={(text) => this.setState({ password: text})}
                            secure={true}
                        />
                        <PasswordErrorMsg 
                            error={passwordErrors}
                        />
                    </Form>
                    <Button rounded style={styles.signInButton} onPress={() => this.signIn()}>
                        <Text style={styles.buttonText}>
                            Sign In
                        </Text>
                    </Button >
                    <Text style={styles.text} >
                        Don't have an account yet?
                    </Text>
                    <Button transparent style={styles.signUp}>
                        <Text style={{ fontSize: 16 }}>Sign up here</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const InputField = props => (
    <Item floatingLabel>
        <Label>{props.label}</Label>
        <Input
            keyboardType={props.keyboard}
            onChangeText= {props.handleChange}
            secureTextEntry={props.secure}
        />
    </Item>
);

const EmailErrorMsg = props => (
    props.error.email ? <Text>Not a valid email address</Text> : null
);

const PasswordErrorMsg = props => (
    props.error.minLength ? <Text>Password must be at least {props.error.minLength} characters</Text> : null
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    signInButton: {
        flex:1,
        marginTop: 50,
        backgroundColor: '#3E7C6D',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        alignSelf: 'center',
    },
    signUp: {
        alignSelf: 'center',
    }
});