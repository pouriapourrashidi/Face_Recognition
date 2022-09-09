
export default function HandleSignIn(req,res,postgres,bcrypt){
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400);
    }
    postgres.select('email','hash').from('login').where('email','=',email)
    .then(data=>{
        const isValid=bcrypt.compareSync(password,data[0].hash);
        if (isValid){
            postgres.select('*').from('users').where('email','=',email).
            then(user=> {res.json(user[0]);}).catch(err => {res.status(400).json('unable to get the user');})
        }else{
            res.status(400).json("wrong creditional")
        }
    }).catch(err => res.status(400).json("wrong information"))
}

