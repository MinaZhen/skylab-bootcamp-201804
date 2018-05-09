import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import logic from '../../logic'
import './main.css'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'

class Main extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            publicData: [],
            id: '',
            age: '',
            gender: '',
            onError: false,
            token: '',
            disabled: "disabled",
            newUsername: "",
            newPassword: "",
            sessionInfo: {
                id: "",
                token: ""
            },
            bodyUpdate: {
                password: '',
                username: '',
                age: '',
                gender: '',
            }
        }
    }

    /**
     * This componentDiMount receives the data from the sessionStorage of the browser if this exists.
     */

    componentDidMount() {
        const sessionData = sessionStorage.getItem('key');
        if (sessionData) {
            this.setState({ sessionInfo: JSON.parse(sessionData) })
        }
    }

    // INPUTS

    _handlerWriteUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    _handlerWritePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    _handlerWriteAge = (e) => {
        this.setState({ age: e.target.value })
    }

    _handlerWriteGender = (e) => {
        this.setState({ gender: e.target.value })
    }

    _handlerWriteNewUsername = (e) => {
        this.setState({ newUsername: e.target.value })
    }

    _handlerWriteNewPassword = (e) => {
        this.setState({ newPassword: e.target.value })
    }

    // REGISTER

    _handlerRegister = (e) => {
        e.preventDefault();

        let userData = {
            username: this.state.username,
            password: this.state.password,
            age: this.state.age,
            gender: this.state.gender
        }

        logic.register(userData)
            .then(data =>
                this.setState({ id: data.data.id, username: '', password: '' })
            )
    }

    // LOGIN

    _handlerLogin = (e) => {
        e.preventDefault();

        let userData = {
            username: this.state.username,
            password: this.state.password
        }

        logic.login(userData)
            .then(data => this.onSetSession(data, 'key'));
    }

    onSetSession = (data, key) => {
        sessionStorage.setItem(key, JSON.stringify(data.data))
        this.setState({ id: data.data.id, token: data.data.token, username: '', sessionInfo: { id: data.data.id, token: data.data.token } })
    }

    // RETRIEVE

    _handlerRetrieve = (e) => {
        e.preventDefault();

        logic.id = this.state.sessionInfo.id;
        logic.token = this.state.sessionInfo.token;

        logic.retrieve()
            .then(data =>
                this.setState({ publicData: data.data })
            )
    }

    // UPDATE

    _handlerUpdate = (e) => {

        logic.id = this.state.sessionInfo.id;
        logic.token = this.state.sessionInfo.token;

        /* We need to set the body before using the API -> because setState and the API calling are asyncronous */
        Promise.resolve()
            .then(() => {
                this.setState({
                    bodyUpdate: {
                        password: this.state.password,
                        username: this.state.publicData.username,
                        age: this.state.age,
                        gender: this.state.gender,
                        newPassword: (this.state.newPassword) ? this.state.newPassword : null
                    }
                })
            })
            .then(() => {
                let userData = this.state.bodyUpdate;
                logic.update(userData)
                    .then(data => console.log(data))
                for (const prop of Object.getOwnPropertyNames(this.state.bodyUpdate)) {
                    this.state.bodyUpdate[prop] = '';
                }
            })
    }

    // DELETE

    _handlerDelete = () => {

        logic.id = this.state.sessionInfo.id;
        logic.token = this.state.sessionInfo.token;

        let userData = {
            username: this.state.username,
            password: this.state.password
        }

        logic.unregister(userData)
            .then(data => console.log(data))

    }


    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/register" render={() => (

                        <Register
                            _handlerWriteUsername={this._handlerWriteUsername}
                            _handlerWritePassword={this._handlerWritePassword}
                            _handlerRegister={this._handlerRegister}
                            username={this.state.username}
                            password={this.state.password}
                        />
                    )} />
                    <Route path="/login" render={() => (
                        <Login
                            _handlerWriteUsername={this._handlerWriteUsername}
                            _handlerWritePassword={this._handlerWritePassword}
                            _handlerLogin={this._handlerLogin}
                            username={this.state.username}
                            password={this.state.password}
                        />
                    )} />
                    <Route path="/Profile" render={() => (
                        <Profile
                            username={this.state.publicData.username}
                            password={this.state.password}
                            age={this.state.publicData.age}
                            gender={this.state.publicData.gender}

                            _handlerRetrieve={this._handlerRetrieve}
                            _handlerUpdate={this._handlerUpdate}
                            _handlerWriteNewUsername={this._handlerWriteNewUsername}
                            _handlerWriteAge={this._handlerWriteAge}
                            _handlerWriteGender={this._handlerWriteGender}

                            _handlerDelete={this._handlerDelete}
                            _handlerWriteUsername={this._handlerWriteUsername}
                            _handlerWritePassword={this._handlerWritePassword}
                        />
                    )
                    } />
                </Switch>
            </div>
        )
    }

}

export default Main