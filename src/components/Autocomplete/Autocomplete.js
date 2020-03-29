import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getSources} from "../../connection/Connection";
import Container from "@material-ui/core/Container";

const filter = createFilterOptions();

export default function SourceAutocomplete(props) {
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const analyzeBtn = {
        marginLeft: 20
    };

    const search = {
        display: "flex",
        justifyContent: "center"
    };

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
        <Container maxWidth="sm" style={search}>

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

            <Button variant="contained" style={analyzeBtn} onClick={() => f(value)}>Analyze</Button>

        </Container>

    );
}