import mongoose from "mongoose";

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


userSchema.statics.build = (userattrib: UserAttributes) => {
    return new User(userattrib);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
