document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. BASE DE DATOS DE PRODUCTOS INCRUSTADA
    // (Al estar aquí, evita el error de bloqueo CORS y funciona con doble clic)
    // =========================================================================
    const productos = [
        {
            nombre: "Gel Limpiador Foaming Cleanser 236ml Cerave",
            marca: "CeraVe",
            precio: "S/. 69.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/cerave_gel_limpiador_2366ml_verde.jpg"
        },
        {
            nombre: "Pack Hydro Boost Refill x2 Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 72.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/pack_2refill_neutrogena.jpg"
        },
        {
            nombre: "Gel Limpiador Effaclar Pieles Mixtas a Grasas 400ml La Roche Posay",
            marca: "La Roche Posay",
            precio: "S/. 106.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Gel Limpiador Effaclar Pieles Mixtas a Grasas 400ml.jpg"
        },
        {
            nombre: "Agua Micelar Sensibio H20 Piel Sensible 500 ml Bioderma",
            marca: "Bioderma",
            precio: "S/. 104.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/agua_micelar_bioderma.jpg"
        },
        {
            nombre: "Hidratante facial Hydro Boost 50gr Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 42.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/hidratante_neutrogena.jpg"
        },
        {
            nombre: "Protector Solar Mini Cotton Soft Sun Stick Tocobo",
            marca: "Tocobo",
            precio: "S/. 59.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Tocobo_pequeño.jpg"
        },
        {
            nombre: "Oil Control Limpiador Facial Control Imperfecciones Cetaphil",
            marca: "Cetaphil",
            precio: "S/. 83.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/cetaphil_limpiador_facial.jpg"
        },
        {
            nombre: "Bioderma Atoderm Huile de Douche 100ml",
            marca: "Bioderma",
            precio: "S/. 49.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Bioderma_Atoderm_Huile_de_Douche_100ml.jpg"
        },
        {
            nombre: "Hyaluron Filler Firming Serum Fps30 Eucerin",
            marca: "Eucerin",
            precio: "S/. 195.00",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Hyalluron_Eucrin_Filler.jpg"
        },
        {
            nombre: "Hidraderm Hyal 5 Serum 30ml Sesderma",
            marca: "Sesderma",
            precio: "S/. 59.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Hidraderm_Hyal5Serum_30ml_Sesderma.jpg"
        },
        {
            nombre: "Water Sleeping Mask with Squalane 70 ml Laneige",
            marca: "Laneige",
            precio: "S/. 129.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/laniege.jpg"
        },
        {
            nombre: "Crema Facial Anti-Arrugas Retinol Boost Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 98.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/neutrogena_retinol.jpg"
        },
        {
            nombre: "Tree Hut Exfoliante Watermelon 510g",
            marca: "Tree Hut",
            precio: "S/. 79.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/TREEHUT_Exfoliante_Watermelon_510g.jpg"
        },
        {
            nombre: "Fotoprotector Isdin Invisible Stick Spf50 10g",
            marca: "ISDIN",
            precio: "S/. 77.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Fotoprotector_Isdin.jpg"
        },
        {
            nombre: "Bálsamo Reparador Cicaplast Balm B5 La Roche Posay 40 ml",
            marca: "La Roche Posay",
            precio: "S/. 65.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Bálsamo_Reparador_CicaplastBalmB5_LaRochePosay_40 ml.jpg"
        },
        {
            nombre: "Protector Solar Diario SPF 50+ Just Con Acido Hialuronico Revox",
            marca: "Revox",
            precio: "S/. 39.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/ProtectorSolarDiario_SPF 50+Con Acido Hialuronico_Revox.jpg"
        },
        {
            nombre: "Exfoliante Tree Hut Vainilla 510g",
            marca: "Tree Hut",
            precio: "S/. 79.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Exfoliante_Tree_Hut_Vainilla_510g.jpg"
        }
    ];

    // =========================================================================
    // 2. LÓGICA DEL BUSCADOR INTERACTIVO (CON FILTRO DE SEGURIDAD)
    // =========================================================================
    const inputBusqueda = document.getElementById('input-busqueda');
    const contenedorResultados = document.getElementById('contenedor-resultados');

    if (inputBusqueda && contenedorResultados) {
        inputBusqueda.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase().trim();

            if (termino === '') {
                contenedorResultados.innerHTML = '';
                contenedorResultados.style.display = 'none';
                return;
            }

            const filtrados = productos.filter(prod => 
                prod.nombre.toLowerCase().includes(termino) || 
                prod.marca.toLowerCase().includes(termino)
            );

            mostrarResultados(filtrados);
        });

        function mostrarResultados(listaFiltrada) {
            contenedorResultados.innerHTML = '';

            if (listaFiltrada.length === 0) {
                contenedorResultados.innerHTML = `<div class="sin-resultados">No se encontraron productos para tu búsqueda</div>`;
                contenedorResultados.style.display = 'block';
                return;
            }

            listaFiltrada.forEach(prod => {
                const fila = document.createElement('a');
                fila.href = prod.link;
                fila.classList.add('item-resultado');
                fila.innerHTML = `
                    <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='img/logo/AuraGlow_SVGLogo.svg'">
                    <div class="info-resultado">
                        <span class="marca-resultado">${prod.marca}</span>
                        <p class="nombre-resultado">${prod.nombre}</p>
                        <span class="precio-resultado">${prod.precio}</span>
                    </div>
                `;
                contenedorResultados.appendChild(fila);
            });

            contenedorResultados.style.display = 'block';
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.bloque-buscador')) {
                contenedorResultados.style.display = 'none';
            }
        });
    }

    // =========================================================================
    // 3. LÓGICA DEL CARRUSEL PRINCIPAL DE BANNERS (CON AJUSTE DE DISEÑO ESTÉTICO)
    // =========================================================================
    const carruselTira = document.getElementById('carruselTira');
    const btnIzq = document.getElementById('btnIzq');
    const btnDer = document.getElementById('btnDer');
    const puntos = document.querySelectorAll('.indicador-punto');
    
    if (carruselTira && btnIzq && btnDer) {
        const slides = carruselTira.querySelectorAll('.banner-slide');
        const totalSlides = slides.length;
        let indiceActual = 0;
        let carruselIntervalId = null;

        carruselTira.style.display = 'flex';
        carruselTira.style.flexDirection = 'row';
        carruselTira.style.width = `${totalSlides * 100}%`;
        carruselTira.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        carruselTira.style.margin = '0';
        carruselTira.style.padding = '0';

        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
            slide.style.flex = `0 0 ${100 / totalSlides}%`;
            slide.style.boxSizing = 'border-box';
        });

        const moverSlide = (indice) => {
            if (indice < 0) indice = totalSlides - 1;
            if (indice >= totalSlides) indice = 0;
            indiceActual = indice;
            
            carruselTira.style.transform = `translateX(-${indiceActual * (100 / totalSlides)}%)`;
            
            puntos.forEach((p, idx) => {
                if (idx === indiceActual) p.classList.add('activo');
                else p.classList.remove('activo');
            });
        };

        moverSlide(0);

        const iniciarAutoplayBanner = () => {
            if (carruselIntervalId) {
                clearInterval(carruselIntervalId);
            }
            carruselIntervalId = setInterval(() => {
                moverSlide(indiceActual + 1);
            }, 6000);
        };

        btnIzq.addEventListener('click', () => {
            moverSlide(indiceActual - 1);
            iniciarAutoplayBanner();
        });

        btnDer.addEventListener('click', () => {
            moverSlide(indiceActual + 1);
            iniciarAutoplayBanner();
        });

        puntos.forEach(punto => {
            punto.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                moverSlide(slideIndex);
                iniciarAutoplayBanner();
            });
        });

        iniciarAutoplayBanner();
    }

    // =========================================================================
    // 3.5 ANIMACIÓN ROSA Y LÓGICA INTEGRADORA DEL CARRITO (EXTRACCIÓN DINÁMICA)
    // =========================================================================
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
        @keyframes popCheck {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(styleElem);

    // Event Delegation global para todos los botones de añadir de tu página
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-anadir, .btn-anadir-catalogo, .btn-pack-anadir');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();

            // 1. Activar animación visual de botón añadido
            if (!btn.classList.contains('estado-anadido')) {
                btn.classList.add('estado-anadido');
                btn.style.backgroundColor = '#ff4d6d'; 
                btn.style.borderColor = '#ff4d6d';
                btn.style.color = '#ffffff';
                btn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16" style="fill: currentColor; margin-right: 6px; display: inline-block; vertical-align: middle; animation: popCheck 0.3s ease;">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    <span style="animation: popCheck 0.3s ease; font-weight: 600; vertical-align: middle;">¡Añadido! ✓</span>
                `;

                btn.style.scale = '1.06';
                setTimeout(() => {
                    btn.style.scale = '1';
                }, 150);
            }

            // 2. Extracción de Datos Inteligente del HTML de tu Producto
            const tarjeta = btn.closest('.producto-card, .pack-card, .producto-card-catalogo');
            if (tarjeta) {
                // Obtener el título
                const tituloEl = tarjeta.querySelector('.prod-titulo, .pack-titulo, .prod-titulo-catalogo');
                const nombre = tituloEl ? tituloEl.textContent.trim() : "Producto Aura Glow";

                // Obtener el precio y sanitizarlo de forma segura dejando solo números y puntos decimales
                const precioEl = tarjeta.querySelector('.precio-actual, .pack-precio-actual, .precio-actual-catalogo');
                const precioTxt = precioEl ? precioEl.textContent.trim() : "0.00";
                
                // DETECCIÓN INTELIGENTE DE DECIMALES EN FORMATO LATINO (comas por puntos)
                let precioLimpio = precioTxt;
                if (precioLimpio.includes(',')) {
                    precioLimpio = precioLimpio.replace(',', '.');
                }
                
                // Removemos cualquier caracter que no sea número o punto decimal
                precioLimpio = precioLimpio.replace(/[^0-9.]/g, '');

                // Corregir en caso de múltiples puntos decimales por error
                const partesPrecio = precioLimpio.split('.');
                if (partesPrecio.length > 2) {
                    precioLimpio = partesPrecio.slice(0, -1).join('') + '.' + partesPrecio[partesPrecio.length - 1];
                }

                const precioVal = parseFloat(precioLimpio) || 0.00;

                // Obtener imagen
                const imgEl = tarjeta.querySelector('.prod-img-box img, .pack-img, .prod-img-box-catalogo img');
                const imgUrl = imgEl ? imgEl.getAttribute('src') : 'img/productos/placeholder.webp';

                // Crear un slug de ID único basado en el nombre
                const cleanId = nombre.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remueve acentos
                    .replace(/[^a-z0-9]+/g, "-") // Remueve caracteres especiales
                    .replace(/(^-|-$)/g, "");

                // Disparar acción real del carrito
                agregarAlCarrito(cleanId, nombre, precioVal, imgUrl);
            }
        }
    });

    // =========================================================================
    // 3.6 LÓGICA DE WISHLIST / CORAZÓN MANTENIDO (COLOR FUCSIA COMPLETO)
    // =========================================================================
    const botonesWishlist = document.querySelectorAll('.btn-wishlist, .btn-wishlist-catalogo');
    botonesWishlist.forEach(btn => {
        const svg = btn.querySelector('svg');
        if (svg) {
            svg.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const estaActivo = btn.classList.toggle('activo');

                if (estaActivo) {
                    svg.style.fill = '#ff4d6d';
                    svg.style.stroke = '#ff4d6d';
                    btn.style.transform = 'scale(1.25)';
                    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
                } else {
                    svg.style.fill = 'none';
                    svg.style.stroke = 'currentColor';
                    btn.style.transform = 'scale(0.85)';
                    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
                }
            });
        }
    });

    // =========================================================================
    // 4. LÓGICA DEL MODAL DE MI CUENTA (LOGIN & REGISTRO - PROTEGIDO)
    // =========================================================================
    const modalCuenta = document.getElementById('modalCuenta');
    const btnCuenta = document.getElementById('btn-cuenta');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const irARegistro = document.getElementById('ir-a-registro');
    const irALogin = document.getElementById('ir-a-login');
    const vistaLogin = document.getElementById('vista-login');
    const vistaRegistro = document.getElementById('vista-registro');

    if (modalCuenta && btnCuenta && btnCerrarModal) {
        btnCuenta.addEventListener('click', () => {
            modalCuenta.classList.add('mostrar'); // Se corrigió a 'mostrar' según tus clases de CSS
            if (vistaLogin) vistaLogin.classList.remove('d-none');
            if (vistaRegistro) vistaRegistro.classList.add('d-none');
        });

        btnCerrarModal.addEventListener('click', () => {
            modalCuenta.classList.remove('mostrar');
        });

        modalCuenta.addEventListener('click', (e) => {
            if (e.target === modalCuenta) {
                modalCuenta.classList.remove('mostrar');
            }
        });

        if (irARegistro && irALogin && vistaLogin && vistaRegistro) {
            irARegistro.addEventListener('click', (e) => {
                e.preventDefault();
                vistaLogin.classList.add('d-none');
                vistaRegistro.classList.remove('d-none');
            });

            irALogin.addEventListener('click', (e) => {
                e.preventDefault();
                vistaRegistro.classList.add('d-none');
                vistaLogin.classList.remove('d-none');
            });
        }
    }

    // =========================================================================
    // 5. LÓGICA DE CARRUSELES INTERNOS DE PRODUCTOS ("LO NUEVO" & "LO VENDIDO")
    // =========================================================================
    function inicializarCarruselInterno(claseTrack, claseBtnIzq, claseBtnDer) {
    const track = document.querySelector(claseTrack);
    const btnAnterior = document.querySelector(claseBtnIzq);
    const btnSiguiente = document.querySelector(claseBtnDer);

    if (track && btnAnterior && btnSiguiente) {
        let posicionHorizontal = 0;
        const paso = 300; 

        btnSiguiente.addEventListener('click', () => {
            // Solo ejecuta la traslación fija si estamos en escritorio
            if (window.innerWidth > 992) {
                const maxDesplazamiento = track.scrollWidth - track.parentElement.clientWidth;
                posicionHorizontal += paso;
                if (posicionHorizontal > maxDesplazamiento) {
                    posicionHorizontal = maxDesplazamiento;
                }
                track.style.transform = `translateX(-${posicionHorizontal}px)`;
            }
        });

        btnAnterior.addEventListener('click', () => {
            if (window.innerWidth > 992) {
                posicionHorizontal -= paso;
                if (posicionHorizontal < 0) {
                    posicionHorizontal = 0;
                }
                track.style.transform = `translateX(-${posicionHorizontal}px)`;
            }
        });
    }
}

    inicializarCarruselInterno('.track-nuevo', '.flecha-izq-nuevo', '.flecha-der-nuevo');
    inicializarCarruselInterno('.track-vendido', '.flecha-izq-vendido', '.flecha-der-vendido');

    // =========================================================================
    // 6. LÓGICA DEL CARRUSEL DE RESEÑAS / TESTIMONIOS (PROTEGIDO)
    // =========================================================================
    const resenasTrack = document.getElementById('resenas-track');
    const btnResenaIzq = document.getElementById('btn-resena-izq');
    const btnResenaDer = document.getElementById('btn-resena-der');

    if (resenasTrack && btnResenaIzq && btnResenaDer) {
        let indiceResena = 0;
        const totalGrupos = document.querySelectorAll('.grupo-resenas').length;

        const moverResena = (nuevoIndice) => {
            if (nuevoIndice < 0) nuevoIndice = totalGrupos - 1;
            if (nuevoIndice >= totalGrupos) nuevoIndice = 0;
            indiceResena = nuevoIndice;
            resenasTrack.style.transform = `translateX(-${indiceResena * 100}%)`;
        };

        btnResenaIzq.addEventListener('click', () => moverResena(indiceResena - 1));
        btnResenaDer.addEventListener('click', () => moverResena(indiceResena + 1));
    }

    // =========================================================================
    // 7. SISTEMA DE CARRITO DE COMPRAS INTEGRADO (PERSISTENTE CON LOCALSTORAGE)
    // =========================================================================
    
    // Obtener elementos del DOM del Carrito
    const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
    const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
    const carritoSidebar = document.getElementById('carrito-sidebar');
    const carritoOverlay = document.getElementById('carrito-overlay');
    const carritoBadge = document.getElementById('carrito-badge');
    const contenedorProductos = document.getElementById('carrito-productos');
    const totalPrecioTxt = document.getElementById('carrito-total-precio');
    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    const btnPagar = document.getElementById('btn-proceder-pago');
    const vacioMensaje = document.getElementById('carrito-vacio-mensaje');

    // Estado inicial de la lista de compras
    let carrito = JSON.parse(localStorage.getItem('auraglow_carrito')) || [];

    // AUTO-REPARADOR DE PRECIOS EN CÉNTIMOS: 
    // Compara el carrito guardado con la base de datos real y restaura el precio a Soles en caso de corrupción previa (ej: 6990 -> 69.90)
    carrito = carrito.map(item => {
        const precioActualVal = parseFloat(item.precio) || 0;
        
        // Si el precio guardado es sospechosamente alto (mayor a 1000 soles), buscamos su contraparte real
        if (precioActualVal > 1000) {
            const productoOriginal = productos.find(pOriginal => {
                const cleanOriginalId = pOriginal.nombre.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                return cleanOriginalId === item.id;
            });
            
            // Si lo encontramos en la base de datos, corregimos el precio inmediatamente
            if (productoOriginal) {
                let precioOriginalTxt = productoOriginal.precio;
                if (precioOriginalTxt.includes(',')) {
                    precioOriginalTxt = precioOriginalTxt.replace(',', '.');
                }
                precioOriginalTxt = precioOriginalTxt.replace(/[^0-9.]/g, '');
                item.precio = parseFloat(precioOriginalTxt) || precioActualVal;
            }
        }
        return item;
    });

    // Guardar los datos reparados de inmediato para limpiar el cache
    localStorage.setItem('auraglow_carrito', JSON.stringify(carrito));

    // Funciones de apertura y cierre del panel lateral
    const abrirCarrito = () => {
        if (carritoSidebar && carritoOverlay) {
            carritoSidebar.classList.add('activo');
            carritoOverlay.classList.add('activo');
            document.body.style.overflow = 'hidden'; 
        }
    };

    const cerrarCarrito = () => {
        if (carritoSidebar && carritoOverlay) {
            carritoSidebar.classList.remove('activo');
            carritoOverlay.classList.remove('activo');
            document.body.style.overflow = '';
        }
    };

    if (btnAbrirCarrito) btnAbrirCarrito.addEventListener('click', abrirCarrito);
    if (btnCerrarCarrito) btnCerrarCarrito.addEventListener('click', cerrarCarrito);
    if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarCarrito);

    const guardarYActualizar = () => {
        localStorage.setItem('auraglow_carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
    };

    const actualizarCarritoUI = () => {
        if (!contenedorProductos) return;

        const itemsAnteriores = contenedorProductos.querySelectorAll('.item-carrito');
        itemsAnteriores.forEach(item => item.remove());

        let totalItems = 0;
        let subtotal = 0.00;

        if (carrito.length === 0) {
            if (vacioMensaje) vacioMensaje.style.display = 'block';
            if (btnVaciar) btnVaciar.style.display = 'none';
            if (btnPagar) btnPagar.disabled = true;
        } else {
            if (vacioMensaje) vacioMensaje.style.display = 'none';
            if (btnVaciar) btnVaciar.style.display = 'block';
            if (btnPagar) btnPagar.disabled = false;

            carrito.forEach(prod => {
                totalItems += prod.cantidad;
                const precioNumerico = parseFloat(prod.precio) || 0.00;
                subtotal += (precioNumerico * prod.cantidad);

                const divItem = document.createElement('div');
                divItem.classList.add('item-carrito');
                divItem.innerHTML = `
                    <img src="${prod.imagen}" alt="${prod.nombre}" class="item-carrito-img" onerror="this.src='img/productos/placeholder.webp'">
                    <div class="item-carrito-detalles">
                        <div>
                            <span class="item-carrito-nombre">${prod.nombre}</span>
                        </div>
                        <div class="item-carrito-controles">
                            <span class="item-carrito-precio">S/. ${(precioNumerico * prod.cantidad).toFixed(2)}</span>
                            <div class="selector-cantidad">
                                <button class="btn-cantidad disminuir" data-id="${prod.id}">-</button>
                                <span class="cantidad-valor">${prod.cantidad}</span>
                                <button class="btn-cantidad aumentar" data-id="${prod.id}">+</button>
                            </div>
                            <button class="btn-eliminar-item" data-id="${prod.id}" title="Eliminar producto">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
                contenedorProductos.appendChild(divItem);
            });
        }

        if (carritoBadge) {
            carritoBadge.textContent = totalItems;
            carritoBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        if (totalPrecioTxt) {
            totalPrecioTxt.textContent = `S/. ${subtotal.toFixed(2)}`;
        }
    };

    const agregarAlCarrito = (id, nombre, precio, imagen) => {
        const itemExistente = carrito.find(item => item.id === id);
        const precioNumero = parseFloat(precio) || 0.00;

        if (itemExistente) {
            itemExistente.cantidad += 1;
            itemExistente.precio = precioNumero; // Asegura que se actualice con el precio correcto
        } else {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precioNumero,
                imagen: imagen,
                cantidad: 1
            });
        }
        guardarYActualizar();
        abrirCarrito(); 
    };

    // Event Delegator dinámico para controles internos de ítems del carrito
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('aumentar')) {
            const id = e.target.getAttribute('data-id');
            const item = carrito.find(p => p.id === id);
            if (item) {
                item.cantidad += 1;
                guardarYActualizar();
            }
        }

        if (e.target && e.target.classList.contains('disminuir')) {
            const id = e.target.getAttribute('data-id');
            const item = carrito.find(p => p.id === id);
            if (item) {
                item.cantidad -= 1;
                if (item.cantidad <= 0) {
                    carrito = carrito.filter(p => p.id !== id);
                }
                guardarYActualizar();
            }
        }

        if (e.target && e.target.closest('.btn-eliminar-item')) {
            const botonEliminar = e.target.closest('.btn-eliminar-item');
            const id = botonEliminar.getAttribute('data-id');
            carrito = carrito.filter(p => p.id !== id);
            guardarYActualizar();
        }
    });

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            carrito = [];
            guardarYActualizar();
        });
    }

    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            if (carrito.length === 0) return;

            const numeroWhatsApp = "+51900000000"; 
            let mensaje = `✨ *Nuevo Pedido de Aura Glow* ✨\n\n`;
            let total = 0;

            carrito.forEach(prod => {
                const precioUnidad = parseFloat(prod.precio) || 0.00;
                const sub = precioUnidad * prod.cantidad;
                mensaje += `• *${prod.cantidad}x* ${prod.nombre} - _S/. ${sub.toFixed(2)}_\n`;
                total += sub;
            });

            mensaje += `\n💵 *Total a Pagar:* S/. ${total.toFixed(2)}`;
            mensaje += `\n\n🚚 _Por favor, indícame los pasos para el envío y los métodos de pago._`;

            const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    }

    // Ejecutar inicialización al cargar
    actualizarCarritoUI();
});

