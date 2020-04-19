import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from '@material-ui/core/styles';
import TagView from "../TagView/TagView";
import Mercury from "@postlight/mercury-parser";
import CardActionArea from "@material-ui/core/CardActionArea";

var mock = [
    {
        "title": "The Guardian joins forces with hundreds of newsrooms to promote climate solutions",
        "link": "https://www.theguardian.com/environment/2020/apr/19/the-guardian-joins-forces-with-hundreds-of-newsrooms-to-promote-climate-solutions",
        "description": "<p>As the 50th anniversary of Earth Day approaches, we’re partnering with newsrooms around the world to report on solutions to the climate crisis – and drive hope</p><p>Even as the coronavirus pandemic terrorizes the world, there’s another global emergency the media can’t afford to stop covering.</p><p>Fifty years ago this week, the environmental movement staged the first Earth Day demonstration to call attention to environmental degradation and demand reform. In the half century since, climate change has emerged as an existential global threat.</p> <a href=\"https://www.theguardian.com/environment/2020/apr/19/the-guardian-joins-forces-with-hundreds-of-newsrooms-to-promote-climate-solutions\">Continue reading...</a>",
        "pubDate": "2020-04-19T10:00:34.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Climate change: 'Bath sponge' breakthrough could boost cleaner cars",
        "link": "https://www.bbc.co.uk/news/science-environment-52328786",
        "description": "A new aluminium-based material could make hydrogen-powered cars more practical and less expensive.",
        "pubDate": "2020-04-18T01:48:46.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Climate change: US megadrought 'already under way'",
        "link": "https://www.bbc.co.uk/news/science-environment-52312260",
        "description": "A drought as bad as any in recorded history may be under way in the US.",
        "pubDate": "2020-04-16T18:21:53.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Climate change: Blue skies pushed Greenland 'into the red'",
        "link": "https://www.bbc.co.uk/news/science-environment-52286165",
        "description": "Cloud-free skies played a key role in one of the worst years for Greenland's ice sheet.",
        "pubDate": "2020-04-15T13:30:18.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Strengthen worldwide climate commitments to improve economy, study finds",
        "link": "https://www.theguardian.com/environment/2020/apr/14/worldwide-climate-commitments-economy-emissions",
        "description": "<p>Global economy could lose out by $600tn by end of century on current emissions targets</p><p>Every country in the world would be economically better off if all could agree to strengthen their commitments on the climate crisis through international cooperation, new research has found.</p><p>But if countries go no further than their current CO<sub>2</sub> pledges – which are too weak to meet the goals of the <a href=\"https://www.theguardian.com/environment/2015/dec/13/paris-climate-deal-cop-diplomacy-developing-united-nations\">Paris agreement</a>, and would lead to dangerous levels of global heating – then they face steep economic losses.</p> <a href=\"https://www.theguardian.com/environment/2020/apr/14/worldwide-climate-commitments-economy-emissions\">Continue reading...</a>",
        "pubDate": "2020-04-14T15:00:18.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Tackling climate change is vital for the strongest economic recovery after coronavirus | Patrick Suckling",
        "link": "https://www.theguardian.com/commentisfree/2020/apr/14/reckoning-with-climate-change-will-support-the-strongest-possible-economic-recovery-after-coronavirus",
        "description": "<p>The Covid-19 pandemic is a harbinger of climate disasters to come and the resilience we need to build into our systems</p><p>Recovery from coronavirus must reckon with <a href=\"https://www.theguardian.com/environment/climate-change\">climate change</a>. The current and urgent focus properly needs to be flattening the curve and saving lives.</p><p>Yet even as this overriding priority absorbs us, governments now need to be thinking about how to support the strongest possible recovery as we emerge from this crisis.</p> <a href=\"https://www.theguardian.com/commentisfree/2020/apr/14/reckoning-with-climate-change-will-support-the-strongest-possible-economic-recovery-after-coronavirus\">Continue reading...</a>",
        "pubDate": "2020-04-14T02:17:44.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "The Guardian view on the climate and coronavirus: global warnings | Editorial",
        "link": "https://www.theguardian.com/commentisfree/2020/apr/12/the-guardian-view-on-the-climate-and-coronavirus-global-warnings",
        "description": "<p>Steep falls in emissions have been the pandemic’s immediate effect. But what’s needed is a green recovery</p><ul><li><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">Coronavirus – latest updates</a></li><li><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">See all our coronavirus coverage</a></li></ul><p>So far, discussions of a coronavirus exit strategy have mainly focused on the steps that could bring an end to the lockdown. In the short term, both in the UK and elsewhere, there is nothing more desirable than letting people resume their lives, once it is safe to do so.</p><p>But the speed of the “return to normal” is not the only thing that matters. The manner in which the world’s leaders manage the colossal economic and political shocks caused by the virus is also of the utmost importance. And at the top of their list of priorities, alongside human welfare, must be the biosphere and its future.</p> <a href=\"https://www.theguardian.com/commentisfree/2020/apr/12/the-guardian-view-on-the-climate-and-coronavirus-global-warnings\">Continue reading...</a>",
        "pubDate": "2020-04-12T17:25:49.000+0000",
        "source": "The Guardian",
        "categories": [
            "Politics",
            "Health",
            "Science"
        ]
    },
    {
        "title": "Climate crisis: in coronavirus lockdown, nature bounces back – but for how long?",
        "link": "https://www.theguardian.com/world/2020/apr/09/climate-crisis-amid-coronavirus-lockdown-nature-bounces-back-but-for-how-long",
        "description": "<p>While carbon emissions fall as human activity decreases, in the end it will be about the politics </p><ul><li><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">Coronavirus – latest updates</a></li><li><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">See all our coronavirus coverage</a></li></ul><p>The environmental changes wrought by the coronavirus were first visible from space. Then, as the disease and the lockdown spread, they could be sensed in the sky above our heads, the air in our lungs and even the ground beneath our feet.</p><p>While the human toll mounted horrendously from a single case in Wuhan to a global pandemic that has so far killed more than 88,000 people, nature, it seemed, was increasingly able to breathe more easily.</p> <a href=\"https://www.theguardian.com/world/2020/apr/09/climate-crisis-amid-coronavirus-lockdown-nature-bounces-back-but-for-how-long\">Continue reading...</a>",
        "pubDate": "2020-04-09T15:00:02.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Climate change: UK forests 'could do more harm than good'",
        "link": "https://www.bbc.co.uk/news/science-environment-52200045",
        "description": "Mass tree planting could harm the environment if badly planned, a report warns.",
        "pubDate": "2020-04-07T11:20:00.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Coronavirus: Don't bail out airlines, say climate campaigners",
        "link": "https://www.bbc.co.uk/news/business-52190502",
        "description": "Climate change: Use crisis to turn aviation green, say campaigners",
        "pubDate": "2020-04-06T20:55:04.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Climate monitoring and research could fall victim to coronavirus, scientists fear",
        "link": "https://www.theguardian.com/science/2020/apr/03/climate-monitoring-research-coronavirus-scientists",
        "description": "<p>Health restrictions have already hit some long-term projects but routine monitoring could be affected if the pandemic drags on</p><ul><li><a href=\"https://www.theguardian.com/us-news/series/us-politics-live/latest\">Coronavirus – latest US updates</a></li><li><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">C</a><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">oronavirus – latest global updates</a></li><li><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">See all our coronavirus coverage</a></li></ul><p>The coronavirus pandemic has stalled scientific fieldwork and may even start to affect the monitoring of the climate, scientists have warned.</p><p>Major projects to gather environmental data have been postponed or canceled over concerns that teams of researchers working together will spread the Covid-19 virus.</p> <a href=\"https://www.theguardian.com/science/2020/apr/03/climate-monitoring-research-coronavirus-scientists\">Continue reading...</a>",
        "pubDate": "2020-04-03T09:00:15.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health",
            "Science"
        ]
    },
    {
        "title": "'We must use this time well': climate experts hopeful after Cop26 delay",
        "link": "https://www.theguardian.com/environment/2020/apr/02/we-must-use-this-time-well-climate-experts-hopeful-after-cop26-delay-coronavirus",
        "description": "<p>Moving summit gives world time to respond to coronavirus and may allow a new US leader to join talks</p><p>Green campaigners and climate leaders have vowed to keep up the pressure on governments around the world to make stringent new commitments on the climate crisis, as a vital <a href=\"https://www.theguardian.com/news/2019/dec/02/climate-crisis-what-is-cop-and-can-it-save-the-world\">UN climate summit</a> was delayed until next year because of the coronavirus pandemic.</p><p>The Cop26 talks were scheduled to take place this November in Glasgow, but the UK hosts won a delay on Wednesday night from the UN and other nations, after <a href=\"https://www.theguardian.com/environment/2020/mar/02/vital-cop26-climate-talks-could-be-derailed-by-coronavirus\">weeks of speculation</a> the talks would be cancelled.</p> <a href=\"https://www.theguardian.com/environment/2020/apr/02/we-must-use-this-time-well-climate-experts-hopeful-after-cop26-delay-coronavirus\">Continue reading...</a>",
        "pubDate": "2020-04-02T12:01:16.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Cop26 climate talks in Glasgow postponed until 2021",
        "link": "https://www.theguardian.com/environment/2020/apr/01/uk-likely-to-postpone-cop26-un-climate-talks-glasgow-coronavirus",
        "description": "<p>Crucial UN conference will be delayed until next year as a result of the coronavirus crisis</p><ul><li><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">Coronavirus – latest updates</a></li><li><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">See all our coronavirus coverage</a></li></ul><p>The UN climate talks due to be held in Glasgow later this year have been postponed as governments around the world struggle to halt the spread of <a href=\"https://www.theguardian.com/world/2020/apr/01/nhs-rules-hampering-coronavirus-testing-drive-say-scientists\">coronavirus</a>.</p><p>The most important climate negotiations since the Paris agreement in 2015 were scheduled to take place this November to put countries back on track to avoid climate breakdown. They will <a href=\"https://www.theguardian.com/environment/2020/mar/18/cop26-boris-johnson-urged-resist-calls-postpone-climate-talks-coronavirus\">now be pushed back</a> to 2021.</p> <a href=\"https://www.theguardian.com/environment/2020/apr/01/uk-likely-to-postpone-cop26-un-climate-talks-glasgow-coronavirus\">Continue reading...</a>",
        "pubDate": "2020-04-01T20:20:07.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Will the coronavirus kill the oil industry and help save the climate?",
        "link": "https://www.theguardian.com/environment/2020/apr/01/the-fossil-fuel-industry-is-broken-will-a-cleaner-climate-be-the-result",
        "description": "<p>Analysts say the coronavirus and a savage price war means the oil and gas sector will never be the same again</p><p>The plunging demand for oil wrought by the coronavirus pandemic combined with a savage price war has left the fossil fuel industry <a href=\"https://www.bloomberg.com/news/articles/2020-03-29/the-global-oil-market-is-broken-drowning-in-crude-nobody-needs\">broken</a> and in survival mode, according to analysts. It faces the gravest challenge in its 100-year history, they say, one that will permanently alter the industry. With some calling the scene a “<a href=\"https://www.ft.com/content/7afb4c04-6d58-11ea-89df-41bea055720b\">hellscape</a>”, the least lurid description is “<a href=\"https://www.iea.org/articles/energy-market-turmoil-deepens-challenges-for-many-major-oil-and-gas-exporters?utm_campaign=IEA%20newsletters&amp;utm_source=SendGrid&amp;utm_medium=Email\">unprecedented</a>”.</p><p>A key question is whether this will permanently alter the course of the climate crisis. Many experts think it might well do so, pulling forward the date at which demand for oil and gas peaks, never to recover, and allowing the atmosphere to gradually heal.</p> <a href=\"https://www.theguardian.com/environment/2020/apr/01/the-fossil-fuel-industry-is-broken-will-a-cleaner-climate-be-the-result\">Continue reading...</a>",
        "pubDate": "2020-04-01T06:00:14.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "Climate change: Warming clips the nightingale's wings",
        "link": "https://www.bbc.co.uk/news/science-environment-52111309",
        "description": "Rising temperatures may be having a profound impact on one of the world's favourite songbirds.",
        "pubDate": "2020-04-01T01:46:08.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Delay is deadly: what Covid-19 tells us about tackling the climate crisis | Jonathan Watts",
        "link": "https://www.theguardian.com/commentisfree/2020/mar/24/covid-19-climate-crisis-governments-coronavirus",
        "description": "<p>Rightwing governments have denied the problem and been slow to act. With coronavirus and the climate, this costs lives</p><p><a href=\"https://www.theguardian.com/world/series/coronavirus-live/latest\">• Coronavirus latest updates</a></p><p><a href=\"https://www.theguardian.com/world/coronavirus-outbreak\">• See all our coronavirus coverage</a></p><p>The coronavirus pandemic has brought urgency to the defining political question of our age: how to distribute risk. As with the climate crisis, neoliberal capitalism is proving particularly ill-suited to this.</p><p>Like global warming, but in close-up and fast-forward, the Covid-19 outbreak shows how lives are lost or saved depending on a government’s propensity to acknowledge risk, <a href=\"https://www.theguardian.com/world/2020/mar/09/how-did-china-get-grips-with-coronavirus-outbreak\">act rapidly to contain it</a>, and share the consequences.</p> <a href=\"https://www.theguardian.com/commentisfree/2020/mar/24/covid-19-climate-crisis-governments-coronavirus\">Continue reading...</a>",
        "pubDate": "2020-03-24T11:14:23.000+0000",
        "source": "The Guardian",
        "categories": [
            "Health"
        ]
    },
    {
        "title": "The 'climate doomers' preparing for society to fall apart",
        "link": "https://www.bbc.co.uk/news/stories-51857722",
        "description": "Few scientists think climate change will cause society to collapse any time soon - but some people are getting ready anyway.",
        "pubDate": "2020-03-16T00:05:13.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Climate change: Will planting millions of trees really save the planet?",
        "link": "https://www.bbc.co.uk/news/science-environment-51633560",
        "description": "From Greta Thunberg to oil firms, people are pushing for more trees to be planted - but why?",
        "pubDate": "2020-03-14T00:53:00.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "Greta Thunberg: What does the teenage climate change activist want?",
        "link": "https://www.bbc.co.uk/news/world-europe-49918719",
        "description": "The Swedish teenager started a climate change protest that grew into a global movement of millions.",
        "pubDate": "2020-02-28T00:28:47.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    },
    {
        "title": "What is climate change? A really simple guide",
        "link": "https://www.bbc.co.uk/news/science-environment-24021772",
        "description": "BBC News looks at what we know and don't know about the Earth's changing climate.",
        "pubDate": "2020-01-16T08:13:36.000+0000",
        "source": "BBC News",
        "categories": [
            "Science"
        ]
    }
];

