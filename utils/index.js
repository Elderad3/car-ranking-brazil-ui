export const anos = [
    {value: 2017},
    {value: 2018},
    {value: 2019},
    {value: 2020},
    {value: 2021},
]
export const meses = [
    {value: 13, nome: "Todos os Meses"},
    {value: 1, nome: "Janeiro"},
    {value: 2, nome: "Fevereiro"},
    {value: 3, nome: "Março"},
    {value: 4, nome: "Abril"},
    {value: 5, nome: "Maio"},
    {value: 6, nome: "Junho"},
    {value: 7, nome: "Julho" },
    {value: 8, nome: "Agosto" },
    {value: 9, nome: "Setembro" },
    {value: 10, nome: "Outubro" },
    {value: 11, nome: "Novembro" },
    {value: 12, nome: "Dezembro" },

]

export const agruparLista = (lista, propriedade) => {
    return lista.reduce(function (total, obj) {
      let chave = obj[propriedade];
      if (!total[chave]) {
        total[chave] = [];
      }
      total[chave].push(obj);
      return total;
    }, {});
  };