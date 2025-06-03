# Scrapemail: Scraper de Confrontos da Libertadores 2025

Este projeto realiza o scraping dos confrontos das oitavas de final da Libertadores 2025 no site Globo Esporte e envia automaticamente o resultado por e-mail.

## Como funciona

- Usa `axios` para buscar a página de confrontos.
- Usa `cheerio` para extrair os dados dos confrontos do HTML.
- Usa `nodemailer` para enviar o e-mail com os confrontos em formato HTML.
- As credenciais de e-mail e o destinatário são definidos por variáveis de ambiente em um arquivo `.env`.

## Pré-requisitos

- Node.js instalado
- Conta Gmail para envio dos e-mails (com autenticação de app ou senha de app)

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
    ```powershell
    npm install
    ```
3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
    ```env
    EMAIL_USER=seu_email@gmail.com
    EMAIL_PASS=sua_senha_de_app
    EMAIL_TO=destinatario@exemplo.com
    ```

## Uso

Execute o script para fazer o scraping e enviar o e-mail:

```powershell
node email.js
```

Se tudo estiver correto, você verá a mensagem `E-mail enviado com sucesso!` no terminal.

## Personalização

Você pode alterar o link da imagem ou o layout do e-mail editando o arquivo `email.js`.

## Licença

Projeto desenvolvido para fins educativos na disciplina de Mobilidade.