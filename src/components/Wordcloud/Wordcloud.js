import React from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import SourceAutocomplete from "../Autocomplete/Autocomplete";

export default function Wordcloud(props) {

    return (
        <div style={{ height: 400, maxWidth: 500 }}>
            <ReactWordcloud words={props.words}
                            options={{
                                colors: [
                                    '#1f77b4',
                                    '#ff7f0e',
                                    '#2ca02c',
                                    '#d62728',
                                    '#9467bd',
                                    '#8c564b',
                                ],
                                // enableTooltip: true,
                                // deterministic: true,
                                fontFamily: 'impact',
                                fontSizes: [15, 60],
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                // padding: 1,
                                rotations: 1,
                                rotationAngles: [0, 90],
                                enableOptimizations: true,
                                // scale: 'sqrt',
                                // spiral: 'archimedean',
                                // transitionDuration: 1000,
                            }}/>
        </div>
    );
}
