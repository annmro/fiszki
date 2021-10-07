import React from 'react';
import Paper from '@mui/material/Paper';
// import { textAlign } from '@mui/system';

const StartPage = () => {
    return (
        <div>
            <Paper
                elevation={20}
                component="h2"

                sx={{
                    color: 'text.secondary',
                    fontSize: 34,
                    fontWeight: 'medium',
                    maxWidth: "75%",
                    alignItems: "center",
                    padding: "5%",
                    textAlign: "center"
                }}>
                Fiszki to najbardziej skuteczna moteda nauki, <br />
                a oto aplikcja, która ułatwi Twoją naukę! <br />
                Stwórz własne fiszki i regularnie powtarzaj materiał.
            </Paper>

        </div >
    );
}

export default StartPage;