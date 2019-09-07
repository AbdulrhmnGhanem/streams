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
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
            });
        });
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        }else if(this.state.isSignedIn) {
            return <div>I am signed in</div>
        }else {
            return <div>I am not signed in</div>
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth;