const Deliveryman = require("../model/Deliveryman");
const Order = require("../model/Order");

class TasksController {
    async index(req, res) {
        const deliveryman_id = req.params.id

        const orders_deliveryman = Order.findAll({
            where: {
                id: deliveryman_id,
                //canceledAt: "0000-00-00 00:00:00", 
                //startDate: "0000-00-00 00:00:00", 
            },include: [{
                model: Deliveryman,
                as: 'deliveryman'
            },]

        })

        /**if (!orders_deliveryman) {
            const orders_end = Order.findAll({
                where: {
                    id: deliveryman_id,
                }
            })
            return res.status(200).json(orders_end);
        }*/

        return res.status(200).json(orders_deliveryman);
    }

}

module.exports = new TasksController();