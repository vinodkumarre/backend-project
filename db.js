const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'book',
  password: 'Cel@1234',
  port: 5432,
});
const getUsers = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getUserById = (request, response) => {
    const id = request.params.name;

    pool.query('SELECT * FROM books WHERE name = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
    response.status(200).json(results.rows)
    })
}
  
const createUser = (request, response) => {
    const { name, author, publishedby } = request.body
    pool.query('INSERT INTO books (name, author, publishedby) VALUES ($1, $2, $3)', [name, author, publishedby], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`User added`)
    })
}
  
const updateUser = (request, response) => {
    const id = request.params.name;
    const { name, author, publishedby } = request.body

    pool.query(
        'UPDATE books SET name = $1, author = $2, publishedby = $3,  WHERE name = $4',
        [name, author, publishedby, id],
        (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
  
const deleteUser = (request, response) => {
    const id = request.params.name

    pool.query('DELETE FROM books WHERE name = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`User deleted with name`)
    })
}
  
module.exports = {
getUsers,
getUserById,
createUser,
updateUser,
deleteUser,
}