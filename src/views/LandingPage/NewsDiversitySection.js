import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import SwipeableViews from "react-swipeable-views";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";


export default function NewsDiversitySection(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    React.useEffect(() => {

    }, []);

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    // indicatorColor="secondary"
                    // textColor="secondary"
                    // aria-label="icon label tabs example"
                >
                    <Tab icon={<TodayIcon/>} label="RECENTS"/>
                    <Tab icon={<DateRangeIcon/>} label="FAVORITES"/>
                    <Tab icon={<EventIcon/>} label="NEARBY"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanelContainer value={value} index={0}>
                    Page 1
                </TabPanelContainer>
                <TabPanelContainer value={value} index={1}>
                    Page 2
                </TabPanelContainer>
                <TabPanelContainer value={value} index={2}>
                    Page 3
                </TabPanelContainer>
            </SwipeableViews>

        </div>
    );
}