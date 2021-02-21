const User = require('../model/User');

class UserCotroller {
    async index (req, res) {
        const user = await User.findAll();

       return res.json(user);
    }
    async store (req, res){
        const{name, email, password} = req.body
        const create = await User.create({ name:name, email:email, password:password });

        return res.json(create)
    }
    async update (req, res) {
        const user_id = req.params.id
        const { name } = req.body

        const user = await User.findByPk(user_id)
        if(!user) {
            return res.status(400).json({ error: 'User not found!'})
        }
       const result = await User.update({ name:name },{
            where: {
              id: user_id 
            }
          })
        return res.status(201).json({message:'User updated successfully'+ result})
    }
    async delete (req, res) {
        const user_id = req.params.id

        const user = await User.findByPk(user_id)
        if(!user) {
            return res.status(400).json({ error: 'User not found!'})
        }
        await User.destroy({
            where: {
              id: user_id 
            }
          })
        return res.status(201)
    }
}
module.exports= new UserCotroller()