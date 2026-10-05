<script setup>

import { useKanbanStore } from '@/stores/kanban';
const store = useKanbanStore();

const props = defineProps(['card'])

</script>

<template>
  <div class="card">
    <p>Titulo: {{ card.titulo }} <br>Descricao: {{ card.descricao }}</p>
    <button @click="store.excluirCard(card.id)">X</button>
    <select :value="card.status" @change="store.mudarStatus(card.id, $event.target.value)">
      <option v-for="coluna in store.colunas" :value="coluna.nome" :key="coluna.nome">
        {{ coluna.titulo }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

.card button:hover {
  text-decoration: underline;
}
</style>