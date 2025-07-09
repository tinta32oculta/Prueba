<template>
  <div class="nota-card">
    <h3>{{ nota.titulo }}</h3>
    <p>{{ nota.contenido }}</p>
    <div class="botones">
      <button @click="$emit('editar', nota)">Editar</button>
      <button @click="$emit('eliminar', nota.id)">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotaCard',
  props: {
    nota: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.nota-card {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
}

.botones button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.botones button:hover {
  background-color: #0056b3;
}
</style>