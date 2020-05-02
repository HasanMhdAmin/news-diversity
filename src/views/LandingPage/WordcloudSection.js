import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import Wordcloud from "../../components/Wordcloud/Wordcloud";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";
import {getKeyword} from "../../connection/Connection";
import SwipeableViews from "react-swipeable-views";


export default function WordcloudSection(props) {
    const [wordcloudPage, setWordcloudPage] = React.useState(0);
    const [wordsDaily, setWordsDaily] = React.useState([]);
    const [wordsWeekly, setWordsWeekly] = React.useState([]);
    const [wordsMonthly, setWordsMonthly] = React.useState([]);

    const handleWordcloudChange = (event, newValue) => {
        setWordcloudPage(newValue);
    };

    const handleWordcloudChangeIndex = (index) => {
        setWordcloudPage(index);
    };

    React.useEffect(() => {
        getKeyword("", "daily").then(result => {
            // console.log("wordcloud: " + result.data);
            setWordsDaily(result.data);
        });
        getKeyword("", "weekly").then(result => {
            // console.log("wordcloud: " + result.data);
            setWordsWeekly(result.data);
        });
        getKeyword("", "monthly").then(result => {
            // console.log("wordcloud: " + result.data);
            setWordsMonthly(result.data);
        });
    }, []);

    const onWordClickCallback = {
        getWordTooltip: word => `The word "${word.text}" appears ${word.value} times.`,
        onWordClick: word => props.handleOpenArticlesDialog(word.text)
    };


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
                    <Wordcloud words={wordsWeekly}/>
                </TabPanelContainer>
                <TabPanelContainer value={wordcloudPage} index={2}>
                    <Wordcloud words={wordsMonthly}/>
                </TabPanelContainer>
            </SwipeableViews>


        </div>
    );
}