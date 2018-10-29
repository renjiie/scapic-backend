const handleUpdate=(req,res,bcrypt,db)=>{
	const {id,name,email,password} = req.body;
	const hash = bcrypt.hashSync(password)
	db('users')
	.where('id', id)
	.returning('*')
	.update({
	email: email,
	name:name
})
.then(user=>{
	db('login')
	.where('id', user[0].id)
	.returning('*')
	.update({
	email: email,
	hash :hash
})
	.then(user=>{
		db('users').select('*')
		.where('id',user[0].id)
		.then(user=>res.json(user[0]))
		 
	})
	.catch(err=>res.status(400).json('Cannot update the Profile'))
	
})
.catch(err=>res.status(400).json('Cannot update the Profile'))
}

module.exports = {
	handleUpdate : handleUpdate
}