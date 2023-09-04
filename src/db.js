import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost', //ip
    user: 'root',
    password: 'eugenia11',
    port: 3306,
    database: 'campus'
})