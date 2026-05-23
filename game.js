// Captura de elementos del DOM
const outputDiv = document.getElementById("output");
const userInput = document.getElementById("user-input");

// Resolver la entrada de datos simulando el input sincrónico
let resolveInputFunc = null;

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = userInput.value;
    userInput.value = ""; // Limpia el prompt
    if (resolveInputFunc) {
      // Imprime la respuesta del usuario en la pantalla estilo terminal
      print(`<span style="color: #ffffff;">&gt; ${value}</span>`);
      const callback = resolveInputFunc;
      resolveInputFunc = null;
      callback(value);
    }
  }
});

// Forzar el foco en el input al hacer clic en cualquier parte de la terminal
document.getElementById("terminal").addEventListener("click", () => {
  userInput.focus();
});

// Funciones de utilidad de la interfaz
function print(text) {
  outputDiv.innerHTML += text + "\n";
  window.scrollTo(0, document.body.scrollHeight); // Hace scroll de la pantalla completa del explorador
}

const question = () =>
  new Promise((resolve) => {
    resolveInputFunc = resolve;
  });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeWriter(text, delay) {
  for (const char of text) {
    outputDiv.innerHTML += char;
    outputDiv.scrollTop = outputDiv.scrollHeight;
    await sleep(delay);
  }
  outputDiv.innerHTML += "\n";
}

// Variables de estado del juego globales
let repeticion = false;
let companion = "Fede";
let nafta = false;
let arrancar = false;
let yerba = false;
let aceite = false;
let aire = false;
let vamos = false;
let agua = false;
let mapa = false;
let celular = false;
let cambio = false;
let comida = false;
let musicaviaje = false;
let bolsos = false;
let yerba2 = false;
let frenos = false;

let pasar1 = false;
let contador = 0;
let rta1 = "";
let karma = 0;
let propina = 0;
let dulzura = "";
let hora = "";
let musica = "";

const a = 1500;
const b = 1000;
const c = 30; // Velocidad de tipeo optimizada para web
const d = 300;

// Inicialización de la pantalla de bienvenida
function intro() {
  const asciiPC = `<div class="ascii-pc">
 _______________________________________________________________________________________
|                             /             ||             \\                            |
|                            /        _.---------._         \\                           |
|                           /       ,'.-----------.',        \\                          |
|                          /       /='-------------\`=\\        \\                         |
|                         /      ./_______....._______\\\\.      \\                        |
|                        /       |(_)(_) _______ (_)(_)|        \\                       |
|                       /        (....__|RTS.018|__....)         \\                      |
|                      /          | |    ~~~~~~~    | |           \\                     |
|                     /           \`-'       ||      \`-'            \\                    |
|                           Bienvenidos a Road Trip Simulator!                          |
|_______________________________________________________________________________________|
</div>`;

  const asciiMobile = `
<div class="ascii-mobile">
 _________________________________________
|                                         |
|             _.---------._               |
|           ,'.-----------.',             |
|          /='-------------\`=\\            |
|        ./_______....._______\\\\.         |
|        |(_)(_) _______ (_)(_)|          |
|        (....__|RTS.018|__....)          |
|         | |    ~~~~~~~    | |           |
|         \`-'               \`-'           |
|   Bienvenidos a Road Trip Simulator!    |
|_________________________________________|
</div>`;

  print(asciiPC + asciiMobile);
}

async function main() {
  intro();
  await sleep(1000);
  while (true) {
    await inicioGame();
  }
}

async function path12() {
  await sleep(b);
  print("Gracias por jugar! RTS versión 0.17");
  print("Proyecto en desarrollo, realizado en entorno Web (JavaScript/HTML).");
  print("Continuará.\n");
  print(
    "===========================================================================================",
  );
  await sleep(b);
}

