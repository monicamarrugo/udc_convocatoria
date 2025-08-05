export interface Item{
    codigo: string;
    descripcion: string;
    nombre: string;
    subido: boolean;
    subtipos?: SubtipoDocumento[];
}

export interface SubtipoDocumento {
  codigo: string;
  descripcion: string;
  nombre: string;
}