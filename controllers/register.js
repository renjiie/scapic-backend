const handleRegister = (req,res,bcrypt,db)=>{
	const {email,password,name} = req.body;
	if(!email||!name||!password ){
		return res.status(400).json('Enter a valid email and password');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx=>{
		trx.insert({email:email, hash:hash})
		.into('login')
		.returning('*')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({
				id:loginEmail[0].id,
				email:loginEmail[0].email,
				name:name,
				joined: new Date()
			})
			.then(user=>{
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err=>res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister : handleRegister
}