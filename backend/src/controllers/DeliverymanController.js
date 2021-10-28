const Deliveryman = require('../model/Deliveryman');
const File = require('../model/File');

class DeliverymanCotroller {
    async index(req, res) {
        const deliveryman = await Deliveryman.findAll({
            attributes: [ 'id', 'name', 'email', 'avatarId'],
            include: [{
                 model: File,
                 as: 'avatar',
            },
        ],
        });

        return res.status(200).json(deliveryman);
    }
    async store(req, res) {
        const deliverymanExist = await Deliveryman.findOne({ where: { name: req.body.name, email: req.body.email } });

        if (deliverymanExist) {
            return res.status(400).json({ error: 'Deliveryman alredy exists.' })
        }
        const deliverymanExistEmail = await Deliveryman.findOne({ where: { email: req.body.email } });

        if (deliverymanExistEmail) {
            return res.status(400).json({ error: 'Deliveryman alredy exists.' })
        }
        const { id, name, email, avatar } = await Deliveryman.create(req.body);


        return res.status(200).json({
            id,
            name,
            email,
            avatar,
        });
    }
    async update(req, res) {
        const deliveryman_id = req.params.id;
        const deliveryman_email  = req.body.email;

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    
        if (deliveryman_email && deliveryman_email == deliveryman.email) {
            return res.status(400).json({ error: 'Deliveryman alredy exists.' })
            }

        const { name, email, avatarId} = await Deliveryman.update(req.body)

        return res.status(200).json({ name, email, avatarId});
    }
    async delete (req, res) {
            const deliveryman_id = req.params.id

            const deliveryman = await Deliveryman.findByPk(deliveryman_id)
            if (!deliveryman) {
                return res.status(400).json({ error: 'Deliveryman not found!' })
            }
            await Deliveryman.destroy({
                where: {
                    id: deliveryman_id
                }
            })
            return res.status(201).json({ Success: 'Deliveryman has been deleted' })
        }
    }
module.exports = new DeliverymanCotroller()