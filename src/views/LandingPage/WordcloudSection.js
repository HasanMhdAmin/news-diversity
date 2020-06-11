import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import Wordcloud from "../../components/Wordcloud/Wordcloud";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";
import {getDiversity, getKeyword} from "../../connection/Connection";
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: "center",
        marginTop: 25,
        fontSize: 12
    }
}));

export const WordcloudSection = React.forwardRef((props, ref) => {
    const [wordcloudPage, setWordcloudPage] = React.useState(0);
    const [wordsDaily, setWordsDaily] = React.useState([]);
    const [wordsWeekly, setWordsWeekly] = React.useState([]);
    const [wordsMonthly, setWordsMonthly] = React.useState([]);
    const [source, setSource] = React.useState();

    const classes = useStyles();
    // called form reference in LandingPage.js
    React.useImperativeHandle(ref, () => ({
        sourceUpdated(source) {
            console.log("Source: " + JSON.stringify(source))
            setSource(source)
            if (source != null)
                sendRequests(source.domain)
            else
                sendRequests("")
        }
    }));

    const handleWordcloudChange = (event, newValue) => {
        setWordcloudPage(newValue);
    };

    const handleWordcloudChangeIndex = (index) => {
        setWordcloudPage(index);
    };

    React.useEffect(() => {
        sendRequests("");
    }, []);

    function getUrlFromHref() {
        let href = window.location.href;
        let x = href.indexOf("?url=")
        if (x === -1)
            return "";
        var res = href.substring(x + "?url=".length, href.length);
        return res;
    }

    function sendRequests(url) {
        let href = getUrlFromHref()
        console.log("URL:1 " + href);
        if (href !== "") {
            url = href
        }
        console.log("URL:2 " + url);

        console.log("sendRequests for url: " + url)
        setWordsDaily([])
        setWordsWeekly([])
        setWordsMonthly([])
        getKeyword(url, "daily").then(result => {
            setWordsDaily(result.data);
        });
        getKeyword(url, "weekly").then(result => {
            setWordsWeekly(result.data);
        });
        getKeyword(url, "monthly").then(result => {
            setWordsMonthly(result.data);
        });

    }

    const onWordClickCallback = {
        getWordTooltip: word => `The word "${word.text}" appears ${word.value} times.`,
        onWordClick: word =>
        {
            if (getUrlFromHref() === "") {
                props.handleOpenArticlesDialog(word.text)
            }
        }
    };


    function viewFooter() {
        if (getUrlFromHref() === "") {
            if (source != null) {
                return <div className={classes.footer}>
                    This data represent the keywords of: {source.name}
                </div>;
            } else {
                return <div className={classes.footer}>
                    This data represent the keywords GLOBALLY
                </div>;
            }
        } else {
            return null;
        }
    }


    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={wordcloudPage}
                    onChange={handleWordcloudChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<TodayIcon/>} label="Daily"/>
                    <Tab icon={<DateRangeIcon/>} label="Weekly"/>
                    <Tab icon={<EventIcon/>} label="Monthly"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={wordcloudPage}
                onChangeIndex={handleWordcloudChangeIndex}
            >
                <TabPanelContainer value={wordcloudPage} index={0}>
                    <Wordcloud words={wordsDaily} callback={onWordClickCallback}/>
                </TabPanelContainer>
                <TabPanelContainer value={wordcloudPage} index={1}>
                    <Wordcloud words={wordsWeekly} callback={onWordClickCallback}/>
                </TabPanelContainer>
                <TabPanelContainer value={wordcloudPage} index={2}>
                    <Wordcloud words={wordsMonthly} callback={onWordClickCallback}/>
                </TabPanelContainer>
            </SwipeableViews>

            {viewFooter()}

        </div>
    );
})