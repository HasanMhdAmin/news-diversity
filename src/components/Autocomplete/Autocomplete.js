import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";

const filter = createFilterOptions();

export default function SourceAutocomplete(props) {
    const [value, setValue] = React.useState(null);
    const { onChangeValue } = props.onChangeValue;


    function f(text) {
        // console.log("click: " + text.title);
        props.onChangeValue(text);
    }

    return (

        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (newValue && newValue.inputValue) {
                        setValue({
                            name: newValue.inputValue,
                        });

                        return;
                    }


                    setValue(newValue);
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-with-text-demo"
                options={top100Films}
                getOptionLabel={option => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                renderOption={option => option.name}
                style={{ width: 300 }}
                freeSolo
                renderInput={params => (
                    <TextField {...params} label="Free solo with text demo" variant="outlined" />
                )}
            />


            <Button variant="contained" onClick={() => f(value) }>Analyze</Button>
        </div>

    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {
        "id": 1,
        "name": "BBC News",
        "domain": "https://www.bbc.com",
        "organization": "bbc"
    },
    {
        "id": 2,
        "name": "The Guardian",
        "domain": "https://www.theguardian.com",
        "organization": "theguardian"
    },
    {
        "id": 3,
        "name": "CNN",
        "domain": "https://cnn.com",
        "organization": "cnn"
    }
];