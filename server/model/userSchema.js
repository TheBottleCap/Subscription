const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required:true
    },
    tokens:[
        {
        token:{
            type: String,
            required:true
            }
        }
    ]
});


// hasing password
var salt = bcrypt.genSaltSync(12);
userSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,salt);
        this.cpassword = bcrypt.hashSync(this.cpassword,salt);

    }
    next();

});
// we are generating token
userSchema.methods.generateAuthToken = async function(){
    try {
        let tokenAviral = jwt.String({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:tokenAviral});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;