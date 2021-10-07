import React, { Component } from 'react';
import { updateCardFromTodayReview } from '../../redux/operations/operationCard'
import moment from '../../../../api/node_modules/moment/moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@mui/material/Typography';
import CardDto from '../../modelsDto/cardDto';
import Divider from '@mui/material/Divider'
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import Box from '@mui/material/Box';




interface CardReviewComponentState {
    isBackCardVisible: boolean,
    deckName: string | null
}

interface CardReviewComponentProps {
    isVisible: boolean,
    cardToReview: CardDto,
    selectNewCardToReview: () => void,
    closeDialog: () => void,
    cardsToReview: Array<CardDto>,
}


class CardReviewComponent extends Component<CardReviewComponentProps, CardReviewComponentState> {
    state = {
        isBackCardVisible: false,
        deckName: null
    }

    handleSetVisibleBack = () => {
        this.setState({
            isBackCardVisible: true,
        })
    }

    handleSelectNextCard = () => {
        this.setState({
            isBackCardVisible: false,
        })
        this.props.selectNewCardToReview();
    }

    handleUpdateDaysToNextReview = (knowLevel: string) => {
        const revCard = this.props.cardToReview;
        const startDate = new Date();

        switch (knowLevel) {
            case "well":
                revCard.lastDaysToReview = this.getLastDays(revCard.lastDaysToReview) * 2;
                revCard.reviewDate = moment(startDate, "DD-MM-YYYY").add({ days: revCard.lastDaysToReview }).toString();
                break;

            case "average":
                revCard.lastDaysToReview = this.getLastDays(revCard.lastDaysToReview);
                revCard.reviewDate = moment(startDate, "DD-MM-YYYY").add({ days: revCard.lastDaysToReview }).toString();
                break;

            case "wrong":
                revCard.lastDaysToReview = 1;
                revCard.reviewDate = moment(startDate, "DD-MM-YYYY").add({ days: 1 }).toString();
                break;

            default:
                break;
        }

        updateCardFromTodayReview(revCard);
        this.handleSelectNextCard();
    }

    getLastDays = (days: number | null) => {
        return days === null ? 1 : days
    }
    handleOnClose = () => {
        this.props.closeDialog();
    }

    render() {
        return (
            <>
                <Dialog
                    maxWidth="xs"
                    fullWidth
                    sx={{ height: '300' }}
                    onClose={this.handleOnClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.isVisible}
                    scroll="body"
                >
                    <DialogTitle id="customized-dialog-title">
                        Ilość kart pozostała na dziś: {this.props.cardsToReview.length}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box mt={3} mb={3}>
                            <Typography
                                align="center"
                                variant="h4"  >
                                {this.props.cardToReview.front}
                            </Typography >
                        </Box>

                        {this.state.isBackCardVisible ? "" : <Typography
                            align="center"

                            variant="button" display="block" gutterBottom>
                            <Button variant="outlined" color="primary" onClick={this.handleSetVisibleBack}>Pokaż tłumaczenie</Button>
                        </Typography>}



                        {this.state.isBackCardVisible && <div>
                            <Divider variant="fullWidth" />
                            <Box mt={3} mb={3}>
                                <Typography align="center" variant="h4" >
                                    {this.props.cardToReview.back}
                                </Typography>
                            </Box>
                        </div>}
                    </DialogContent>

                    {this.state.isBackCardVisible && <div>
                        <DialogActions>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={6}
                            >
                                <Chip label="Nie umiem" color="error" icon={<CloseRoundedIcon />} onClick={() => { this.handleUpdateDaysToNextReview("wrong") }} />

                                <Chip label="Średnio umiem" color="info" icon={<HorizontalRuleRoundedIcon />} onClick={() => { this.handleUpdateDaysToNextReview("average") }} />

                                <Chip label="Umiem" color="success" icon={<CheckRoundedIcon />} onClick={() => { this.handleUpdateDaysToNextReview("well") }} />


                            </Stack>
                            {/* <Button variant="contained" color="primary" onClick={() => { this.handleUpdateDaysToNextReview("well") }}>Umiem</Button>
                            <Button variant="contained" color="primary" onClick={() => { this.handleUpdateDaysToNextReview("average") }}>Średnio umiem</Button>
                            <Button variant="contained" color="primary" onClick={() => { this.handleUpdateDaysToNextReview("wrong") }}>Nie umiem</Button> */}

                        </DialogActions>
                    </div>
                    }


                </Dialog>
            </>
        )
    }
}
export default CardReviewComponent;