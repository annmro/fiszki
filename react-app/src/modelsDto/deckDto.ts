import CardDto from "./cardDto";

interface DeckDto {
    id: string;
    name: string;
    idUser: string | null;
    cards: Array<CardDto> | null;

}
export default DeckDto;
