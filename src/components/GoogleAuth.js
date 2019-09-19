import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {

    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth', () => {
            window.gapi.client.init({
                clientId: '918172285389-lakuqhontvbs4ld3llitpb2nho5maprn.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red google button"
                        onClick={ this.onSignOutClick }>
                    <i className="google icon"/>
                    Sign Out
                </button>
                )
        } else {
            return <button className="ui green google button"
                           onClick={ this.onSignInClick }>
                <i className="google icon"/>
                Sign In with Google
            </button>
        }
    }

    render() {
        return <div>{ this.renderAuthButton() }</div>
    }
}

export default connect(null, { signIn, signOut })(GoogleAuth);