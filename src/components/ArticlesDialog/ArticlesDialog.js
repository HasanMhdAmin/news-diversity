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
import {getArticlesByKeyword} from "../../connection/Connection";

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
    }
}));

export default function ArticlesDialog(props) {

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

        return (
            <Card className={classes.card}>

                {mercuryLoading || loading ? (
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
                            <CardActionArea
                                onClick={() => window.open(article.link, '_blank')}
                            >
                                <div className={classes.title}>
                                    {article.title}
                                </div>
                            </CardActionArea>
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
                    </div>

                </CardContent>
            </Card>
        );
    }

    function getData() {
        console.log("send request for : " + props.word);
        if (props.word.length > 0) {
            getArticlesByKeyword(props.word, "1").then(result => {
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
                Articles related to `<b>{props.word}</b>`
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
}