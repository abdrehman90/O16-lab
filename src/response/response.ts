

// response success
export class responseSuccess {

    code: number;
    message: string;
    object: object;

    constructor(code: number, message: string, object: object) {
        this.code = code;
        this.message = message;
        this.object = object
    }

}

// response Error 
export class responseError {
    code: number;
    message: string;
    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}
export class login {
    email: string;
    password: string;
}

export class UserData {
   username: string;
   email: string;
   role: string;
 
   
 }