import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import SwipeableViews from "react-swipeable-views";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";

import {Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis,} from 'recharts';
import {getDiversity} from "../../connection/Connection";
import COLOR from "../../resources/Color";

//
// const serverMock = {
//     "business": 13.1021185,
//     "politics": 15.799614,
//     "health": 27.938341,
//     "entertainment": 21.194605,
//     "science": 12.524084,
//     "technology": 9.441233,
//     "totalDiversity": 96.324844
// };
//
// const dataBarChart = [
//     {
//         name: 'Business', diversity: serverMock.business, color: "#FF7F0E",
//     },
//     {
//         name: 'Politics', diversity: serverMock.politics, color: "#D62728",
//     },
//     {
//         name: 'Health', diversity: serverMock.health, color: "#2CA02C",
//     },
//     {
//         name: 'Entertainment', diversity: serverMock.entertainment, color: "#9467BD",
//     },
//     {
//         name: 'Science', diversity: serverMock.science, color: "#1F77B4",
//     },
//     {
//         name: 'Technology', diversity: serverMock.technology, color: "#8C564B",
//     },
// ];

export default function NewsDiversitySection(props) {
    const [page, setPage] = React.useState(0);
    const [diversityDaily, setDiversityDaily] = React.useState([]);
    const [diversityWeekly, setDiversityWeekly] = React.useState([]);
    const [diversityMonthly, setDiversityMonthly] = React.useState([]);


    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    const handleChangeIndex = (index) => {
        setPage(index);
    };

    React.useEffect(() => {
        getDiversity("", "daily").then(result => {
            console.log("wordcloud: " + result.data);
            setResult(result, setDiversityDaily);
        });
        getDiversity("", "weekly").then(result => {
            console.log("wordcloud: " + result.data);
            setResult(result, setDiversityWeekly);
        });
        getDiversity("", "monthly").then(result => {
            console.log("wordcloud: " + result.data);
            setResult(result, setDiversityMonthly);
        });
    }, []);

    function setResult(result, setter) {
        // TODO match categories with server
        setter([{
            name: 'Business', diversity: result.data.business, color: COLOR.ORANGE,
        },
            {
                name: 'Politics', diversity: result.data.politics, color: COLOR.RED,
            },
            {
                name: 'Health', diversity: result.data.health, color: COLOR.GREEN,
            },
            {
                name: 'Entertainment', diversity: result.data.entertainment, color: COLOR.LILAC,
            },
            {
                name: 'Science', diversity: result.data.science, color: COLOR.BLUE,
            },
            {
                name: 'Technology', diversity: result.data.technology, color: COLOR.BROWN,
            }])

    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={page}
                    onChange={handleChange}
                    variant="fullWidth"
                    // indicatorColor="secondary"
                    // textColor="secondary"
                    // aria-label="icon label tabs example"
                >
                    <Tab icon={<TodayIcon/>} label="Daily"/>
                    <Tab icon={<DateRangeIcon/>} label="Weekly"/>
                    <Tab icon={<EventIcon/>} label="Monthly"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={page}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanelContainer value={page} index={0}>
                    <BarChart
                        width={550}
                        height={400}
                        data={diversityDaily}
                        margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                        }}
                        barSize={50}
                    >
                        <XAxis dataKey="name" scale="point" padding={{left: 30, right: 30}}/>
                        <YAxis type="number" domain={[0, 100]}/>
                        <Tooltip/>
                        {/*<Legend />*/}
                        <CartesianGrid strokeDasharray="1"/>
                        <Bar dataKey="diversity" fill="#000">
                            {diversityDaily.map((entry, index) => (
                                <Cell fill={entry.color}/>
                            ))}
                        </Bar>
                    </BarChart>
                </TabPanelContainer>
                <TabPanelContainer value={page} index={1}>
                    <BarChart
                        width={550}
                        height={400}
                        data={diversityWeekly}
                        margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                        }}
                        barSize={50}
                    >
                        <XAxis dataKey="name" scale="point" padding={{left: 30, right: 30}}/>
                        <YAxis type="number" domain={[0, 100]}/>
                        <Tooltip/>
                        {/*<Legend />*/}
                        <CartesianGrid strokeDasharray="1"/>
                        <Bar dataKey="diversity" fill="#000">
                            {diversityWeekly.map((entry, index) => (
                                <Cell fill={entry.color}/>
                            ))}
                        </Bar>
                    </BarChart>
                </TabPanelContainer>
                <TabPanelContainer value={page} index={2}>
                    <BarChart
                        width={550}
                        height={400}
                        data={diversityMonthly}
                        margin={{
                            top: 5, right: 5, left: 5, bottom: 5,
                        }}
                        barSize={50}
                    >
                        <XAxis dataKey="name" scale="point" padding={{left: 30, right: 30}}/>
                        <YAxis type="number" domain={[0, 100]}/>
                        <Tooltip/>
                        {/*<Legend />*/}
                        <CartesianGrid strokeDasharray="1"/>
                        <Bar dataKey="diversity" fill="#000">
                            {diversityMonthly.map((entry, index) => (
                                <Cell fill={entry.color}/>
                            ))}
                        </Bar>
                    </BarChart>
                </TabPanelContainer>
            </SwipeableViews>

        </div>
    );
}