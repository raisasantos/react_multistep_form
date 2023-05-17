//Components
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import {FiSend} from 'react-icons/fi'
import UserForm from "./components/UserForm";
import ReviewForm from './components/ReviewForm';
import Thanks from './components/Thanks';
import Steps from './components/Steps';

import { useForm } from './hooks/useForm';// Hooks

import { useState } from 'react';

import './App.css'

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
};

function App() {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler}/>, 
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>, 
    <Thanks data={data}/>,
  ];//array de components

  const {currentStep, currentComponent, changeStep, isLastStep} = useForm(formComponents)//do hook

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto.
        </p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep}/>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>{/*altera componentes*/}
          <div className='inputs-container'>{currentComponent}</div>{/*mostra o componente específico*/}
          <div className="actions">
            <button type='button' onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />{/*icones*/}
              <span>Voltar</span>
            </button>
            {!isLastStep ? (
              <button type='submit'>{/*submit aciona o onsubmit*/}
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button type='button'>
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
