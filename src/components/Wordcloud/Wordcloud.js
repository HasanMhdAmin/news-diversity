import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import COLOR from "../../resources/Color";
import Grid from "@material-ui/core/Grid";

export default function Wordcloud(props) {

    return (
        <div style={{height: 400}}>
            <ReactWordcloud words={props.words}
                            callbacks={props.callback}
                            options={{
                                colors: [
                                    COLOR.BLUE,
                                    COLOR.ORANGE,
                                    COLOR.GREEN,
                                    COLOR.RED,
                                    COLOR.LILAC,
                                    COLOR.BROWN,
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
