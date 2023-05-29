// Obtención de los elementos con la clase "product" en el DOM
const products = document.getElementsByClassName("product");
// Obtención del elemento del icono del carrito en el DOM
const iconCart = document.getElementById("number");

// Conversión de la colección de elementos a un array
const arrayProducts = Array.from(products);

// Iterar sobre cada producto
arrayProducts.forEach((product) => {
  product.addEventListener("click", () => {
    // Obtener el stock del producto
    const stock = Number(product.getAttribute("data-value"));

    // Mostrar un diálogo Swal para ingresar la cantidad
    Swal.fire({
      title: "Ingresar la cantidad",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
    }).then((response) => {
      console.log(response);
      if (stock > Number(response.value)) {
        Swal.fire({
          title: "Producto agregado satisfactoriamente.",
          text: `ID: ${product.id} - Cantidad: ${response.value}`,
          icon: "success",
        });

        // Realizar una solicitud POST al servidor para agregar el producto al carrito
        fetch("http://localhost:8080/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: product.id, quantity: Number(response.value) }),
        });
      }
    });

    console.log(cart);
  });
});
