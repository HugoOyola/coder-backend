// Creación de una instancia de Socket.IO y conexión al servidor
const socket = io();

// Obtención del elemento de los productos en el DOM
const products = document.getElementById("products");
// Obtención del formulario en el DOM
const formulario = document.getElementById("form");

// Función para manejar el evento de clic en el botón de eliminación
const btnEliminar = () => {
  const botones = document.getElementsByClassName("btn-danger");
  const arrayBtn = Array.from(botones);

  arrayBtn.forEach((element) => {
    element.addEventListener("click", () => {
      console.log("click");
      // Diálogo Swal para confirmar la eliminación del producto
      Swal.fire({
        title: "¿Desea eliminar este producto?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`El producto con ID: ${element.id} ha sido eliminado`, "", "success");
          // Emitir un evento 'delete' al servidor con el ID del producto a eliminar
          socket.emit("delete", element.id);
        } else {
          Swal.fire("El producto no se eliminó", "", "info");
        }
      });
    });
  });
};

// Función para iterar sobre los productos y mostrarlos en el DOM
const forEachProduct = (data) => {
  let productos = "";
  if (Array.isArray(data.docs)) { // Verificar si data.docs es un array
    data.docs.forEach((producto) => {
      productos += `<div class="card bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
                      <div class="card-header">code: ${producto.code}</div>
                      <div class="card-body">
                          <h4 class="card-title">${producto.title}</h4>
                          <p class="card-text">
                              <li>
                                  id: ${producto._id}
                              </li>
                              <li>
                                  description: ${producto.description}
                              </li>
                              <li>
                                  price: $${producto.price}
                              </li>
                              <li>
                                  category: ${producto.category}
                              </li>
                              <li>
                                  status: ${producto.status}
                              </li>
                              <li>
                                  stock: ${producto.stock}
                              </li>
                              <li>
                                  thumbnail: <img src="${producto.thumbnails}" alt="img"/>
                              </li>
                          </p>
                      </div>
                      <div class="d-flex justify-content-center mb-4">
                          <button type="button" class=" btn btn-danger" id="${producto._id}">Eliminar</button>
                      </div>
                  </div>
              </div>`;
    });
  } else {
    console.error("Data.docs is not an array:", data.docs);
  }
  products.innerHTML = productos;
};


// Función para recibir los productos del servidor
const productsByServer = () => {
  socket.on("products", (data) => {
    console.log("mensaje del servidor");
    // Mostrar los productos en el DOM
    forEachProduct(data.products);
    // Configurar el botón de eliminación
    btnEliminar();
  });
};

// Manejador de eventos para el envío del formulario de producto
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const product = Object.fromEntries(new FormData(event.target));
  product["status"] = new Boolean(product["status"]);
  product["thumbnails"] = ["empty"];
  product["price"] = Number(product["price"]);
  product["stock"] = Number(product["stock"]);

  // Emitir un evento 'product' al servidor con los datos del producto
  socket.emit("product", product);

  // Escuchar la respuesta del servidor
  socket.on("message", (res) => {
    if (res.status === "error") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: res.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Added product",
        text: res.message,
      });
    }
  });

  // Obtener los productos del servidor actualizados
  productsByServer();
  formulario.reset();
});

// Obtener los productos del servidor al cargar la página
productsByServer();
