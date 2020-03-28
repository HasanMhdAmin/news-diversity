import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getSources} from "../../connection/Connection";

const filter = createFilterOptions();

export default function SourceAutocomplete(props) {
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        getSources().then(result => {
            if (active) {
                console.log(result.data);
                setOptions(result.data)
            }
        });
        // (async () => {
        //     const response = await fetch('http://192.168.1.103:7777/api/source');
        //     // await sleep(1e3); // For demo purposes.
        //     const countries = await response.json();
        //
        //     if (active) {
        //         setOptions(countries)
        //         // setOptions(Object.keys(countries).map(key => countries[key].item[0]));
        //     }
        // })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    function f(text) {
        // console.log("click: " + text.title);
        props.onChangeValue(text);
    }

    return (
        <div>
            <Autocomplete
                value={value}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                options={options}
                loading={loading}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Select news source"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
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
                // id="free-solo-with-text-demo"
                // options={top100Films}
                // getOptionLabel={option => {
                //     // e.g value selected with enter, right from the input
                //     if (typeof option === 'string') {
                //         return option;
                //     }
                //     if (option.inputValue) {
                //         return option.inputValue;
                //     }
                //     return option.name;
                // }}
                // renderOption={option => option.name}
                style={{width: 300}}
                freeSolo
                // renderInput={params => (
                //     <TextField {...params} label="Free solo with text demo" variant="outlined" />
                // )}
            />


            <Button variant="contained" onClick={() => f(value)}>Analyze</Button>
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