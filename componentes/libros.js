    
        const libros = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            libros: [],
            idLibro: '',
            idAutor: '',
            Isbn: '',
            titulo: '',
            editorial: '',
            edicion: '',
        }
    },
    methods: {
        buscarLibros() {
            this.forms.buscarLibros.mostrar = !this.forms.buscarLibros.mostrar;
            this.$emit('buscar');
        },
        modificarLibros(libros) {
            this.accion = 'modificar';
            this.idLibro = libros.idLibro;
            this.idAutor = libros.idAutor;
            this.Isbn = libros.Isbn;
            this.titulo = libros.titulo;
            this.editorial = libros.editorial;
            this.edicion = libros.edicion;
        },
        guardarLibro() {
            let libros = {
                idLibro: this.idLibro,
                idAutor: this.idAutor,
                Isbn: this.Isbn,
                titulo: this.titulo,
                editorial: this.editorial,
                edicion: this.edicion

            };
            if (this.accion == 'modificar') {
                libros.idLibro = this.idLibro;
            }
            db.libros.put(libros);
            this.nuevoLibro();
            this.listarLibros();
        },
        nuevoLibro() {
            this.accion = 'nuevo';
            this.idLibro = '';
            this.idAutor = '';
            this.Isbn = '';
            this.titulo = '';
            this.editorial = '';
            this.edicion = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmLibros" name="frmMateria" @submit.prevent="guardarLibro">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Libros</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ISBN</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="Isbn" type="text" name="txtIsbnLibro" id="txtIsbnLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TITULO</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="titulo" type="text" name="txtTituloLibro" id="txtTituloLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDITORIAL</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="editorial" type="text" name="txtEditorialLibro" id="txtEditorialLibro" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDICION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="edicion" type="text" name="txtEdicionLibro" id="txtEdicionLibro" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarLibros" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};