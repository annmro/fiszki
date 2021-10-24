import { getFetchDefaults } from '../../helpers/requestHelpers';
import UserDto from '../../modelsDto/userDto';
import UserInfoDto from '../../modelsDto/userInfoDto';
import { setUser, setDecks, setCards } from '../action'


export const logInUserApi = async (user: UserDto): Promise<UserInfoDto> => {
    const fetch = getFetchDefaults();
    const response = await fetch('/api/logInUser', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const resUser = await response.json();
    return resUser
}
export const logInUser = (user: UserDto, callback: (user: UserInfoDto | null) => void) => {

    return async (dispatch: any) => {
        const userInfoDto = await logInUserApi(user);
        if (userInfoDto.isLogged) {
            callback(userInfoDto);
            dispatch(setUser(userInfoDto));
        } else {
            callback(null);
            dispatch(setUser(null));
        }
    }
}

export const logOutUser = () => {
    return async (dispatch: any) => {
        dispatch(setUser(null));
        dispatch(setDecks([]));
        dispatch(setCards([]))
    }
}

export const registerNewUser = async (user: UserDto) => {
    const fetch = getFetchDefaults();
    const response = await fetch('/api/registerUser', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const resText = await response.text()
    //console.log("response text", resText);
    return resText
}



