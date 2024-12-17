const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const personSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef','manager','waiter'],
        required: true
    },
    mobile:{
        type: Number,
        required:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        requierd: true
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next;
    try{
        const salt= await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(person.password,salt);
        person.password = hashpassword;

        next();
    }catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Person= mongoose.model('Person',personSchema);
module.exports= Person;
