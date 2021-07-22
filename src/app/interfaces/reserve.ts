import { Book } from "./book";
import { User } from "./user";

export class Reserve {
    id?: number;
    book?: Book;
    user?: User;
    endDate?: Date;
    quantity?: number;
    total?: number;
    constructor(
        book: Book,
        user: User,
        endDate: Date,
        quantity: number
    ) {
        this.book = book;
        this.user = user;
        this.endDate = endDate;
        this.quantity = quantity;
    }
}
