//* Import the customers.routes file with all de methods



const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customers.routes');
const userRoutes = require('./routes/users.routes');
const universityRoutes = require('./routes/university.routes');
const mbtiRoutes = require('./routes/mbti.routes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


//* Here I defined the first endpoint
const router = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/customers', customerRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/university', universityRoutes);
    app.use('/api/v1/mbtis', mbtiRoutes);
    // app.use('/api-docs', swaggerUi.serve);
    // app.get('/api-docs', swaggerUi.setup(swaggerDocument));
};

module.exports = router;