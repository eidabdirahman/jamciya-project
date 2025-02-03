import bcrypt from 'bcryptjs';

const Users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'admin'
    },
    {
        name: 'Eid Abdirahman',
        email: 'Eid@gmail.com',
        password: bcrypt.hashSync('password123', 10),
        role: "admin"
    },
    {
        name: 'Cosob Ahmed',
        email: 'cosobahmed@gmail.com',
        password: bcrypt.hashSync('password123', 10),
        role: "client"
    },
]

export default Users;