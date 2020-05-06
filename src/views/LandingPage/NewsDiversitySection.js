import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import SwipeableViews from "react-swipeable-views";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";

import {Bar, BarChart, PieChart, Pie, CartesianGrid, Cell, Tooltip, XAxis, YAxis, Legend} from 'recharts';
import {getDiversity} from "../../connection/Connection";
import COLOR from "../../resources/Color";
import Skeleton from "@material-ui/lab/Skeleton";

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
            setResult(result, setDiversityDaily);
        });
        getDiversity("", "weekly").then(result => {
            setResult(result, setDiversityWeekly);
        });
        getDiversity("", "monthly").then(result => {
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
                name: 'Science & Technology', diversity: result.data.scienceTechnology, color: COLOR.BLUE,
            },
            {
                name: 'Sport', diversity: result.data.sport, color: COLOR.BROWN,
            }])

    }

    const data = [
        { name: 'Group A', diversity: 400 },
        { name: 'Group B', diversity: 300 },
        { name: 'Group C', diversity: 300 },
        { name: 'Group D', diversity: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
                                       cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
                                   }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                <tspan dx="1.0em" dy="0.2em" alignmentBaseline="middle" fontSize="16">{`${(percent * 100).toFixed(0)}%`}</tspan>
            </text>

        );
    };

    const renderCustomLabel = item => {

        const radius = item.innerRadius + (item.outerRadius - item.innerRadius) * 0.5;
        const x = item.cx + radius * Math.cos(-item.midAngle * RADIAN);
        const y = item.cy + radius * Math.sin(-item.midAngle * RADIAN);

        return (
            <text
                // fill={item.fill}
                fill="white"
                x={x}
                y={y}
                stroke='none'
                alignmentBaseline='middle'
                className='recharts-text recharts-pie-label-text'
                textAnchor={item.x > item.cx ? 'start' : 'end'}
            >
                <tspan x={item.x} textAnchor={item.textAnchor} dy='0em'>{item.name}</tspan>
            </text>
        )
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={page}
                    onChange={handleChange}
                    variant="fullWidth"
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
                    {diversityDaily.length === 0 ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={30} width="100%"/>
                        </React.Fragment>
                    ) : (

                        <PieChart width={400} height={400}>
                            <Pie
                                data={diversityDaily}
                                cx={200}
                                cy={200}
                                isAnimationActive={false}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                // label={item => renderCustomLabel(item)}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="diversity"
                            >
                                {
                                    diversityDaily.map((entry, index) =>
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    )
                                }
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }} />
                        </PieChart>
                    )}
                </TabPanelContainer>
                <TabPanelContainer value={page} index={1}>
                    {diversityWeekly.length === 0 ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={30} width="100%"/>
                        </React.Fragment>
                    ) : (

                        <PieChart width={400} height={400}>
                            <Pie
                                data={diversityWeekly}
                                cx={200}
                                cy={200}
                                isAnimationActive={false}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                // label={item => renderCustomLabel(item)}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="diversity"
                            >
                                {
                                    diversityWeekly.map((entry, index) =>
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    )
                                }
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }} />
                        </PieChart>
                    )}
                </TabPanelContainer>
                <TabPanelContainer value={page} index={2}>
                    {diversityMonthly.length === 0 ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={30} width="100%"/>
                        </React.Fragment>
                    ) : (

                        <PieChart width={400} height={400}>
                            <Pie
                                data={diversityMonthly}
                                cx={200}
                                cy={200}
                                isAnimationActive={false}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                // label={item => renderCustomLabel(item)}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="diversity"
                            >
                                {
                                    diversityMonthly.map((entry, index) =>
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    )
                                }
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }} />
                        </PieChart>
                    )}
                </TabPanelContainer>
            </SwipeableViews>

        </div>
    );
}