interface UserDto {
    id: string | null;
    login: string;
    passHash: string;
}

export default UserDto;