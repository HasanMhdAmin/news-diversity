import React from 'react';
import COLOR from "../../resources/Color";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    item: {
        display: "inline-block",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 4,
        borderRadius: 30,
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    // TODO match categories with server
    businessBg: {
        background: COLOR.ORANGE,
    },
    politicsBg: {
        background: COLOR.RED,
    },
    healthBg: {
        background: COLOR.GREEN,
    },
    entertainmentBg: {
        background: COLOR.LILAC,
    },
    scienceBg: {
        background: COLOR.BLUE,
    },
    technologyBg: {
        background: COLOR.BROWN,
    }
}));

export default function TagView(props) {
    const classes = useStyles();

    const bgColor = (item) => {
        switch (item) {
            case 'Business':
                return classes.businessBg
            case 'Politics':
                return classes.politicsBg
            case 'Health':
                return classes.healthBg
            case 'Entertainment':
                return classes.entertainmentBg
            case 'Science':
                return classes.scienceBg
            case 'Technology':
                return classes.technologyBg
            default:
                return classes.businessBg
        }
    };

    const items = props.items.map((item) =>
        <div className={[classes.item, bgColor(item)].join(' ')}>
            {item}
        </div>
    );

    return (
        <div>
            {items}
        </div>
    );
}
