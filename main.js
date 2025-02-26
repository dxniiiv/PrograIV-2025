const {createApp, ref} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_Fredys_Karen');

const app = createApp({
    components: {
        autor,
        libro,
        buscarautor,
        buscarlibro
    },
    data() {
        return {
            forms : {
                autor: {mostrar: false},
                buscarAutor: {mostrar: false},
                libro: {mostrar: false},
                buscarLibro: {mostrar: false},
            },
        };
    },
    methods: {
        buscar(form, metodo) {
            this.$refs[form][metodo]();
        },
        abrirFormulario(componente) {
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        },
        modificar(form, metodo, datos) {
            this.$refs[form][metodo](datos);
        }
    },
    created() {
        db.version(1).stores({
            alumnos: '++idAutor, codigo, nombre, telefono',
            materias: '++idLibro, idAutor, isbn, titulo, editorial, edicion',
        });
    }
});
app.mount('#app');