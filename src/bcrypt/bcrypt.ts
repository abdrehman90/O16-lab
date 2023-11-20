import * as bcrypt from 'bcrypt';

export function encodepassword(rowpassword: string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rowpassword,SALT);
}