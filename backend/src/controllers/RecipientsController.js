const Recipient = require('../model/Recipient');

class RecipientsCotroller {
    async index(req, res) {
        const recipient = await Recipient.findAll();

        return res.status(200).json(recipient);
    }
    async store(req, res) {

        const { name,
            street,
            number,
            complement,
            state,
            city,
            zipCode, } = await Recipient.create(req.body);

        return res.status(200).json({
            name,
            street,
            number,
            complement,
            state,
            city,
            zipCode,
        });
    }
    async update(req, res) {
       /* const recipientsId = req.params.id;

        const recipient = await Recipient.findByPk(recipientsId)

        if(!recipient){
            return res.status(400).json({ error: 'Recipients not found.'})
          };
          */
       const reci = await Recipient.update( req.body)
        
        return res.status(200).json(reci);
    }
}

module.exports = new RecipientsCotroller()