async function path11b() {
  pasar1 = false;
  while (!pasar1) {
    try {
      await sleep(b);
      print("Cuánto deseas dejar? (#) $");
      let inputPropina = await question();
      propina = parseInt(inputPropina);

      if (isNaN(propina)) {
        throw new Error("Value error");
      }

      if (propina < 0) {
        await sleep(b);
        print(
          "\nPropina negativa? Oiga, no pienso llevarme dinero de otra mesa.\n",
        );
        return await path11b();
      } else if (propina === 0) {
        await sleep(b);
        print(
          "\nNada? Bueno, si así te parece. Nos levantamos y salimos del lugar.\n",
        );
        return await path12();
      } else {
        if (!cambio) {
          await sleep(b);
          print(
            `\nMiro mi billetera. Ni yo ni ${companion} traemos dinero ni cambio encima. Lo olvidé completamente.`,
          );
          print(
            "Tampoco hay cajeros. Nos levantamos un poco apenados y partimos del lugar.",
          );
          print("Esto podría ser un problema.\n");
          pasar1 = true;
          return await path12();
        } else {
          if (propina > 0 && propina < 51) {
            await sleep(b);
            print("\nPor suerte recordamos salir con dinero en efectivo.");
            print(
              "Dejamos algo de propina bajo uno de los platos y salimos del lugar. [karma +1]\n",
            );
            karma += 1;
            pasar1 = true;
            return await path12();
          } else if (propina > 50 && propina < 401) {
            await sleep(b);
            print("\nPor suerte recordamos salir con dinero en efectivo.");
            print(
              "Dejamos la propina correspondiente en la mesa y nos dirigimos a la salida. [karma +2]\n",
            );
            karma += 2;
            pasar1 = true;
            return await path12();
          } else if (propina > 401 && propina < 999) {
            await sleep(b);
            print(
              "\nOiga, soy monotributista! Bueno, generosidad nunca sobra.",
            );
            print("Por suerte recordamos salir con dinero en efectivo.");
            print("Dejamos la propina y salimos del lugar. [karma +3]\n");
            karma += 3;
            pasar1 = true;
            return await path12();
          } else if (propina > 999) {
            await sleep(b);
            print("\nEs demasiado.");
            return await path11b();
          }
        }
      }
    } catch (err) {
      await sleep(b);
      print("\nIngresa el valor que deseas dejar utilizando solo números.");
      await sleep(b);
      return await path11b();
    }
  }
}

async function path11a() {
  print("Cómo lo tomas? (amargo/dulce/edulcorante) ");
  let inputDulzura = await question();
  dulzura = inputDulzura.toLowerCase().trim();

  if (dulzura === "dulce" || dulzura === "d") {
    await sleep(b);
    print(`\nCon dos cucharadas de azucar. ${companion} prueba el suyo:`);
    dulzura = "dulce";
  } else if (dulzura === "edulcorante" || dulzura === "e") {
    await sleep(b);
    print(`\nBueno, hay cosas peores. ${companion} prueba el suyo:`);
    dulzura = "edulcorante";
  } else if (dulzura === "amargo" || dulzura === "a") {
    await sleep(b);
    print(`\nEn esto estamos de acuerdo. ${companion} prueba el suyo:`);
    dulzura = "amargo";
  } else {
    await sleep(b);
    print("\nCon qué?\n");
    return await path11a();
  }

  await sleep(a);
  print("");
  await typeWriter(
    '"Este café es como un indulto, che, algo terriblemente conciliatorio."',
    c,
  );
  await typeWriter('"Y las medialunas no están nada mal."', c);
  await sleep(b);
  print("\nEl hambre, la mejor de las especias.");
  await sleep(b);
  print(
    "\nTerminamos de comer y pago con mi celular. Deberíamos dejar algo de propina.\n",
  );
  await path11b();
}

async function path11() {
  const cafemañana = "Tras algunos minutos";
  const cafetarde = "Tras una larga espera";
  const cafenoche = "El lugar está casi vacío, y rápidamente";
  let cafe = "";

  if (hora === "mañana") {
    cafe = cafemañana;
  } else if (hora === "tarde") {
    cafe = cafetarde;
  } else {
    cafe = cafenoche;
  }

  await sleep(a);
  print("\n                         }");
  print("                     }  {   {");
  print("                  .-{-``}```-}-.");
  print("                 (   }      {   )");
  print("                 |`-..______..-';-.");
  print("                 |             (__ \\");
  print("                 |              | ) )");
  print("                 |              |/ /");
  print("                 |             (  /");
  print("                 \\              y'");
  print("                  `-..______..-'");
  print("\nPedimos, y mientras tanto continuamos la charla.");
  print(`${cafe} regresan con nuestras bebidas.\n`);
  await sleep(b);
  await path11a();
}

async function path10() {
  print("Quieres entrar al bar? (si/no) ");
  let bar = await question();
  bar = bar.toLowerCase().trim();
  if (bar === "si" || bar === "s") {
    await path11();
  } else if (bar === "no" || bar === "n") {
    await sleep(b);
    print("\nNo nos demoramos y seguimos camino.");
    await path12();
  } else {
    await path10();
  }
}

