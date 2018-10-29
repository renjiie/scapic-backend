const handleDelete=(req,res,db)=>{
	const {id} = req.body;
	db('login')
	.where('id', id)
	.returning('*')
	.del()
	.then(user=>{
	db('users')
	.where('id', user[0].id)
	.returning('*')
	.del()
	.then(user=>{
		res.json(user[0]);
	})
	.catch(err=>res.status(400).json('Cannot delete the account'))
	
})
.catch(err=>res.status(400).json('Cannot delete the account'))

}

module.exports = {
	handleDelete : handleDelete
}