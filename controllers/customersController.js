import CustomerSchema from './../schemas/CustomerSchema.js';

const customersController = {
    getCustomers: async (req, res) => {
        try {
            const customers = await CustomerSchema.find();
            console.log(customers);
            res.status(200).json({ data: customers });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default customersController;