const useStyles = makeStyles((theme) => ({
    card: {
        // maxWidth: 1000,
        margin: theme.spacing(2),
    },
    media: {
        height: 250,
    },
    title: {
        fontWeight: "bolder",
        fontSize: 20,
        marginTop: 5,
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    source: {
        fontSize: 12,
    }
}));

export default function ArticlesDialog(props) {

    function Media(props) {
        // const { loading = false } = props;
        const classes = useStyles();

        const [mercuryItem, setMercuryItem] = React.useState([]);
        const [mercuryLoading, setMercuryLoading] = React.useState(true);

        const article = props.item;

        React.useEffect(() => {
            var url = "https://cors-anywhere.herokuapp.com/" + article.link;
            console.log("MercuryResult: start" + JSON.stringify(article))

            Mercury.parse(url).then(result => {
                setMercuryItem(result)
                setMercuryLoading(false)
            });
        }, []);

        return (
            <Card className={classes.card}>
                <CardActionArea onClick={() => window.open(article.link, '_blank')}>

                    {mercuryLoading ? (
                        <Skeleton animation="wave" variant="rect" className={classes.media}/>
                    ) : (
                        <CardMedia
                            className={classes.media}
                            image={mercuryItem.lead_image_url}
                            title="Ted talk"
                        />
                    )}

                    <CardContent>

                        <div>

                            <TagView items={article.categories}/>

                            <div className={classes.title}>
                                {article.title}
                            </div>

                            <div className={classes.source}>
                                {article.source}
                            </div>

                            {mercuryLoading ? (
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                                    <Skeleton animation="wave" height={10} width="80%"/>
                                </React.Fragment>
                            ) : (
                                <div className={classes.description}>
                                    {mercuryItem.excerpt}
                                </div>
                            )}
                        </div>

                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }


    const articles = mock.map((article) =>
        <Media item={article}/>
    );

    return (
        <Dialog
            open={props.isArticlesDialogOpened}
            onClose={props.handleCloseArticlesDialog}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent dividers={true}>

                {/*<Media loading />*/}
                {articles}

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseArticlesDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    );
}