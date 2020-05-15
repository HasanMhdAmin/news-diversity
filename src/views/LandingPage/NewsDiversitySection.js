import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import SwipeableViews from "react-swipeable-views";
import TabPanelContainer from "../../components/TabPanel/TabPanelContainer";

import {Cell, Legend, Pie, PieChart, Sector, Tooltip} from 'recharts';
import {getDiversity} from "../../connection/Connection";
import COLOR from "../../resources/Color";
import Skeleton from "@material-ui/lab/Skeleton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: "center",
        marginTop: 25,
        fontSize: 12
    },
    cell: {
        "&:hover": {
            cursor: "pointer"
        }
    },
}));

export const NewsDiversitySection = React.forwardRef((props, ref) => {
    const [page, setPage] = React.useState(0);
    const [diversityDaily, setDiversityDaily] = React.useState([]);
    const [diversityWeekly, setDiversityWeekly] = React.useState([]);
    const [diversityMonthly, setDiversityMonthly] = React.useState([]);
    const [source, setSource] = React.useState();
    const [activeCell, setActiveCell] = React.useState(null);

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

    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    const handleChangeIndex = (index) => {
        setPage(index);
    };

    React.useEffect(() => {
        sendRequests("");
    }, []);

    function sendRequests(url) {
        console.log("sendRequests for url: " + url)
        setDiversityDaily([])
        setDiversityWeekly([])
        setDiversityMonthly([])
        getDiversity(url, "daily").then(result => {
            setResult(result, setDiversityDaily);
        });
        getDiversity(url, "weekly").then(result => {
            setResult(result, setDiversityWeekly);
        });
        getDiversity(url, "monthly").then(result => {
            setResult(result, setDiversityMonthly);
        });

    }

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

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
                                       cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
                                   }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                <tspan dx="1.0em" dy="0.2em" alignmentBaseline="middle"
                       fontSize="16">{`${(percent * 100).toFixed(0)}%`}</tspan>
            </text>

        );
    };


    const onHover = (data, index) => {
        setActiveCell(index)
    };
    const onHoverOut = (data, index) => {
        setActiveCell(null)
    };
    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;

        return (
            <g>
                <Sector
                    className={classes.cell}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius+15}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    onClick={(e) => { console.log(payload.payload)}}
                    fill={fill}
                />
            </g>
        );
    };

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
                                activeIndex={activeCell}
                                activeShape={renderActiveShape}
                                onMouseEnter={onHover}
                                onMouseLeave={onHoverOut}
                            >
                                {
                                    diversityDaily.map((entry, index) =>
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    )
                                }
                            </Pie>
                            <Tooltip cursor={false}/>
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }}/>
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
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
                                    )
                                }
                            </Pie>
                            <Tooltip/>
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }}/>
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
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
                                    )
                                }
                            </Pie>
                            <Tooltip/>
                            <Legend wrapperStyle={{
                                bottom: "-15px"
                            }}/>
                        </PieChart>
                    )}
                </TabPanelContainer>
            </SwipeableViews>
            {source != null ? (
                <div className={classes.footer}>
                    This data represent the diversity of: {source.name}
                </div>
            ) : (
                <div className={classes.footer}>
                    This data represent the diversity GLOBALLY
                </div>)
            }
        </div>
    );
})