
export default function HandleRegister(req,res,postgres,bcrypt){
    
        const { email, name, password}=req.body;
        if (!email || !password || !name){
            return res.status(400).json("no information");
        }
        const hash = bcrypt.hashSync(password);
    
        postgres.transaction(trx=>{
            trx.insert({
                hash:hash,
                email:email
            }).into('login').returning('email').
            then(data=> {
                // console.log(data);
                return trx('users').returning('*').insert({
                    email:data[0].email,
                    name:name,
                    joined: new Date()
                })
            }).then(response=>{res.json(response[0]);}).then(trx.commit).catch(err => {trx.rollback; res.json("error");});
        }).catch(err => {res.json("error")});    
    
}