async function path9() {
  if (hora === "mañana") {
    print("No hay tanta gente en el estacionamiento.");
    print("La mañana está agradable, y tenemos todo el día por delante.");
    print(
      "La ruta sigue tranquila. Creo que estoy listo para un buen desayuno antes de seguir.",
    );
    print("Haces un chequeo rápido del auto, todo está en orden. [salud +1]\n");
    await path10();
  } else if (hora === "tarde") {
    print("El estacionamiento está repleto.");
    print("Cerca nuestro una familia se baja del auto, son 4, y un perro.");
    print(
      "Se escuchan bocinas desde la ruta. Comienza a hacer un poco de calor.",
    );
    print("Haces un chequeo rápido del auto, todo está en orden. [salud +1]\n");
    await path10();
  } else {
    print(
      "La noche está tranquila y solo hay otros dos autos en el estacionamiento.",
    );
    print(
      "Todo está en silencio. Un gran camión pasa rápidamente por la ruta.",
    );
    print(
      "El cielo está despejado y comienzan a verse algunas formaciones de estrellas.",
    );
    print("Haces un chequeo rápido del auto, todo está en orden. [salud +1]\n");
    await path10();
  }
}

async function path8() {
  print("Qué deseas hacer? (parar/seguir) ");
  let parador = await question();
  parador = parador.toLowerCase().trim();

  if (
    parador === "parar" ||
    parador === "p" ||
    parador === "estacionar" ||
    parador === "e"
  ) {
    await sleep(b);
    print(
      "\nUna pausa suena como una buena idea. Tomar un café, recargar energías.",
    );
    print("Tomamos la primera salida, aparcamos y bajamos del coche.");
    print("Tus piernas te lo agradecen.\n");
    await path9();
  } else if (parador === "seguir" || parador === "s") {
    await sleep(b);
    print("\nAún no estoy cansado, será mejor seguir por ahora.");
    await path12();
  } else {
    await path8();
  }
}

async function path7() {
  await sleep(b);
  print("\nA lo lejos se divisa el gran cartel blanco y negro del parador.");
  print("Tal vez podríamos detenernos y estirar un poco las piernas.\n");
  await path8();
}

async function path6() {
  await sleep(b);
  print("De de qué quieres hablar? (planes/salud/viaje) ");
  let charla = await question();
  charla = charla.toLowerCase().trim();

  if (charla === "planes" || charla === "p") {
    print("");
    await typeWriter(
      '"Desde que regresé a Buenos Aires me costó adaptarme un poco...',
      c,
    );
    await typeWriter(
      "Encontrar dónde vivir, volver a conseguir trabajo, recuperar mis vínculos.",
      c,
    );
    await typeWriter(
      "Una vez que volví a acomodarme todo fue haciéndose más fácil...",
      c,
    );
    await typeWriter("Y pude volver a mirar hacia adelante.", c);
    await typeWriter("Mis planes? ", c);
    await sleep(d);
    await typeWriter("Te los diré cuando los sepa!", c);
    await typeWriter('Pero seguro que tengo algunas buenas ideas!"', c);
    await path7();
  } else if (charla === "salud" || charla === "s") {
    print("");
    await typeWriter('"De verdad quieres hablar de ello?', c);
    await typeWriter('"Bueno... el último tiempo no ha sido fácil...', c);
    await typeWriter("Al principio la medicación me adormecía mucho...", c);
    await typeWriter("No podía estudiar, no quería ver a nadie. Me aislé.", c);
    await typeWriter(
      "Hasta que de a poco fui haciendo pie y buscando más ayuda.",
      c,
    );
    await typeWriter(
      "Ahora tengo mis días. No te voy a decir que está todo espectacular,",
      c,
    );
    await typeWriter("pero... ", c);
    await sleep(d);
    await typeWriter(
      "estoy mucho mejor. Trato de rodearme de lo que me hace bien.",
      c,
    );
    await typeWriter('Un poco como este viaje, no?"', c);
    await path7();
  } else if (charla === "viaje" || charla === "v") {
    print("");
    await typeWriter('"Por qué vine? ', c);
    await sleep(d);
    await typeWriter(
      "Cuando me invitaste estaba en uno de esos momentos...",
      c,
    );
    await typeWriter("Digamos que necesitaba tomar un poco de aire...", c);
    await typeWriter("Te escuché tan entusiasmado que no pude resistirme.", c);
    await typeWriter(
      "Me lo vendiste tan bien que en algún punto hasta pensé que había sido mi idea.",
      c,
    );
    await typeWriter('Y mirá, acá estamos. Nada mal, eh?"', c);
    await path7();
  } else {
    print("\nMejor pregunta algo diferente.\n");
    await path6();
  }
}

