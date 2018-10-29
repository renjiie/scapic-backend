const handleSocial=(req,res,db)=>{
	const {email,name} = req.body
	db('social')
	.returning('*')
	.insert({email:email,name:name,joined: new Date()})
	.then(user=>{
		res.json(user[0])
	})
	.catch(err => res.status(400).json('Cannot login'))

}

module.exports = {
	handleSocial : handleSocial
}