import mongoose from "mongoose";
import { Password } from '../services/password';

//Intarface to describe the User Property
interface UserAttributes {
    email: string;
    password: string;
}

//Intarface to describe the User Record 
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

//Intarface to describe the User Model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attribs: UserAttributes): UserDoc;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (userattrib: UserAttributes) => {
    return new User(userattrib);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
