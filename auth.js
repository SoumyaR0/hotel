const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const Person = require('./models/Person');
passport.use(new LocalStrategy(async(UserName,Password,done)=>{
    try{
        console.log('Received credential:' ,UserName,Password);
        const user = await Person.findOne({username: UserName});
        if(!user){
            return done(null,false,{message: 'incorrect username'});
        }
        const isPasswordMatch = user.comparePassword(Password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'incorrect password'});
        }

    }catch(err){
        return done(err);
    }
}))


module.exports=passport;