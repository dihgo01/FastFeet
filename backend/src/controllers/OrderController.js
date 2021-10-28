const Deliveryman = require('../model/Deliveryman');
const Order = require('../model/Order');
const Recipient = require('../model/Recipient');
const File = require('../model/File');
const Mail = require('../../lib/Mail');

const { parseISO, isBefore, startOfHour, endOfHour } = require('date-fns')

class OrderCotroller {
    async index(req, res) {
        const orders = await Order.findAll({
           include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    include: [{
                            model: File,
                            as: 'avatar',
                       },]
                },
                {
                    model: Recipient,
                    as: 'recipient',
                },
                
            ],
        });

        return res.status(200).json(orders);
    }
    async store(req, res) {
       
        const { id, recipientId ,deliverymanId, product} = await Order.create(req.body)

        const deliveryman = await Deliveryman.findByPk(deliverymanId)

        await Mail.sendMail({
            to:`${deliveryman.name}<${deliveryman.email}>`,
            subject:'Encomenda cadastrada ',
            text: 'Você tem um nova encomenda'
        });
   
        return res.status(200).json({
            id,
            recipientId,
            deliverymanId, 
            product,
        });
    }
    async update(req, res) {

        

        const deliveryman_id = req.params.id;
        const deliveryman_email = req.body.email;

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (deliveryman_email && deliveryman_email == deliveryman.email) {
            return res.status(400).json({ error: 'Deliveryman alredy exists.' })
        }

        const { name, email, avatarId } = await Deliveryman.update(req.body)

        return res.status(200).json({ name, email, avatarId });
    }
    async delete(req, res) {
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
    async start(req, res) {
        const { id } = req.params
        const { startDate } = req.body
    
        const orderStart = await Order.findByPk(id)
        if (!orderStart) {
            return res.status(400).json({ error: 'Order not found!' })
        }

        if(isBefore(parseISO(startDate), new Date())) {
           return res.status(400).json({error: "Past dates are not permitted"})
        }
        
        const hourStart = startOfHour(new Date("08:00"))
        const hourEnd = endOfHour(new Date("18:00"))
           
        if(startDate < hourStart && startDate > hourEnd){
            return res.status(400).json({error: "This timetable is not allowed to withdraw"})
        }

        await Order.update( startDate , {
            where:{ id }})
        return res.status(201).json({ id , startDate })
    }
}
module.exports = new OrderCotroller()