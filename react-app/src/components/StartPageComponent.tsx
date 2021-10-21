import React from 'react';
import Paper from '@mui/material/Paper';
import image from './../styles/undraw_Bibliophile_re_xarc.svg'
import './../styles/Image.css'
import { Grid } from '@mui/material';
// import { textAlign } from '@mui/system';

const StartPage = () => {
    return (
        <div>
            <Paper
                elevation={20}
                component="h2"
                sx={{
                    color: 'text.secondary',
                    fontSize: 32,
                    fontWeight: 'medium',
                    maxWidth: "75%",
                    alignItems: "center",
                    padding: "5%",
                    textAlign: "center",
                    display: "flex"
                }}>

                <Grid item xs={8}>
                    Fiszki to najbardziej skuteczna moteda nauki, <br />
                    a oto aplikacja, która ułatwi Twoją naukę! <br />
                    Stwórz własne fiszki i regularnie powtarzaj materiał.
                </Grid>
                <Grid item xs={4}>
                    <img className="welcomeImage" src={image} alt="welcomePicture" />
                </Grid>
            </Paper>

        </div >
    );
}

export default StartPage;