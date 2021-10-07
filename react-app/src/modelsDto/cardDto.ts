

interface CardDto {
    id: string;
    front: string;
    back: string;
    reviewDate: string | null;
    lastDaysToReview: number | null;
    idDeck: string;
    idUser: string | null;

    // constructor(id, front, back, idDeck, idUser) {
    //     this.id = id;
    //     this.front = front;
    //     this.back = back;
    //     this.idDeck = idDeck;
    //     this.idUser = idUser;
    // }
}
export default CardDto;