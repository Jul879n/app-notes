import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <main class="container sm:mx-auto sm:ps-0 sm:pe-0 ps-2 pe-2">
      <h1 class="text-4xl">{{ title }}</h1>
      <div
        id="notas"
        class="mt-2 grid grid-cols-2
   sm:grid-cols-4 gap-2"
      >
        @if(notas.length>0) { @for (nota of notas; track nota.id) {
        <div class="note bg-slate-700 p-2 rounded-xl relative">
          <h2 class="text-2xl font-bold break-words">{{ nota.titulo }}</h2>
          <p class="break-words">{{ nota.contenido }}</p>
          <button
            (click)="removerNota(nota.id)"
            class="close rounded-full p-2 bg-slate-200 text-slate-950 border-0 w-10 h-10 hover:bg-red-300"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        } }@else {
        <div class="p-2">
          <p class="text-2xl font-bold">No hay notas disponibles</p>
        </div>
        }
      </div>
      <button
        (click)="agregar = true"
        id="agregar"
        class="rounded-full bg-slate-700 hover:bg-slate-200 hover:text-slate-950 p-2 w-10 h-10 flex justify-center items-center"
      >
        <i class="fa-solid fa-plus"></i>
      </button>

      @if(agregar==true) {
      <div id="notaNueva" class="bg-slate-700 p-2 rounded-xl">
        <label for="titulo">Titulo</label>
        <input
          id="titulo"
          class="rounded-xl p-2 w-full bg-slate-200 text-slate-950 border-0"
        />
        <label for="contenido">Contenido</label>
        <textarea
          id="contenido"
          class="rounded-xl p-2 w-full h-36 bg-slate-200 text-slate-950 border-0"
        ></textarea>
        <div class="flex justify-around">
          <button
            (click)="agregar = false"
            class="rounded-full bg-slate-200 hover:bg-red-500 hover:text-white text-slate-950 p-2 flex justify-center items-center"
          >
            Cancelar
          </button>
          <button
            (click)="agregarNota()"
            id="guardar"
            class="rounded-full bg-slate-200 text-slate-950 p-2 flex justify-center items-center hover:bg-blue-300"
          >
            <i class="fa-solid fa-save me-2"></i>Agregar
          </button>
        </div>
      </div>
      }
    </main>
  `,
  styles: `
  #notaNueva{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .close{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  `,
})
export class AppComponent {
  title: string = 'App de Notas';
  notas: { id: number; titulo: string; contenido: string }[] = [];
  agregar: boolean = false;
  guardarNota() {
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }
  ngOnInit() {
    this.verificarNotas();
  }
  agregarNota() {
    const tituloActual = document.getElementById('titulo') as HTMLInputElement;
    const contenidoActual = document.getElementById(
      'contenido'
    ) as HTMLInputElement;
    if (tituloActual && contenidoActual) {
      this.notas.push({
        id: this.notas.length + 1,
        titulo: tituloActual.value,
        contenido: contenidoActual.value,
      });
    }
    this.guardarNota();
    this.agregar = false;
  }
  verificarNotas() {
    if (localStorage.getItem('notas') != null) {
      this.notas = JSON.parse(localStorage.getItem('notas') || '{}');
    }
  }
  removerNota(id: number) {
    var indiceAEliminar = id - 1;
    this.notas.splice(indiceAEliminar, 1);
    this.guardarNota();
  }
}