async function path5() {
  await sleep(b);
  print(
    `\nLa charla fluye mientras pasan los temas de ${musica}, y ${companion} resultó ser una buena compañía.`,
  );
  print("Antes de darnos cuenta ya estamos avanzando por la Ruta 2.\n");
  await path6();
}

async function path4() {
  print("Quieres cambiar la música? (si/no) ");
  let radio = await question();
  radio = radio.toLowerCase().trim();
  if (radio[0] === "s") {
    if (companion.toLowerCase() === "juanma") {
      await sleep(b);
      await typeWriter(`${companion}: "Ah... bueno..."`, c);
      await pathJ();
    } else {
      await path3();
    }
  } else if (radio[0] === "n") {
    await path5();
  } else {
    await path3();
  }
}

async function pathJ() {
  await sleep(b);
  print("Qué deseas escuchar? ");
  let inputMusica = await question();
  musica = inputMusica.toLowerCase().trim();

  if (
    [
      "red hot chili peppers",
      "rhcp",
      "red hot",
      "chili peppers",
      "red hot chili pepers",
    ].includes(musica)
  ) {
    await sleep(b);
    print("\n♫ Suena 'Scar Tissue', de los Red Hot Chili Peppers. ♫\n");
    await typeWriter(
      `${companion}: "Altísima banda, no? Uh es un discazo este, un tema mejor que el otro."`,
      c,
    );
    await typeWriter(
      '        "Escuchá lo que es este solo de Frusciante, una locura."',
      c,
    );
    musica = "los Red Hot Chili Peppers";
    await path4();
  } else {
    await sleep(b);
    await typeWriter(
      `${companion}: "Ah no querés escuchar los Red Hot...? Otra cosa? Uh perdón no traje nada, pensé que no íbamos a necesitar."`,
      c,
    );
    await pathJ();
  }
}

async function path3a() {
  if (companion.toLowerCase() === "juanma") {
    await pathJ();
  } else {
    await path3();
  }
}

