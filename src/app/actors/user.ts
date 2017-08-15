export default class User {
    public id: number;
    public username: string;
    public password: string;
    public dob: Date;

    constructor(id, usn, pwd, dob) {
        this.id = id;
        this.username = usn;
        this.password = pwd;
        this.dob = dob;
    }

    toJson() {
        return JSON.stringify(this);
    }
}
