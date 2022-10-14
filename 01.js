const carritoSeleccionado = document.querySelector('#carrito');
const botonDelete = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector(".lista-cursos");

// EL CARRITO EN UN ARRAY RESUMIDISMO EN 1 SEGUNDO:
let carrito = [];

// CREANDO CARRITO DE COMPRAS (CREAR FUNCION Y APARECER UN MENSAJE EN CONSOLA CADA VEZ QUE SE PULSE SOBRE EL BOTON DE AGREGAR AL CARRITO)

agregarCarrito();
function agregarCarrito() {
  listaCursos.addEventListener('click', pulseButtonAddCar);
  carritoSeleccionado.addEventListener('click', deleteElementCar);
  botonDelete.addEventListener('click', () => {
    carrito = [];
    cleanHTML();
  });
}
// ELIMINAR UN ELEMENTO CUANDO UN ELEMENTO X SEA PRESIONADO
function deleteElementCar(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const deleting = e.target.getAttribute('data-id');
    carrito = carrito.filter((x) => x.id !== deleting);
    addToCarHTML();
  }
}
// CUANDO PULSAMOS AGRAGAR AL CARRITO CON CADA ELEMENTO
function pulseButtonAddCar(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const elementsCar = e.target.parentElement.parentElement;
    getInfoElementsCar(elementsCar);
  }
}

// CREAR UN PROGRAMA QUE AL MOMENTO DE AÑADIR (PULSAR UN ELEMENTO DE CARRITO) PODAMOS OBTENER EN UN OBJETO LOS DATOS DEL CURSO SELECCIONADO
function getInfoElementsCar(element) {
  const unityElementCar = {
    imagen: element.querySelector(".card img").src,
    nombre: element.querySelector('h4').textContent,
    precio: element.querySelector(".texto-precio p").textContent,
    id: element.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };
  // CREAR UNA PROGRAMA QUE SOLO DEVUELVA LA CANTIDAD DE ELEMENTOS REPETIDOS SI SE AÑADE AL CARRITO Y NO ELEMENTOS REPETIDOS
  const repeated = carrito.some((x) => x.id === unityElementCar.id);
  if (repeated) {
    carrito.map((curso) => {
      if (curso.id === unityElementCar.id) {
        curso.cantidad++;
        return curso;
      }
      return curso;
    });
    carrito = [...carrito];
  } else {
    carrito = [...carrito, unityElementCar];
  }
  addToCarHTML();
}

// MUESTRA EL CARRITO DE COMPRAS EN EL HTML
function addToCarHTML() {
  // LIMPIA EL HTML PARA EVITAR REPETIR ELEMENTOS EN EL HTML

  cleanHTML();

  carrito.forEach((elementos) => {
    const {
      imagen, nombre, precio, cantidad, id,
    } = elementos;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" alt="" style="width: 110px;">
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
      <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

// ELIMINA LOS ELEMENTOS DEL HTML
// ¿COMO ELIMINAR LOS ELEMENTOS DEL CARRITO PARA PRIMERO BORRAR LOS ELEMENTOS DEL CARRITO Y LUEGO ITERAR Y AÑADIR UNA LISTA SIN REPETIR DE OBJETOS DE UN ARRAY AL CARRITO POR EL HTML?
// podemos crear una funcion que antes de poder imprimir el html limpie en caso de ser afectado por un cambio del usuario usando innerHTML o podemos usar una mejor forma mas optimizado usando WHILE
function cleanHTML() {
  // contenedorCarrito.innerHTML = ''; or
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
