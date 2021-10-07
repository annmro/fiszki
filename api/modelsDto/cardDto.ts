export default interface CardDto {
    id: string;
    front: string;
    back: string;
    reviewDate: string;
    idDeck: string;
    lastDaysToReview: string;
    idUser: string;

    // constructor(id, front, back, idDeck, idUser, reviewDate, lastDaysToReview) {
    //     this.id = id;
    //     this.front = front;
    //     this.back = back;
    //     this.idDeck = idDeck;
    //     this.idUser = idUser;
    //     this.reviewDate = reviewDate;
    //     this.lastDaysToReview = lastDaysToReview;
    // }
}