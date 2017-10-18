class LocalCache {

    constructor() {
        this.cage = null;
    }

    setCage(cage) {
        this.cage = cage;
    }

    getCage() {
        return this.cage;
    }

}

export default (new LocalCache());