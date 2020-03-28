import React from 'react';
import FreeSoloCreateOption from "../../components/Autocomplete/Autocomplete";
import './LandingPage.css';
import Button from "@material-ui/core/Button";


export default function LandingPage(props) {
// export default class LandingPage extends Component {


   function onChangeValueHandler (val)  {
       console.log("click: " + val.title);
    }

    return (
        <div>
            <header className="lp-header">
                <FreeSoloCreateOption
                    onChangeValue = {onChangeValueHandler}
                />

            </header>

        </div>
    );
}