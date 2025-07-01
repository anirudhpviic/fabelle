export class NoUniqueCombinationLeftError extends Error {
    constructor() {
        super("No unique chocolate combinations left");
        this.name = "NoUniqueCombinationLeftError";
    }
}
