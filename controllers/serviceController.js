// const Service = require('../models/Service');

// // Create a service listing
// exports.createService = async (req, res) => {
//   const { serviceType, description, price, location } = req.body;

//   try {
//     const service = new Service({
//       provider: req.user.id,
//       serviceType,
//       description,
//       price,
//       location
//     });

//     await service.save();
//     res.json(service);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // Get services by location
// exports.getServicesByLocation = async (req, res) => {
//   const { location } = req.query;

//   try {
//     const services = await Service.find({ location });
//     res.json(services);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
