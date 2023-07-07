import { useState } from 'react';
import './App.css';

const App = () => {
  const [memorizedValue, setMemorizedValue] = useState(null);
  const [number, setNumber] = useState("");
  const [resultList, setResultList] = useState([]);

  const handleMemorize = () => {
    const parsedNumber = parseFloat(number.replace(",", "."));

    if (!isNaN(parsedNumber)) {
      setMemorizedValue(parsedNumber);
      setNumber("");
    }
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleMultiply = () => {
    if (memorizedValue !== null && number !== "") {
      const parsedNumber = parseFloat(number.replace(",", "."));

      if (!isNaN(parsedNumber)) {
        const result = (memorizedValue * parsedNumber).toFixed(1);
        setResultList([...resultList, result]);
        setNumber("");
      }
    }
  };

  const handleReset = () => {
    setMemorizedValue(null);
    setNumber("");
    setResultList([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (memorizedValue === null) {
        handleMemorize();
      } else {
        handleMultiply();
      }
    }
  };

  return (
    <section className="container-calcu">
      <h2>Calculadora Dra. Bini</h2>
      {!memorizedValue && (
        <div className="memo">
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            onKeyDown={handleKeyPress}
            placeholder="Ingrese número factor"
          />
          <button onClick={handleMemorize}>Memorizar</button>
        </div>
      )}
      {memorizedValue !== null && (
        <div className="multiplicar">
          <p>Estas multiplicando por: {memorizedValue}</p>
          <input
            placeholder="Ingresa número"
            type="text"
            value={number}
            onChange={handleNumberChange}
            onKeyDown={handleKeyPress}
          />
          <button className="multiplicar-btn" onClick={handleMultiply}>
            Multiplicar
          </button>
        </div>
      )}
      <button className="reset" onClick={handleReset}>
        Resetear
      </button>
      {resultList.length > 0 && (
        <div className="resultados">
          <h3>Resultados:</h3>
          <ul className="lista">
            {resultList.map((result, index) => (
              <li key={index}>{result} <span>---</span></li>
            ))
            }
          </ul>
        </div>
      )}
    </section>
  );
};

export default App;
