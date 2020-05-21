import React from 'react';
import COLOR from "../../resources/Color";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    container: {
        display: "inline-block",

    },
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
    itemInHeader: {
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 20
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
    scienceTechBg: {
        background: COLOR.BLUE,
    },
    sportBg: {
        background: COLOR.BROWN,
    }
}));

export default function TagView(props) {
    const classes = useStyles();
    const { header = false } = props;

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
            case 'Science & Technology':
                return classes.scienceTechBg
            case 'Sport':
                return classes.sportBg
            default:
                return classes.businessBg
        }
    };

    const isHeader = (item) => {

        if (header)
            return classes.itemInHeader
    };

    const items = props.items.map((item, index) =>
        <div key={index} className={[classes.item, bgColor(item), isHeader()].join(' ')}>
            {item}
        </div>
    );

    return (
        <div className={classes.container}>
            {items}
        </div>
    );
}
