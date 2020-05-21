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
import {getArticlesByCategory, getArticlesByKeyword} from "../../connection/Connection";

const useStyles = makeStyles((theme) => ({
    card: {
        // maxWidth: 1000,
        margin: theme.spacing(2),
    },
    media: {
        height: 250,
        minWidth: 500,
    },
    title: {
        fontWeight: "bolder",
        fontSize: 20,
        marginTop: 5,
        marginBottom: 10,
        color: "black",
        textDecoration: 'none',
        "&:hover": {
            textDecoration: "underline"
        }
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    source: {
        fontSize: 12,
    },
    date: {
        fontSize: 12,
        marginTop: 15,
        textAlign: 'right'
    }
}));

export const ArticlesDialog = React.forwardRef((props, ref) => {

    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    function Media(props) {
        // const { loading = false } = props;
        const classes = useStyles();

        const [mercuryItem, setMercuryItem] = React.useState([]);
        const [mercuryLoading, setMercuryLoading] = React.useState(true);

        const article = props.item;

        React.useEffect(() => {
            if (!loading) {
                var url = "https://cors-anywhere.herokuapp.com/" + article.link;
                Mercury.parse(url).then(result => {
                    setMercuryItem(result)
                    setMercuryLoading(false)
                });
            }
        }, []);

        const parseDate = (fullDate) => {
            var date = fullDate.split('T')[0]
            fullDate = new Date(date)
            var twoDigitMonth = (parseInt(fullDate.getMonth() + 1)) + "";
            if (twoDigitMonth.length === 1)
                twoDigitMonth = "0" + twoDigitMonth;
            var twoDigitDate = fullDate.getDate() + "";
            if (twoDigitDate.length === 1)
                twoDigitDate = "0" + twoDigitDate;
            return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        };

        return (
            <Card className={classes.card}>

                {mercuryLoading || loading ? (
                    <Skeleton animation="wave" variant="rect" className={classes.media}/>
                ) : (
                    <a href={article.link} target="_blank">
                        <CardMedia
                            className={classes.media}
                            image={mercuryItem.lead_image_url}
                            title="Ted talk"
                        />
                    </a>
                )}

                <CardContent>

                    <div>

                        {loading ? (
                            <React.Fragment>
                                <Skeleton animation="wave" height={10} width="30%"/>
                            </React.Fragment>
                        ) : (
                            <TagView items={article.categories}/>

                        )}

                        {loading ? (
                            <React.Fragment>
                                <Skeleton animation="wave" height={30} width="100%"/>
                            </React.Fragment>
                        ) : (
                            <a className={classes.title} href={article.link} target="_blank">
                                <CardActionArea
                                    // onClick={() => window.open(article.link, '_blank')}
                                >
                                    {article.title.length === 0 ? (
                                        <div className={classes.title}>
                                            {mercuryItem.title}
                                        </div>
                                    ) : (
                                        <div className={classes.title}>
                                            {article.title}
                                        </div>

                                    )}
                                </CardActionArea>
                            </a>
                        )}

                        {loading ? (
                            <React.Fragment>
                                <Skeleton animation="wave" height={10} width="10%"/>
                            </React.Fragment>
                        ) : (
                            <div className={classes.source}>
                                {article.source}
                            </div>
                        )}

                        {mercuryLoading || loading ? (
                            <React.Fragment>
                                <Skeleton animation="wave" height={20} style={{marginBottom: 6}}/>
                                <Skeleton animation="wave" height={20} width="80%"/>
                            </React.Fragment>
                        ) : (
                            <div className={classes.description}>
                                {mercuryItem.excerpt}
                            </div>
                        )}

                        {loading ? (
                            <React.Fragment>
                                <Skeleton animation="wave" height={10} width="30%"/>
                            </React.Fragment>
                        ) : (
                            <div className={classes.date}>
                                Published on <b>{parseDate(article.pubDate)}</b>
                            </div>
                        )}
                    </div>

                </CardContent>
            </Card>
        );
    }

    function getData() {
        console.log("send request for : " + props.word);
        let url = "";
        if (props.source != null)
            url = props.source.domain
        if (props.word.length > 0) {
            getArticlesByKeyword(props.word, url, "1").then(result => {
                setArticles(result.data)
                setLoading(false)
            });
        } else if (props.category.length > 0) {
            getArticlesByCategory(props.category, url, "1").then(result => {
                setArticles(result.data)
                setLoading(false)
            });
        }
    }

    const onEntered = () => {
        setArticles([])
        setLoading(true)
        getData()
        console.log(" onEntered");
    };

    const onExited = () => {
        setArticles([])
        console.log(" onExited");
    }

    const header = () => {
        let url = "";
        if (props.source != null) {
            url = props.source.domain
        }
        if (props.word.length > 0) {
            if (url.length > 0)
                return <div>Articles related to `<b>{props.word}</b>`
                    <br/>
                    Published by <b>{props.source.name}</b></div>;
            return <div>Articles related to `<b>{props.word}</b>`</div>;
        }

        if (props.category.length > 0) {
            if (url.length > 0)
                return <div>Articles belong to <TagView items={[props.category]}/>
                    <br/>
                    Published by <b>{props.source.name}</b></div>;
            return <div>Articles belong to <TagView items={[props.category]} header/></div>;
        }

    }

    return (
        <Dialog
            open={props.isArticlesDialogOpened}
            onClose={props.handleCloseArticlesDialog}
            scroll={'paper'}
            onEntered={onEntered}
            onExited={onExited}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">
                {header()}
            </DialogTitle>
            <DialogContent dividers={true}>
                {loading ? (
                    <div>
                        <Media/>
                        <Media/>
                        <Media/>
                    </div>
                ) : (
                    articles.map((article, index) =>
                        <Media key={index} item={article}/>
                    )
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseArticlesDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    );
})