async function path3() {
  await sleep(b);
  print("Qué deseas escuchar? ");
  let inputMusica = await question();
  musica = inputMusica.toLowerCase().trim();

  if (
    [
      "red hot chili peppers",
      "rhcp",
      "red hot",
      "chili peppers",
      "red hot chilli peppers",
      "red hot chili pepers",
    ].includes(musica)
  ) {
    await sleep(b);
    print(
      "\n♫ Suena 'Scar Tissue'. ♫ \nNo hay otro tema mejor para un viaje en la ruta.\n",
    );
    musica = "los Red Hot Chili Peppers";
    await path4();
  } else if (["strokes", "the strokes"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'You Only Live Once.' ♫\nQué gran banda!\n");
    musica = "The Strokes";
    await path4();
  } else if (["bowie", "david bowie"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'The Man Who Sold The World'. ♫\nEl hombre leyenda.\n");
    musica = "Bowie";
    await path4();
  } else if (["beatles", "the beatles", "los beatles"].includes(musica)) {
    await sleep(b);
    print(
      "\n♫ Suena 'Strawberry Fields Forever'. ♫\nLiverpool siempre estuvo cerca.\n",
    );
    musica = "los Beatles";
    await path4();
  } else if (["taylor swift", "taylor", "swift"].includes(musica)) {
    await sleep(b);
    print(
      "\n♫ Suena 'I Knew You Were Trouble (Taylor's Version)'. ♫\nMe pregunto qué habrá sido de esa bufanda.\n",
    );
    musica = "Taylor Swift";
    await path4();
  } else if (
    ["queen", "freddie", "freddie mercury", "freddy"].includes(musica)
  ) {
    await sleep(b);
    print("\n♫ Suena 'Don't Stop Me Now'! ♫\nY el auto parece un karaoke.\n");
    musica = "Queen";
    await path4();
  } else if (["gorillaz", "gorilaz"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'Feel Good Inc'. ♫\nFeel Good.\n");
    musica = "Gorillaz";
    await path4();
  } else if (musica === "coldplay") {
    await sleep(b);
    print(
      "\n♫ Suena 'The Scientist'. ♫\nCome up to meet you, tell you I'm sorryyyyy, you don't know how lovely you aaaaaaaaare. Justo en el cora.\n",
    );
    musica = "Coldplay";
    await path4();
  } else if (["dua lipa", "dualipa", "dua"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'Love Again'. ♫\nNada mal.\n");
    musica = "Dua Lipa";
    await path4();
  } else if (["bersuit", "bersuit vergarabat"].includes(musica)) {
    await sleep(b);
    print(
      "\n♫ Suena 'Toco y Me Voy'. ♫\nEscuchaba mucho esta banda en sus buenos días.\n",
    );
    musica = "Bersuit";
    await path4();
  } else if (
    [
      "redondos",
      "patricio rey",
      "los redondos",
      "indio",
      "indio solari",
    ].includes(musica)
  ) {
    await sleep(b);
    print(
      "\n♫ Suena 'Ella Debe Estar Tan Linda'. ♫\nConduje toda la noche! Reventando los cambios! Con mis ojos de durax las ti ma dos! Qué banda.\n",
    );
    musica = "los Redondos";
    await path4();
  } else if (["wos", "wosito"].includes(musica)) {
    await sleep(b);
    print(
      "\n♫ Suena 'Melón Vino.' ♫\nTengo estudio y un colchón, tengo amigos un montón.\n",
    );
    musica = "Wos";
    await path4();
  } else if (
    [
      "rolling stones",
      "stones",
      "rolling",
      "los stones",
      "roling",
      "roling stones",
    ].includes(musica)
  ) {
    await sleep(b);
    print("\n♫ Suena 'Start Me Up.' ♫\nEl cuerpo comienza a moverse solo.\n");
    musica = "los Rolling Stones";
    await path4();
  } else if (
    ["billie", "billie eilish", "skip bilie eilish", "bilie"].includes(musica)
  ) {
    await sleep(b);
    print("\n♫ Suena 'Whish You Were Gay.' ♫\nEsa voz.\n");
    musica = "Billie Eilish";
    await path4();
  } else if (
    ["cowboy bebop", "yoko kanno", "seatbelts", "the seatbelts"].includes(
      musica,
    )
  ) {
    await sleep(b);
    print("\n♫ Suena 'TANK.' ♫\nOK 3, 2, 1 LETS JAM\n");
    musica = "Cowboy Bebop";
    await path4();
  } else if (
    [
      "evangelion",
      "opening evangelion",
      "neon genesis evangelion",
      "zankoku na tenshi",
      "zankoku",
    ].includes(musica)
  ) {
    await sleep(b);
    print(
      "\n♫ Suena el opening de Evangelion, 'Cruel Angel's Thesis' ♫\nCongratulations!\n",
    );
    musica = "Evangelion";
    await path4();
  } else if (["miranda", "miranda!"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'Traición'. ♫\nY estamos cantando en el auto.\n");
    musica = "Miranda";
    await path4();
  } else if (["greenday", "green day"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'Jesus of Suburbia' ♫\nI'm the son of rage and love!\n");
    musica = "Green Day";
    await path4();
  } else if (["madonna", "madona"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'Hung Up' ♫\nLa reina del pop.\n");
    musica = "Madonna";
    await path4();
  } else if (["daft punk", "daftpunk", "daft"].includes(musica)) {
    await sleep(b);
    print("\n♫ Suena 'One More Time'. ♫\nEste tema nunca pasa de moda.\n");
    musica = "Daft Punk";
    await path4();
  } else if (
    [
      "lo fi",
      "lo fi hip hop",
      "lofi",
      "lofi hip hop",
      "lofihiphop",
      "low fi",
      "lowfi",
      "lo fi radio",
      "lo fi hip hop radio",
      "lofi radio",
    ].includes(musica)
  ) {
    await sleep(b);
    print(
      "\n♫ Suena 'Lofi Hip Hop Radio' ♫\nBeats to relax/study. Nunca falla.\n",
    );
    musica = "Lofi Hip Hop Radio";
    await path4();
  } else if (["ayuda", "help", "lista", "opciones", "..."].includes(musica)) {
    await sleep(b);
    print(
      "\n===========================================================================================",
    );
    print("Pongamos un poco de música!");
    print(
      "Si no has encontrado nada aún, prueba con las bandas más famosas y no fallarás.",
    );
    print(
      "Yo comenzaría con algo de Bowie, Madonna, los Beatles o tal vez los Stones.",
    );
    print("Prueba con diferentes artistas!");
    print(
      "===========================================================================================",
    );
    await path3();
  } else if (musica === "z") {
    await sleep(b);
    print("\nATAJO");
    await path7();
  } else if (["cambiar", "cambiarr", "cambiarrr"].includes(musica)) {
    await sleep(b);
    print("\n♫ Cambiar ♫\nCambiar\n");
    musica = "Nombre";
    await path4();
  } else if (
    [
      "musica",
      "house",
      "rock",
      "pop",
      "cumbia",
      "punk",
      "musica clasica",
      "clasica",
      "metal",
      "cuarteto",
    ].includes(musica)
  ) {
    await sleep(b);
    print("\nQué artista o banda?\n");
    await path3();
  } else {
    if (contador === 0) {
      await sleep(b);
      contador++;
      print("\nNo hay señal y no traje conmigo nada de esa banda.\n");
      await path3();
    } else if (contador === 1) {
      await sleep(b);
      contador++;
      print("\nPrueba escribir el nombre de tu artista o banda favorita.\n");
      await path3();
    } else if (contador === 2) {
      await sleep(b);
      contador++;
      print(
        "\nSi no has tenido suerte intenta con los más conocidos y no fallarás.\n",
      );
      await path3();
    } else if (contador === 3) {
      await sleep(b);
      contador++;
      print("\nAún nada?\n");
      await path3();
    } else if (contador === 4) {
      await sleep(b);
      contador++;
      print("\nSi lo deseas puedes escribir 'ayuda'.\n");
      await path3();
    } else {
      await sleep(b);
      contador++;
      print("\nLo siento! No tengo nada de ellos.\n");
      await path3();
    }
  }
}

async function path2() {
  print("El viaje comenzó a la (mañana/tarde/noche) ");
  let inputHora = await question();
  hora = inputHora.toLowerCase().trim();
  await sleep(b);

  if (!["mañana", "tarde", "noche", "m", "t", "n"].includes(hora)) {
    await path2();
  } else {
    if (hora === "mañana" || hora === "m") {
      hora = "mañana";
      print(
        "\nFue la decisión correcta. Hay poco tráfico y estoy despierto para manejar.",
      );
      print(
        "Tal vez podríamos desayunar algo en ese conocido parador cuando lleguemos ahí.",
      );
      print(`La ${hora} es perfecta para poner un poco de música.\n`);
      await path3a();
    } else if (hora === "tarde" || hora === "t") {
      hora = "tarde";
      print(
        "\nPodríamos haber salido antes, pero los preparativos llevaron más tiempo del esperado.",
      );
      print(
        "Hay tráfico. La fila de autos llega hasta donde la vista puede alcanzar.",
      );
      print(
        "Tal vez podríamos detenernos en el conocido parador de la ruta y esperar que cambie un poco.",
      );
      print(`La ${hora} es perfecta para poner un poco de música.\n`);
      await path3a();
    } else {
      hora = "noche";
      print(
        "\nCreo que fue la mejor decisión. Casi no hay otros autos, la mayoría saldrá mañana.",
      );
      print(
        "Nos deslizamos por la autopista rápidamente, y ya pronto estaremos en la ruta.",
      );
      print("Tal vez luego podamos tomar un café en ese conocido parador.");
      print(`La ${hora} es perfecta para poner un poco de música.\n`);
      await path3a();
    }
  }
}

async function path1() {
  print(
    "Qué deseas hacer? No olvides nada! (nafta/cubiertas/aceite/vamos!/.../ayuda) ",
  );
  let inputPath = await question();
  let secondPath = inputPath.toLowerCase().trim();

  if (
    [
      "arrancar",
      "encender",
      "poner en marcha",
      "encender auto",
      "contacto",
      "marcha",
      "llave",
      "prender",
      "x",
    ].includes(secondPath)
  ) {
    if (arrancar) {
      print("\nEl motor ya está en marcha. Listos para salir.\n");
    } else {
      print(
        "\nEnciendes el auto y el motor vibra suavemente. Estamos listos para partir!\n",
      );
      arrancar = true;
    }
    await path1();
  } else if (secondPath === "nafta" || secondPath === "n") {
    if (nafta) {
      print("\nTanque lleno.\n");
    } else {
      print("\nLlenas el tanque, siempre es una buena idea antes de viajar.\n");
      nafta = true;
    }
    await path1();
  } else if (["cubiertas", "c", "aire"].includes(secondPath)) {
    if (aire) {
      print("\nAire listo.\n");
    } else {
      print(
        "\nChequeas las cubiertas en la estación de servicio, les agregas un poco de aire.\n",
      );
      aire = true;
    }
    await path1();
  } else if (secondPath === "aceite" || secondPath === "a") {
    if (aceite) {
      print("\nAgua y aceite llenos.\n");
    } else {
      print("\nLevantas el capot y agregas un poco de agua y aceite.\n");
      aceite = true;
    }
    await path1();
  } else if (secondPath === "frenos" || secondPath === "pastilla de frenos") {
    if (frenos) {
      print("\nFuncionan correctamente.\n");
    } else {
      print(
        "\nTodo parece estar en orden. Revisé los frenos con mi mecánico antes de salir.\n",
      );
      frenos = true;
    }
    await path1();
  } else if (["yerba", "mate", "bombilla"].includes(secondPath)) {
    if (yerba) {
      print("\nTodo listo para el mate.\n");
    } else {
      print(
        "\nMejor no olvidar la yerba! Un viaje no es un viaje sin unos buenos mates, eso dicen.\n",
      );
      yerba = true;
    }
    await path1();
  } else if (["agua", "gaseosa", "jugo", "hielo"].includes(secondPath)) {
    if (agua) {
      print("\nYa tengo.\n");
    } else {
      print("\nBotellas de agua listas y bien frías.\n");
      agua = true;
    }
    await path1();
  } else if (
    ["mapa", "direccion", "direcciones", "mapas"].includes(secondPath)
  ) {
    if (mapa) {
      print("\nMapa preparado!\n");
    } else {
      print(
        "\nLlevaré mi viejo y confiable mapa de las rutas argentinas. Por si hay problemas de señal.\n",
      );
      mapa = true;
    }
    await path1();
  } else if (["celular", "celu", "telefono", "gps"].includes(secondPath)) {
    if (celular) {
      print("\nCelular listo y cargado.\n");
    } else {
      print("\nMejor no olvidar mi teléfono. My gps vive allí.\n");
      celular = true;
    }
    await path1();
  } else if (
    ["cambio", "monedas", "dinero", "plata", "efectivo", "billetes"].includes(
      secondPath,
    )
  ) {
    if (cambio) {
      print("\nDinero en efectivo, listo.\n");
    } else {
      print(
        "\nAgarras un poco de dinero y te aseguras de tener cambio para los peajes.\n",
      );
      cambio = true;
    }
    await path1();
  } else if (
    [
      "comida",
      "aliento",
      "alimentos",
      "sandwich",
      "sandwiches",
      "sandwichs",
      "pan",
      "galletas",
      "galletitas",
      "fruta",
      "frutas",
      "chocolate",
      "sandwiches de miga",
      "sandwichitos de miga",
      "almuerzo",
      "vianda",
      "bianda",
    ].includes(secondPath)
  ) {
    if (comida) {
      print("\nSandwiches listos en el bolso.\n");
    } else {
      print("\nPreparé unos sandwiches para el camino, mejor no olvidarlos.\n");
      comida = true;
    }
    await path1();
  } else if (["musica", "spotify", "temas", "cds"].includes(secondPath)) {
    if (musicaviaje) {
      print("\nYa llevo música, de todo un poco.\n");
    } else {
      print("\nMúsica lista y cargada en el celu.\n");
      musicaviaje = true;
    }
    await path1();
  } else if (
    [
      "bolsos",
      "bolso",
      "valija",
      "valijas",
      "maleta",
      "maletas",
      "equipaje",
    ].includes(secondPath)
  ) {
    if (bolsos) {
      print("\nLos bolsos ya están en el baúl.\n");
    } else {
      print("\nValijas listas y en el baúl.\n");
      bolsos = true;
    }
    await path1();
  } else if (
    [
      "flores",
      "verde",
      "maria",
      "charuto",
      "thc",
      "marihuana",
      "hierva",
      "hierba",
      "fafafa",
      "fasito",
      "faso",
      "prensado",
      "mariguana",
      "droga",
      "drogas",
      "canabis",
      "cannabis",
      "porrito",
      "porro",
      "porros",
    ].includes(secondPath)
  ) {
    if (yerba2) {
      print("\nFlores listas, de mi cosecha. Huelen bien!\n");
    } else {
      print(
        "\nCasi lo olvido! Llevaré unas flores para cuando lleguemos a destino.\n",
      );
      yerba2 = true;
    }
    await path1();
  } else if (secondPath === "z") {
    print("\nATAJO\n");
    await path11b();
  } else if (secondPath === "...") {
    print(
      "\nPrueba con diferentes cosas que te sirvan en tu viaje, o si lo necesitas escribe 'ayuda'.\n",
    );
    await path1();
  } else if (secondPath === "ayuda" || secondPath === "help") {
    await sleep(b);
    print(
      "\n===========================================================================================",
    );
    print("Road Trip Simulator (2022) - Versión Web en JavaScript");
    print("Autor original: Guido Cano ");
    print(
      "===========================================================================================",
    );
    print("► Bienvenidos a RTS! ◄");
    print(
      "Falta poco para partir! Prueba escribir diferentes cosas que te ayudarán en tu viaje",
    );
    print("Intenta con términos simples, de una o dos palabras.");
    print(
      "Si no sabes cómo seguir, tal vez sea una buena idea poner el auto en marcha antes de salir.",
    );
    print(
      "Más adelante en el juego podrás responder las opciones escribiendo solo su primera letra.",
    );
    print("Puedes presionar 'ayuda' cada vez que lo necesites.");
    print("Espero que lo disfrutes!");
    print(
      "===========================================================================================\n",
    );
    await sleep(b);
    await path1();
  } else if (["vamos", "salir", "vamos!", "partir", "v"].includes(secondPath)) {
    if (vamos && !arrancar) {
      print("\nYa están sentados y listos. El auto no está en marcha.\n");
      await path1();
    } else if (arrancar) {
      await sleep(b);
      print("\nTodo listo!!");
      await sleep(b);
      print(
        "\nEl auto acelera por Avenida San Juan y se abre paso por las calles de Buenos Aires.",
      );
      print("Pronto están en la 9 de Julio subiendo a la autopista.");
      print(
        "Aún con las ventanillas altas se escucha el sonido del asfalto.\n",
      );
      await sleep(b);
      print(`${companion} bromea sobre una imágen que ve en su celular.`);
      print(
        "La imágen compara un perro grande y un perro chiquito con diferentes tipos de plantas.",
      );
      print("Hace una voz graciosa:");
      print(
        '"Me regaste y el agua estaba muy fría, ahora debo morir." Ambos ríen.',
      );
      print("Memes, el nuevo lenguaje del mundo.\n");
      await sleep(b);
      await path2();
    } else {
      print(
        "\nSe suben al auto. Por dentro también reluce, y huele a lavanda. No está en marcha.\n",
      );
      vamos = true;
      await path1();
    }
  } else {
    await path1();
  }
}

async function inicioGame() {
  rta1 = "";
  while (
    rta1 !== "si" &&
    rta1 !== "no" &&
    rta1 !== "n" &&
    rta1 !== "s" &&
    rta1 !== "z"
  ) {
    if (repeticion) {
      await sleep(b);
      print("Quieres volver a viajar? (si/no) ");
    } else {
      await sleep(b);
      print("Quieres comenzar un viaje? (si/no) ");
    }
    let inputInicio = await question();
    rta1 = inputInicio.toLowerCase().trim();
  }

  if (rta1[0] === "s") {
    repeticion = true;
    print("");
    await sleep(b);
    print("Te decides y comienzas con los preparativos!");
    print(
      "Realizas los controles necesarios y le haces una visita a tu mecánico de confianza.",
    );
    print(
      "Pasas por el lavadero y esperas tomando un café, mirando a la gente pasar por Avenida Rivadavia.",
    );
    print(
      "Pronto tendrás unos días libres, y has decidido pasarlos en la costa.\n",
    );
    await sleep(b);
    print(
      "Desde el comienzo sabías a quién le dirías que te acompañe. (Nombre) ",
    );
    companion = await question();
    print("");
    await sleep(b);
    print(
      `Se lo preguntaste una tarde entre mate y mate, y ${companion} aceptó de inmediato.\n`,
    );
    await sleep(b);

    await typeWriter('"Un viaje a la costa, y manejás vos?', c);
    await sleep(d);
    await typeWriter(' Dónde firmo?"', c);

    print("\n\n                       ---\n");
    await sleep(b);
    print("Llegó el día, y ya está casi todo listo.");
    print(`Pasas por la casa de ${companion} y cargan su bolso en el baúl.\n`);
    await path1();
  } else {
    if (rta1 === "z") {
      await path1();
    } else {
      await sleep(b);
      print("\nSerá en otro momento!\n");
      userInput.disabled = true; // Desactiva la entrada si decide no jugar
    }
  }
}

// Inicializar ejecución web
main();
