import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import Header from "./Header";
import StreamList from "./streams/StreamList";
import StreamDelete from "./streams/StreamDelete";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamEdits from "./streams/StreamEdits";

const App = () => {
    return <div className="ui container">
        <Router history={history}>
            <div>
                <Header/>
                <Switch>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit/:id" exact component={StreamEdits}/>
                    <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                    <Route path="/streams/:id" exact component={StreamShow}/>
                </Switch>
            </div>
        </Router>
    </div>
};

export default App
