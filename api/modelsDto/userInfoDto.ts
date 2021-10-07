export default interface UserInfoDto {
    id: string | null;
    login: string | null;
    isLogged: boolean | null;

    // constructor(id, login, isLogged) {
    //     this.id = id;
    //     this.login = login;
    //     this.isLogged = isLogged;
    // }
}