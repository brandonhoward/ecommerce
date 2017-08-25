export default class User {
    public username: string;
    public password: string;
    public dob: Date;
    public token: string;

    constructor(usn, pwd, dob, token) {
        this.username = usn;
        this.password = pwd;
        this.dob = dob;
        this.token = token;
    }

    toJson() {
        return JSON.stringify(this);
    }
}
