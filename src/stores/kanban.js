import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useKanbanStore = defineStore("kanban", () => {
   
    const colunas = [
  {nome: "pendente", titulo: "Pendente"},
  {nome: "fazendo", titulo: "Fazendo"},
  {nome: "finalizado", titulo: "Finalizado"},
  {nome: "cancelado", titulo: "Cancelado"},
  {nome: "revisando", titulo: "Revisando" }
]

const cards = ref([
 
])

const agrupados = computed(() => {
    const grupos = {}
    for (const card of cards.value) {
      if (!grupos[card.status]) {
        grupos[card.status] = []
      }
      grupos[card.status].push(card)
    }
    return grupos
  })

  let idCounter = 1


      const adicionarCard = (status, titulo, descricao) => {
      const novoCard ={
        id: idCounter++,
        status,
        titulo,
        descricao
      }
      cards.value.push(novoCard)
    }


    const excluirCard = (id) => {
  cards.value = cards.value.filter(card => card.id !== id)
}

const mudarStatus = (id, novoStatus) => {
  const card = cards.value.find(c => c.id === id)
  card.status = novoStatus
}

  return { colunas, cards, agrupados, adicionarCard, excluirCard, mudarStatus }
})



