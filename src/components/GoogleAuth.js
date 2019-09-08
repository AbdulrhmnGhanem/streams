import React from 'react';
import { connect } from 'react-redux';

import  { signIn, signOut } from "../actions";


class GoogleAuth extends React.Component{

    componentDidMount() {
        // noinspection JSUnresolvedVariable
        window.gapi.load('client:auth2', () => {
            // noinspection JSUnresolvedVariable
            window.gapi.client.init({
                clientId: '918172285389-lakuqhontvbs4ld3llitpb2nho5maprn.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if ( isSignedIn ) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if( this.props.isSignedIn === null ) {
            return null
        }else if( this.props.isSignedIn ) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        }else {
            return (
                <button className="ui green google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In with google
                </button>
            )
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect( mapStateToProps , { signIn, signOut } )( GoogleAuth );