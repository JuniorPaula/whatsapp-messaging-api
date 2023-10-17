# WhatsApp Messaging API

A **API de Mensagens para WhatsApp** é um projeto desenvolvido em Node.js que fornece uma integração com a biblioteca Bailyes para envio de mensagens para o WhatsApp. Esta API oferece suporte ao envio de vários tipos de mensagens, incluindo texto, imagem, vídeo, modelos, botões e áudio, com base no tipo de mensagem especificado no payload.

## Funcionalidades

- **Envio de Mensagens para WhatsApp**: A API permite o envio de mensagens para números de WhatsApp, oferecendo suporte a diferentes tipos de mensagens.

- **Suporte a Tipos de Mensagens**: A API é capaz de enviar mensagens de texto, imagens, vídeos, modelos, mensagens com botões interativos e áudio, com base no tipo de mensagem especificado no payload.

## Tecnologias Utilizadas

- Node.js: A API é desenvolvida em Node.js, uma plataforma conhecida pela sua eficiência na criação de aplicativos de servidor.

- [Bailyes](https://github.com/WhiskeySockets/Baileys).: A integração com a biblioteca Bailyes permite o envio de mensagens para números de WhatsApp. 

## Endpoints da API

- `POST /send-messages`: Esta rota permite o envio de mensagens para números de WhatsApp. O payload deve especificar o tipo de mensagem (ex: texto, imagem, vídeo) e o conteúdo apropriado com base no tipo escolhido.

## Como Executar

1. Clone este repositório em sua máquina local.
2. Navegue até o diretório raiz do projeto.
3. Instale as dependências do Node.js usando `npm install`.
4. Configure as credenciais necessárias para a integração com a biblioteca Bailyes.
5. Execute a aplicação com o comando `npm run dev`.

## Uso
- Scannei o QRCode que será impresso no terminal quando a aplicação inicializar, é de suma importância para correta operação da API. 
- Utilize a rota `/send-messages` para enviar mensagens para números de WhatsApp, especificando o tipo de mensagem e o conteúdo apropriado no payload.
Ex: 
### Text
```json
{
	"phone": "seu numero",
	"message": "alguma mensagem",
	"type": "text"
}
```
### Image
```json
{
	"phone": "seu numero",
	"message": "alguma mensagem",
	"type": "image",
	"image": "https://url-imagem"
}
```
### Video
```json
{
	"phone": "seu numero",
	"message": "alguma mensagem",
	"type": "video",
	"video": "https://url-video"
}
```

## Contribuição

Contribuições para melhorar e aprimorar o projeto são bem-vindas! Sinta-se à vontade para enviar problemas (issues) ou solicitações de pull (pull requests).

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

## Contato

Se você tiver alguma dúvida ou sugestão, não hesite em entrar em contato através do email [luke.junnior@icloud.com](mailto:luke.junnior@icloud.com).

Obrigado por utilizar a API de Mensagens para WhatsApp para automatizar o envio de mensagens para o WhatsApp com facilidade!