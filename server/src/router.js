//* Import the customers.routes file with all de methods



const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customers.routes');
const userRoutes = require('./routes/users.routes');
const organizationRoutes = require('./routes/organization.routes');
const mbtiRoutes = require('./routes/mbti.routes');
const PostsOrganization = require('./routes/postsOrganization.routes');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


//* Here I defined the first endpoint
const router = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/customers', customerRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/organization', organizationRoutes);
    app.use('/api/v1/mbtis', mbtiRoutes);
    app.use('/api/v1/PostsOrganization', PostsOrganization);

    // app.use('/api-docs', swaggerUi.serve);
    // app.get('/api-docs', swaggerUi.setup(swaggerDocument));
};

module.exports = router;