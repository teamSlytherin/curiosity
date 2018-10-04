import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Main from '../Main/Main.jsx';
import { checkUserEmail } from '../../queries/queries.js';
import { withApollo } from 'react-apollo';

firebase.initializeApp({
  apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
  authDomain: 'curiosity-a9199.firebaseapp.com',
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: null,
			email: '',
			userId: null,
			loading: true,
			oAuthData: null
		};
		// this.finishRegistration = this.finishRegistration.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.authListener = this.authListener.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

  componentDidMount = () => {
    this.authListener();
  };

	authListener() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user);
				this.setState(
					{
						loading: false,
						isSignedIn: true,
						oAuthData: Object.assign({}, user.providerData[0])
					},
					() => {
						console.log('this is email', this.state.oAuthData.email);
						this.getUser(this.state.oAuthData.email);
					}
				);
			} else {
				this.setState({
					loading: false,
					oAuthData: null
				});
			}
		});
	}

	getUser = async email => {
		const userId = await this.props.client
			.query({
				query: checkUserEmail,
				variables: {
					email: email
				}
			})
			.then(({ data }) => {
				if (data.checkUserEmail.id) {
					this.props.setUser(data.checkUserEmail.id, true);
				} else {
					console.log('waiting for email to fetch user data');
				}
			})
			.then(() => {
				this.setState({ userId: this.props.userId, isSignedIn: this.props.signedIn });
				console.log(this.state.userId);
			})
			.catch(err => console.log('you got an error', err));
		console.log('this is const userid', this.state.userId);
	};

	handleLogout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.setState({
					oAuthData: null,
					userId: null,
					email: null,
					isSignedIn: false,
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		console.log('Im at app', this.state.oAuthData);
		if (this.state.loading) {
			return <div>loading</div>;
		}
		return (
			<div>
				<Main
					signedIn={this.state.isSignedIn}
					userId={this.state.userId}
					oAuthData={this.state.oAuthData}
					userId={this.state.userId}
					logout={this.handleLogout}
					uiConfig={this.uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			</div>
		);
	}
}

export default withApollo(App);
