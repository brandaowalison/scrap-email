require('dotenv').config()
const nodemailer = require('nodemailer')
const axios = require('axios')
const cheerio = require('cheerio')

const FetchConfronto = async () => {
    try {
        const url = 'https://ge.globo.com/ce/futebol/libertadores/noticia/2025/06/02/oitavas-da-libertadores-2025-veja-datas-dos-jogos.ghtml'
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const confrontos = []

        $('#chunk-ct8vs ul li').each((i, el) => {
            const texto = $(el).text().trim()
            if (texto.includes('x')) {
                confrontos.push(texto)
            }
        })

        return confrontos
    } catch (error) {
        console.error('Erro ao buscar os confrontos:', error.message)
        return []
    }
}

const enviarEmail = async () => {
    try {
        const confrontos = await FetchConfronto()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            from: `"Scraper de Notícias" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: 'Oitavas da Libertadores 2025',
            html: `
                <h2>Oitavas da Libertadores 2025</h2>
                <p>Confira os confrontos:</p>
                <ul>
                    ${confrontos.map(linha => `<li>${linha.replace(/\n/g, '<br>')}</li>`).join('')}
                </ul>
                <img src="https://s2-ge.glbimg.com/YqQ1fw_EBdEKU_b49c6tP--JPZg=/0x0:779x421/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/l/T/3DL9QYTS6c8aFMKH6tlA/caminhooitavas.jpg"/>
                `

        })
        console.log('E-mail enviado com sucesso!')
    } catch (error) {
        console.log('Erro ao enviar o e-mail.', error)
    }
}
enviarEmail()