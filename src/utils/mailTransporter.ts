import {createTransport} from 'nodemailer';

const transport = createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'vahe052001@mail.ru',
        pass: 'scaik8Ny2seethE3NM7h'
    }
})


export default transport;