import {useState} from 'react';

export const usePage = (perPage) => {
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(perPage);

  const nextPage = () => {setPagina(pagina + 1)}
  const previousPage = () => {setPagina(pagina - 1)}
  const reset = () => {setPagina(1)}

  return {
    pagina,
    porPagina,
    nextPage,
    previousPage,
    reset,
  }
}
