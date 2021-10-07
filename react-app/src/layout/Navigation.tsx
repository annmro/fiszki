import { Divider, List, ListItemButton } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppStore } from '../models/FiszkiState';
import UserDto from '../modelsDto/userDto';
import '../styles/Navigation.css'

interface NavigationProps {
    stateUserLoc?: UserDto,
}
class Navigation extends Component<NavigationProps, any> {
    render() {
        return (
            <div>


                {this.props.stateUserLoc &&
                    <List sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',

                    }} disablePadding={true} component="nav">
                        <ListItemButton
                            activeStyle={{ fontWeight: "bold", color: "#3f51b5" }}
                            component={NavLink}
                            to='/todayCards'>Powtórka na dziś
                        </ListItemButton>
                        <Divider light />
                        <ListItemButton
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#3f51b5"
                            }}
                            component={NavLink}
                            to='/cards'>Karty
                        </ListItemButton>
                        <Divider light />
                        <ListItemButton
                            activeStyle={{ fontWeight: "bold", color: "#3f51b5" }}
                            component={NavLink}
                            to='/decks'>Talie
                        </ListItemButton>
                    </List>
                }
            </div>
        );
    }
}
const mapStateToProps = (state: AppStore) => ({
    stateUserLoc: state.user.user
})
export default connect(mapStateToProps, null)(Navigation);