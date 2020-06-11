import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {NewsDiversitySection} from "./views/LandingPage/NewsDiversitySection";
import {WordcloudSection} from "./views/LandingPage/WordcloudSection";

const theme = createMuiTheme({
    palette: {
        primary: {main: '#000000'},
        secondary: {main: '#757575'},
        // blue: {main: '#1a73e8'},
    },
    typography: {useNextVariants: true},
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Switch>
                <Route path="/test" component={App}/>
                <Route path="/diversity" component={NewsDiversitySection}/>
                <Route path="/keyword" component={WordcloudSection}/>
                <Route path="/" component={LandingPage}/>

            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
