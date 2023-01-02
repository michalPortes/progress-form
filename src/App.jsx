/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar
* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero
Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...
Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.
Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.
Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.
Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/
import { findAllByAltText } from '@testing-library/react'
import { useState } from 'react'

function App() {

  const [data, setData] = useState({
    fullName: '',
    email: '',
    maritalStatus: '',
    genre: ''
  })

  const HandleData = (event) => {

    const { name, value } = event.target

    const progress = data[data.length]

    setData((prev) => {
      const newData = { ...prev, [name]: value };

      return newData
    })


  }

  const calculateProgress = () => {

    let totalValue = 0
    let parcial = 25

    if (data.fullName) {

      const nameValue = data.fullName.split(' ')

      if (nameValue[1]) {

        totalValue += parcial
      }
    }

    if (data.email) {

      let emailValue = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (emailValue.test(data.email)) {

        totalValue += parcial
      }
    }
    if (data.maritalStatus !== '') {

      totalValue += parcial
    }
    if (data.genre) {

      totalValue += parcial
    }

    return totalValue
  }

  calculateProgress()

  return (
    <div className='App'>
      <h1>progresso do formulário</h1>

      <main>
        {/* crie a barra de progresso aqui */}
        <div className='bar-container'>
          <div className='bar' style={{ width: `${calculateProgress()}%` }}></div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input name='fullName' onChange={HandleData} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input name='email' onChange={HandleData} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select
            name='maritalStatus'
            onChange={HandleData}
          >
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input name='genre' value='masculino' type='radio' onChange={HandleData} /> Masculino
            </span>
            <span>
              <input name='genre' value='feminino' type='radio' onChange={HandleData} /> Feminino
            </span>
          </div>
        </div>
        <button>Enviar Formulário</button>
      </main >
    </div >
  );
}

export default App