const token = 'DfkfIQzHb6JVy20oJwTomzYY'
const mock = 'https://mock-api.driven.com.br/api/vm/uol/'

axios.defaults.headers.common['Authorization'] = token

let nome = prompt('Qual é o seu nome?')
let ativo = true

function postaNome() {
  axios
    .post('https://mock-api.driven.com.br/api/vm/uol/participants', {
      name: nome
    })
    .then(response => console.log(response.data))
    .catch(error => {
      console.log('Nome já está em uso ou ocorreu um erro ao postar o nome.')
      solicitaNovoNome()
    })
}

function solicitaNovoNome() {
  let novoNome = prompt('Este nome já está em uso, digite outro Nome: ')
  nome = novoNome
  postaNome()
}

function verificaSeContinuaOnline() {
  axios
    .post('https://mock-api.driven.com.br/api/vm/uol/status', {
      name: nome
    })
    .then(response => console.log(response.data))
    .catch(() => console.log('Algum erro ao verificar se esta online.'))
}

function buscaMensagem() {
  return axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
}

function exibeMensagem() {
  const main = document.querySelector('main')
  if (ativo) {
    buscaMensagem()
      .then(response => {
        const mensagens = response.data
        console.log(mensagens)
        main.innerHTML = ''
        const mensagensRecentes = mensagens.slice(-100)

        mensagensRecentes.forEach(mensagem => {
          main.innerHTML += `
          <div class="bloco-msg" data-test="message">
            <div class="horario" data-test="message">(${mensagem.time})</div>
            <div class="nome" data-test="message"><span>${mensagem.from}</span></div>
            <div class="mensagem" data-test="message">${mensagem.text}</div>
          </div>`
        })
      })
      .catch(() => console.log('Algum erro na busca da mensagem.'))
  }
}

function enviaMensagem() {
  let mensagemDigitada = document.querySelector('input').value
  console.log(mensagemDigitada)

  let userMsg = {
    from: nome,
    to: 'Todos',
    text: mensagemDigitada,
    type: 'message'
  }

  axios
    .post('https://mock-api.driven.com.br/api/vm/uol/messages', userMsg)
    .then(response => console.log(response.data))
    .catch(() => {
      console.log('Algo deu errado ao enviar a mensagem.')
      window.location.reload()
    })

  document.querySelector('input').value = ''
}

postaNome()
exibeMensagem()
setInterval(verificaSeContinuaOnline, 5000)
setInterval(exibeMensagem, 3000)
