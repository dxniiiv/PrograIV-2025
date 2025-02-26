    
    const buscarLibros = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            libros: [],
        }
    },
    methods: {
        modificarLibros(libros){
            this.$emit('modificar', libros);
        },
        eliminarLibros(libros) {
            alertify.confirm('Eliminar Libro', `¿Esta seguro de eliminar el libro ${libros.nombre}?`, () => {
                db.libros.delete(libros.idLibro);
                this.listarLibros();
                alertify.success(`Libros ${libros.isbn} eliminado`);
            }, () => { });
        },
        async listarLibros() {
            this.libros = await db.libros.filter(libros => libros[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
        nuevoLibro() {
            this.accion = 'nuevo';
            this.idLibro = '';
            this.idAutores = '';
            this.isbn = '';
            this.titulo = '';
            this.editorial = '';
            this.edicion = '';
        }
    },
    created() {
        this.listarLibros();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="isbn">ISBN</option>
                                    <option value="titulo">TITULO</option>
                                    <option value="editorial">EDITORIAL</option>
                                    <option value="edicion">EDICION</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" @keyup="listarLibros()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>ISBN</th>
                            <th>TITULO</th>
                            <th>EDITORIAL</th>  
                            <th>EDICION</th>  
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="libro in libros" @click="modificarLibros(libro)" :key="materia.idLibro">
                            <td>{{ libro.isbn }}</td>
                            <td>{{ libro.titulo }}</td>
                            <td>{{ libro.editorial }}</td>
                            <td>{{ libro.edicion }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarLibros(libro)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};