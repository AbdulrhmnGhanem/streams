import React from 'react';


class GoogleAuth extends React.Component{

    state = {isSignedIn: null};

    componentDidMount() {
        // noinspection JSUnresolvedVariable
        window.gapi.load('client:auth2', () => {
            // noinspection JSUnresolvedVariable
            window.gapi.client.init({
                clientId: '918172285389-lakuqhontvbs4ld3llitpb2nho5maprn.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()})
    };

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null
        }else if(this.state.isSignedIn) {
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

export default GoogleAuth;