document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btnMenu');
    const navCategorias = document.getElementById('navCategorias');

    if (btnMenu && navCategorias) {
        btnMenu.addEventListener('click', () => {
            // Alterna la clase para mostrar u ocultar el menú
            navCategorias.classList.toggle('menu-activo');
            
            // Opcional: Cambia el ícono de ☰ a ✕ al abrir
            const icono = btnMenu.querySelector('i');
            if (icono) {
                icono.classList.toggle('fa-bars');
                icono.classList.toggle('fa-xmark');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del Menú Lateral (Drawer)
    const btnMenu = document.getElementById('btnMenu');
    const btnCerrarMenu = document.getElementById('btnCerrarMenu');
    const menuLateral = document.getElementById('menuLateral');
    const overlayMenu = document.getElementById('overlayMenu');

    // Función para abrir el menú lateral
    function abrirMenu() {
        menuLateral.classList.add('activo');
        overlayMenu.classList.add('activo');
        document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
    }

    // Función para cerrar el menú lateral
    function cerrarMenu() {
        menuLateral.classList.remove('activo');
        overlayMenu.classList.remove('activo');
        document.body.style.overflow = ''; // Devuelve el scroll
    }

    // Eventos de apertura/cierre
    if (btnMenu) btnMenu.addEventListener('click', abrirMenu);
    if (btnCerrarMenu) btnCerrarMenu.addEventListener('click', cerrarMenu);
    if (overlayMenu) overlayMenu.addEventListener('click', cerrarMenu);

    // 2. Lógica para desplegar submenús (Acordeón de Catálogo y Marcas)
    const botonesAcordeon = document.querySelectorAll('.btn-acordeon');

    botonesAcordeon.forEach(boton => {
        boton.addEventListener('click', () => {
            const itemPadre = boton.parentElement;
            
            // Opcional: Cerrar otros acordeones si se abre uno nuevo
            document.querySelectorAll('.item-desplegable').forEach(item => {
                if (item !== itemPadre) {
                    item.classList.remove('activo');
                }
            });

            // Alternar el acordeón presionado
            itemPadre.classList.toggle('activo');
        });
    });
});