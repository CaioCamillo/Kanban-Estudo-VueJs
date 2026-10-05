<script setup>
import { ref, computed } from 'vue'

import Card from './Components/Card.vue'
import { useKanbanStore } from './stores/kanban.js' 
const store = useKanbanStore()  

const modalAberto = ref(false)
const colunaDestino = ref("")
const novoTitulo = ref("")
const novaDescricao = ref("")

const abrirModal = (coluna) => {
  colunaDestino.value = coluna
  modalAberto.value = true
}

const salvarCard = () => {
  if (novoTitulo.value) {
      store.adicionarCard(colunaDestino.value, novoTitulo.value, novaDescricao.value)
      fecharModal()
  }
}

const fecharModal = () => {
  modalAberto.value = false
  novoTitulo.value = ""
  novaDescricao.value = ""
}

</script>

<template>
  <div class="body">
  <div class="board">
 <div v-for="coluna in store.colunas" class="coluna">
  <div class="coluna-topo">
    <h2>{{ coluna.titulo }}</h2> 
    <button @click="abrirModal(coluna.nome)" class="adicionar">+</button>
  </div>
  <Card v-for="card in store.agrupados[coluna.nome]" :key="card.id" :card="card"/>

  </div>
  </div>
  </div>



  <div v-if="modalAberto" class="overlay">
    <div class="modal">
    <input v-model="novoTitulo" placeholder="Título do Card" />
    <input v-model="novaDescricao" placeholder="Descrição do Card" />
    <button @click="salvarCard">Salvar</button>
    <button @click="fecharModal">Cancelar</button>
  </div>
</div>

</template>

<style scoped>

.body {
  background-color: #10885a;
  background-size: cover;         
  background-repeat: no-repeat;    
  height: 100vh;                   
  margin: 0;   
  padding: 50px;   
  align-items: center;              
}
.board {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.coluna {
  width: 280px;
  background: #ebecf0;
  border-radius: 8px;
  padding: 12px;
}
.coluna-topo {
  display: flex;
  justify-content: space-between; 
  align-items: center;            
  margin-bottom: 12px;            
}

.coluna-topo h2 {
  font-size: 16px;                
  margin: 0;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column; 
  gap: 8px;
}
.modal input, button {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.adicionar {
  background: #5aac44;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

</style>
