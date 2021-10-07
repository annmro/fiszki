import { Typography } from '@mui/material';
import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const Footer = () => {
    return (
        <Typography align="center" component="h2" mt={2}>

            <MailOutlineIcon fontSize="small" /> <br />
            E-mail:
            mroczek.anna03@gmail.com
        </Typography>

    );
}

export default Footer;