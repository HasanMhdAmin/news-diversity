import React from 'react';
import SourceAutocomplete from "../../components/Autocomplete/Autocomplete";
import './LandingPage.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import WordcloudSection from "./WordcloudSection";
import ArticlesDialog from "../../components/ArticlesDialog/ArticlesDialog";
import {NewsDiversitySection} from "./NewsDiversitySection";

export default function LandingPage(props) {
    const [isArticlesDialogOpened, setArticlesDialogOpened] = React.useState(false);
    const [word, setWord] = React.useState("");
    const [source, setSource] = React.useState("");

    const newsDiversityChild = React.useRef();

    const handleOpenArticlesDialog = (word) => {
        setArticlesDialogOpened(true);
        console.log("LandingPage: word" + word)
        setWord(word)
    };

    const handleCloseArticlesDialog = () => {
        setArticlesDialogOpened(false);
    };


    function onChangeValueHandler(val) {
        setSource(val)
        if (val != null)
            console.log("click: " + val.name);
        newsDiversityChild.current.sourceUpdated(val)
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
                        <WordcloudSection handleOpenArticlesDialog={handleOpenArticlesDialog}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <NewsDiversitySection ref={newsDiversityChild} />
                    </Grid>
                </Grid>
            </Container>

            <ArticlesDialog isArticlesDialogOpened={isArticlesDialogOpened}
                            handleCloseArticlesDialog={handleCloseArticlesDialog}
                            word = {word}
            />


        </div>
    );

}