import React from 'react';
import SourceAutocomplete from "../../components/Autocomplete/Autocomplete";
import './LandingPage.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {NewsDiversitySection} from "./NewsDiversitySection";
import {WordcloudSection} from "./WordcloudSection";
import {ArticlesDialog} from "../../components/ArticlesDialog/ArticlesDialog";
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    footerContainer: {
        backgroundColor: "#f4f6f8",
        textAlign: "center",
        bottom: 0,
        position: "fixed",
        width: "100%",
    },
    footer: {
        marginRight: "auto",
        marginLeft: "auto",
        padding: 30,
    },
    link: {
        textDecoration: "none",
        color: "#2076b4",
        "&:hover": {
            textDecoration: "none",
            color: "#59b7ff",
        }
    },
    search: {
        borderRadius: 15,
        boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.2)",
        padding: 45,
        background: "linear-gradient(90deg, rgba(29,115,255,1) 0%, rgba(22,35,126,1) 100%)",
    }

}));


export default function LandingPage(props) {
    const classes = useStyles();
    const [isArticlesDialogOpened, setArticlesDialogOpened] = React.useState(false);
    const [word, setWord] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [source, setSource] = React.useState(null);

    const newsDiversityChild = React.useRef();
    const wordCloudChild = React.useRef();

    const handleOpenArticlesDialog = (word) => {
        setArticlesDialogOpened(true);
        console.log("LandingPage: word" + word)
        setWord(word)
        setCategory("")
    };

    const handleOpenArticlesByCategoryDialog = (category) => {
        setArticlesDialogOpened(true);
        console.log("LandingPage: category" + JSON.stringify(category))
        setCategory(category.name)
        setWord("")
    };

    const handleCloseArticlesDialog = () => {
        setArticlesDialogOpened(false);
    };


    function onChangeValueHandler(val) {
        setSource(val)
        if (val != null)
            console.log("click: " + val.name);
        newsDiversityChild.current.sourceUpdated(val)
        wordCloudChild.current.sourceUpdated(val)
    }

    return (
        <div>
            <Container maxWidth="lg">
                <header className="lp-header">
                    <Card className={classes.search}>

                    <SourceAutocomplete
                        onChangeValue={onChangeValueHandler}
                    />
                    </Card>

                </header>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <WordcloudSection
                            ref={wordCloudChild}
                            handleOpenArticlesDialog={handleOpenArticlesDialog}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <NewsDiversitySection
                            ref={newsDiversityChild}
                            handleOpenArticlesByCategoryDialog={handleOpenArticlesByCategoryDialog}/>
                    </Grid>
                </Grid>
            </Container>

            <ArticlesDialog isArticlesDialogOpened={isArticlesDialogOpened}
                            handleCloseArticlesDialog={handleCloseArticlesDialog}
                            word={word}
                            category={category}
                            source={source}
            />


            <div className={classes.footerContainer}>
                <div className={classes.footer}>
                    crafted with ❤️ by <a className={classes.link} href="https://github.com/hasanMhdAmin">Hasan Mhd Amin</a>
                </div>

            </div>


        </div>
    );

}