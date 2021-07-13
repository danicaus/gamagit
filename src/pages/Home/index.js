import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled'
import { useHistory } from 'react-router-dom'


function App() {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('')
  const [erro, setErro ] = useState(false)


  function handlePesquisa(){
    axios.get(`http://api.github.com/users/${usuario}/repos`)
    .then(response => {
        const repositories = response.data
        const repositoriesName = repositories.map(repository => repository.name)
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName))
        setErro(false)
        history.push('/repositories')
    })
    .catch( () => {
      setErro(true);
    });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="usuario-input" value={usuario} placeholder="Usuário" onChange={ e => setUsuario(e.target.value)}/>
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''}
    </S.HomeContainer>
      
  );
}

export default App;