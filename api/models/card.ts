export default interface Card {
    id: string;
    front: string;
    back: string;
    reviewDate: string | null;
    idUser: string | null;
    idDeck: string;
    lastDaysToReview: string | null;


    // constructor(id, front, back, reviewDate, idUser, idDeck, lastDaysToReview) {
    //     this.id = id;
    //     this.front = front;
    //     this.back = back;
    //     this.reviewDate = reviewDate;
    //     this.idUser = idUser;
    //     this.idDeck = idDeck;
    //     this.lastDaysToReview = lastDaysToReview;
    // }
}