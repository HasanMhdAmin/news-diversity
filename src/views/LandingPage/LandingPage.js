import React from 'react';
import SourceAutocomplete from "../../components/Autocomplete/Autocomplete";
import './LandingPage.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {NewsDiversitySection} from "./NewsDiversitySection";
import {WordcloudSection} from "./WordcloudSection";
import {ArticlesDialog} from "../../components/ArticlesDialog/ArticlesDialog";

export default function LandingPage(props) {
    const [isArticlesDialogOpened, setArticlesDialogOpened] = React.useState(false);
    const [word, setWord] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [source, setSource] = React.useState("");

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
                    <SourceAutocomplete
                        onChangeValue={onChangeValueHandler}
                    />
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
                            word = {word}
                            category = {category}
                            source={source}
            />


        </div>
    );

}