import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState();
  const [ imagenes, setImagenes ] = useState([]);
  const [ paginaactual, setPaginaActual] = useState(1);
  const [ totalpaginas, setTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '17631390-509a7588257bec213cf03e2c3';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}
        &per_page=${imagenesPorPagina}&page=${paginaactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: "smooth"})
    }
    consultarAPI();

  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">

        <p className="lead text-center">Buscador de imagenes</p>

        <Formulario 
          setBusqueda={setBusqueda}
        />

      </div>

      <div className="row justify-content-center">

        <ListadoImagenes 
          imagenes={imagenes}
        />

        { (paginaactual === 1) ? null : (
          <button 
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        ) }

        { (paginaactual === totalpaginas) ? null : (
          <button 
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}

      </div>
      
    </div>
  );
}

export default App;
