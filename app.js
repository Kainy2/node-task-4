const express = require('express')

const app = express()
app.use(express.json({ urlencoded: false }))

// All users 
const users = [
    {
        id: 101,
        name: 'Kainy',
        age: '29',
        tel: '07061234567',
    },
    {
        id: 102,
        name: 'Khay',
        age: '27',
        tel: '07062234567',
    },
    {
        id: 103,
        name: 'Kaine',
        age: '32',
        tel: '07067234567',
    }
]

const getAllUsers = (req, res) => res.status(200).json(users)

const getOneUser = (req, res) => {
    const id = req.params.id
    // response and status if no user is found
    let reply = { success: false, msg: 'User Not Found' }
    let status = 404
    users.find(user => {
        if (user.id == id) {
            status = 200
            // get the user that is needed and pass it to the reply variable
            return reply = user
        }
    })
    // response
    res.status(status).json(reply)
}

const postReq = (req, res) => {
    // response and status if a wrong input is entered
    let reply = { success: false, msg: 'Wrong input' }
    let status = 401
    const { name, age, tel } = req.body;
    if (name && age && tel) {
        // if all that is needed is received by server, add that + new id to array
        const id = users[users.length - 1].id + 1
        req.body.id = id
        users.push(req.body)
        // set status and new response
        status = 201
        reply = { success: true, data: req.body }

    }
    // response
    res.status(status).json(reply)
}

const deleteUser = (req, res) => {
    // response and status if user to be deleted is not found
    let reply = { success: false, msg: 'User Not Found' }
    let status = 404
    // store the id parameter in request in a var
    const id = req.params.id
    users.find((user, index, users) => {
        // while going through each user in array, remove the 1 item with the index of the item that matches the condition, only if the params id is found in array,   
        if (user.id == id) {
            users.splice(index, 1)
            // set status and new response
            reply = { success: true, msg: 'User Deleted' }
            status = 200
        }
    })
    // response
    res.status(status).json(reply)
}

const putReq = (req, res) => {
    // response and status if user is not found
    let status = 401
    let reply = { success: false, msg: 'User Not Found' }
    // store the id parameter in request in a var
    const id = req.params.id
    // while going through each item in array, if the params id is found in array and all inputs are received by server,...
    users.find((user, index, users) => {
        if (user.id == id) {
            const { name, age, tel } = req.body;
            if (name && age && tel) {
                // set the id to the old id and replace the old object with the new object from the request body
                req.body.id = id
                users[index] = req.body
                // set status and new response
                status = 201
                reply = { success: true, data: req.body, msg: 'Data changed Successfully' }
            } else {
                // set status and new response if all inputs are not received by server
                status = 401
                reply = { success: false, msg: 'Wrong input' }
            }
        }
    })
    // response
    res.status(status).json(reply)
}


// Get all users
app.get('/user/all', getAllUsers)

// Get one user
app.get('/user/:id', getOneUser)

// Post request to add new users
app.post('/user', postReq)

// Delete request to add new users
app.delete('/user/:id', deleteUser)

// Put request to add new users
app.put('/user/:id', putReq)

const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`Server is running on port ${port}`) })