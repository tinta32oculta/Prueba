<template>
  <div class="container">
    <h1>CRUD Notas con Firebase</h1>

    <div class="form">
      <input
        v-model="titulo"
        :class="{ error: errorTitulo }"
        placeholder="Título"
        @input="errorTitulo = false"
      />
      <span v-if="errorTitulo" class="error-msg">El título es obligatorio</span>

      <textarea
        v-model="contenido"
        :class="{ error: errorContenido }"
        placeholder="Contenido"
        @input="errorContenido = false"
      ></textarea>
      <span v-if="errorContenido" class="error-msg">El contenido es obligatorio</span>

      <button @click="modoEditar ? actualizarNota() : agregarNota()">
        {{ modoEditar ? 'Actualizar Nota' : 'Agregar Nota' }}
      </button>

      <button v-if="modoEditar" @click="cancelarEdicion()">Cancelar</button>
    </div>

    <transition-group name="fade" tag="ul" class="lista-notas">
      <NotaCard
        v-for="nota in notas"
        :key="nota.id"
        :nota="nota"
        @editar="editarNota"
        @eliminar="eliminarNota"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import NotaCard from './components/NotaCard.vue';

const titulo = ref('');
const contenido = ref('');
const notas = ref([]);
const modoEditar = ref(false);
const idEditar = ref(null);

const errorTitulo = ref(false);
const errorContenido = ref(false);

const notasCollection = collection(db, 'notas');

const cargarNotas = async () => {
  const snapshot = await getDocs(notasCollection);
  notas.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

const validarFormulario = () => {
  let valido = true;
  if (!titulo.value.trim()) {
    errorTitulo.value = true;
    valido = false;
  }
  if (!contenido.value.trim()) {
    errorContenido.value = true;
    valido = false;
  }
  return valido;
};

const agregarNota = async () => {
  if (!validarFormulario()) return;
  await addDoc(notasCollection, {
    titulo: titulo.value,
    contenido: contenido.value
  });
  titulo.value = '';
  contenido.value = '';
  cargarNotas();
};

const eliminarNota = async (id) => {
  await deleteDoc(doc(db, 'notas', id));
  cargarNotas();
};

const editarNota = (nota) => {
  modoEditar.value = true;
  titulo.value = nota.titulo;
  contenido.value = nota.contenido;
  idEditar.value = nota.id;

  errorTitulo.value = false;
  errorContenido.value = false;
};

const actualizarNota = async () => {
  if (!validarFormulario()) return;
  const docRef = doc(db, 'notas', idEditar.value);
  await updateDoc(docRef, {
    titulo: titulo.value,
    contenido: contenido.value
  });
  titulo.value = '';
  contenido.value = '';
  modoEditar.value = false;
  idEditar.value = null;
  cargarNotas();
};

const cancelarEdicion = () => {
  modoEditar.value = false;
  titulo.value = '';
  contenido.value = '';
  idEditar.value = null;

  errorTitulo.value = false;
  errorContenido.value = false;
};

onMounted(cargarNotas);
</script>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

.form input,
.form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.2rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form input.error,
.form textarea.error {
  border-color: #e74c3c;
  background-color: #fdecea;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  display: block;
}

.form button {
  margin-right: 0.5rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.form button:hover {
  background-color: #0056b3;
}

.lista-notas {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

/* Animaciones con transition-group */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>