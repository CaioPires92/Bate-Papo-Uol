const token = 'DfkfIQzHb6JVy20oJwTomzYY'
axios.defaults.headers.common['Authorization'] = token

const nome = prompt('Qual é o seu nome?')

function postaNome() {
  const promise = axios.post(
    'https://mock-api.driven.com.br/api/vm/uol/participants ',
    {
      name: nome
    }
  )

  promise.then(promise => console.log(promise.data))
  promise.catch(() => console.log('algum erro ao postar nome ...........'))
}

function verificaSeContinuaOnline() {
  const promise2 = axios.post(
    'https://mock-api.driven.com.br/api/vm/uol/status',
    {
      name: nome
    }
  )

  promise2.then(promise2 => console.log(promise2.data)),
    promise2.catch(() =>
      console.log('algum erro ao verificar se esta online ...........')
    )
}

function buscaMensagem() {
  return axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
}

function exibeMensagem() {
  const main = document.querySelector('main')
  buscaMensagem()
    .then(response => {
      const mensagens = response.data
      console.log(mensagens)
      main.innerHTML = '' // limpa o conteúdo anterior antes de renderizar as mensagens
      mensagens.forEach(mensagem => {
        main.innerHTML += `
        <div class="bloco-msg gray">
          <div class="horario">(${mensagem.time})</div>
          <div class="nome"><span>${mensagem.from}</span></div>
          <div class="mensagem">${mensagem.text}</div> 
        </div>`
      })
    })
    .catch(() => {
      console.log('algum erro na busca da mensagem.............')
    })
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
    .then(response => {
      console.log(response.data)
      exibeMensagem() // atualiza a lista de mensagens na tela após enviar a mensagem com sucesso
    })
    .catch(() => {
      console.log('algo deu errado ao enviar a mensagem.......')
    })
}

setInterval(verificaSeContinuaOnline, 5000)

postaNome()
exibeMensagem()
