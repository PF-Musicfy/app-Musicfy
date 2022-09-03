const getPagination = (arrElementos,porPagina,pagina) => {
  const maximo = Math.ceil(arrElementos.length / porPagina);

  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const arr = arrElementos.slice(inicio,fin);

  return {arr,maximo}
}
export default getPagination;
