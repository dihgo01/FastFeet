const User = require('../model/User');

class UserCotroller {
    async index (req, res) {
        const user = await User.findAll();

       return res.status(200).json(user);
    }
    async store (req, res){
      const userExist = await User.findOne( {where:{ email: req.body.email} });

      if(userExist){
        return res.status(400).json({ error: 'User alredy exists.'})
      }
      const{ id, name, email, admin } = await User.create(req.body);
        

      return res.status(200).json({
          id,
          name,
          email,
          admin
      });
    }
    async update (req, res) {
        const user_id = req.params.id
        //const userExist = await User.findOne( {where:{ email: req.body.email} });

        const user = await User.findByPk(user_id)
        if(!user) {
            return res.status(400).json({ error: 'User not found!'})
        }
        /**if(userExist){
          return res.status(400).json({ error: 'User alredy exists.'})
        }
        **/
        await User.update( req.body ,{
            where: {
              id: user_id 
            }
          })
        return res.status(201).json({message:'User updated successfully'})
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
        return res.status(201).json({ Success : 'User has been deleted'})
    }
}
module.exports= new UserCotroller()