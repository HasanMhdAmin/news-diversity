import React from 'react';
import SourceAutocomplete from "../../components/Autocomplete/Autocomplete";
import './LandingPage.css';
import {getSources} from "../../connection/Connection";


export default function LandingPage(props) {
// export default class LandingPage extends Component {


   function onChangeValueHandler (val)  {
       console.log("click: " + val.name);
   }

    return (
        <div>
            <header className="lp-header">
                <SourceAutocomplete
                    onChangeValue = {onChangeValueHandler}
                />

            </header>

        </div>
    );
}