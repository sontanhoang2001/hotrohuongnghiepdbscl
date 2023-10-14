//* Import the customers.routes file with all de methods



const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customers.routes');
const userRoutes = require('./routes/users.routes');



//* Here I defined the first endpoint
const router = (app) => {
    app.use('/auth', authRoutes);
    app.use('/customers', customerRoutes);
    app.use('/users', userRoutes);

};

module.exports = router;