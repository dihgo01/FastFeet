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
        const {email, oldpassword } = req.body;

        const user = await User.findByPk(req.userId);

         if(email && email == user.email) {
            const userExists = await User.findOne( { where: { email }});

          if(userExists){
            return res.status(400).json({ error: 'User alredy exists.'})
          }
        }

        if(oldpassword && !(await user.checkPassword(oldpassword))) {
          return res.status(401).json({ error: 'Password does not match'})
      }
      
        const { id, name, admin } = await User.update( req.body)
        //return res.status(201).json({message:'User updated successfully'})

        return res.status(200).json({
          id,
          name,
          email,
          admin
      });
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