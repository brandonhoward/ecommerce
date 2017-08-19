export default class User {
    public id: number;
    public username: string;
    public password: string;
    public dob: Date;
    public token: string;

    constructor(id, usn, pwd, dob, token) {
        this.id = id;
        this.username = usn;
        this.password = pwd;
        this.dob = dob;
        this.token = token;
    }

    toJson() {
        return JSON.stringify(this);
    }
}
