import dbConnection from '../database/dbConnection';

export const getUsers = (req, res) => {

    let sqlQuery = 'SELECT * FROM users';

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getUsersById = (req, res) => {

    const user_id = parseInt(req.params.id);
    let sqlQuery = `SELECT * FROM users WHERE user_id = ${user_id}`;

    // This method verifies that the id passed by parameter is a number, if it is not, it sends an error message
    if (isNaN(user_id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

export const createNewUser = (req, res) => {

    // Declare that I store the request body in a constant
    const user = req.body;
    // So, I create the object with the table fields by calling the constant user
    const userObj = [
        user.account_type,
        user.username,
        user.password,
        user.fullname,
        user.role,
    ];

    // This method verifies that the request body has all the complete fields, otherwise the operation will not be executed and sends an error message
    if (!user.account_type || !user.username || !user.password || !user.fullname || !user.role) {
        return res.json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty'
        });
    }

    let sqlQuery = 'INSERT INTO users (account_type, username, password, fullname, role) VALUES ( ?,?,?,?,?)';

    dbConnection.query(sqlQuery, userObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('User created with id: ' + result.insertId);
    });
};

export const updateUser = (req, res) => {
    
    const user_id = parseInt(req.params.id);
    const user = req.body;
    const userObj = [
        user.username,
        user.password,
        user.fullname,
    ];

    if (isNaN(user_id)) {
        return res.json('You must enter a valid user_id as a parameter');
    }

    if (!user.user_id || !user.username || !user.password || !user.fullname) {
        return res.json({
            ErrorCode: 204,
            Message: 'Fields cannot be empty'
        });
    }

    let sqlQuery = `UPDATE users SET username = ?, password = ?, fullname = ? WHERE user_id = ${user_id}`

    dbConnection.query(sqlQuery, userObj,  (error, result) => {
        if (error) throw error;
        if (result.affectedRow === 0) {
            res.send('No user was updated');
        }
        res.json(`user with user_id ${user_id} updated successfully`);
    });
};

export const deleteOneUser = (req, res) => {

    const user_id = parseInt(req.params.id);

    if (isNaN(user_id)) {
        return res.json('You must enter a valid user_id as a parameter');
    }
    
    let sqlQuery = `DELETE FROM users WHERE user_id = ${user_id}`;

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json(`User with user_id ${user_id} deleted successfully`);
    });
};