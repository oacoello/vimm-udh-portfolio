/*
  Blog de proyectos IMM-V
  -----------------------
  Editá este arreglo con información real y verificada.
  Categorías actuales: "Capacitaciones" y "Proyectos".
*/

window.PROJECT_POSTS = [
  {
  "id": "programacion-de-banda-industrial-lucas-nuelle",
  "title": "Programación de Banda Industrial Lucas Nüelle",
  "author": "V-IMM",
  "date": "2025-12-09",
  "category": "Proyectos",
  "tags": [
    "PLC",
    "Siemens",
    "Industrial"
  ],
  "excerpt": "Diseño y desarrollo de una línea de producción y control de calidad automatizada a escala industrial, denominada IMS (Integrated Manufacturing System). El sistema integra tecnologías de automatización, sistemas de transporte por banda, actuadores mecánicos y una red de sensores ópticos e inductivos coordinados para procesar, verificar y clasificar piezas en tiempo real.",
  "coverImage": "assets\\proyectos\\banda_lucas\\lucas1.JPG",
  "youtube": [
    "https://youtu.be/pwjV7Ii0R6I?si=eq6rqiC_LNvHJoK_"
  ],
  "images": [
    "assets\\proyectos\\banda_lucas\\lucas1.JPG",
    "assets\\proyectos\\banda_lucas\\lucas2.JPG",
    "assets\\proyectos\\banda_lucas\\lucas3.JPG",
    "assets\\proyectos\\banda_lucas\\lucas4.JPG"
  ],
  "content": [
    "El propósito fundamental del proyecto es simular un entorno industrial real centrado en la automatización de etapas de manufactura y el filtrado estricto de control de calidad. El flujo de trabajo está dividido en cinco estaciones secuenciales automatizadas:",
    "Estación de Separación: Detecta el portador vacío mediante sensores de presencia para detenerlo en la posición exacta y suministrar el núcleo base de la pieza desde un almacén vertical.",
    "Estación de Montaje: Coloca y encaja mecánicamente una tapadera protectora sobre el núcleo base que avanza por la banda de transporte.",
    "Estación de Procesamiento: Introduce un perno de sujeción en la pieza ensamblada. Cuenta con sensores dedicados a verificar que el perno haya ingresado correctamente en la cavidad.",
    "Estación de Verificación: Es el núcleo del control de calidad. Utiliza una combinación de sensores inductivos y ópticos para realizar una lectura del color de la pieza y determinar la naturaleza del material del perno.",
    "Estación de Descarte y Clasificación Final: Actúa según los datos recolectados en la fase de verificación. Si el perno es de plástico, la pieza se identifica como defectuosa y es retirada de la línea por un sistema de descarte. Si el perno es de metal, el producto se considera aprobado y avanza a la última etapa, donde se clasifica en cuatro diferentes niveles o \"pisos\" (del 1 al 4) basándose estrictamente en patrones cromáticos combinados (blanco y negro). Una vez clasificado, el ciclo se reinicia automáticamente."
  ]
},
  {
  "id": "automatizacion-de-iluminacion-por-plc-del-edificio-taller-del-instituto-de-investigacion-y-desarrollo",
  "title": "Automatización de Iluminación por PLC del Edificio Taller del Instituto de Investigación y Desarrollo",
  "author": "Oscar Coello",
  "date": "2026-03-19",
  "category": "Proyectos",
  "tags": [
    "PLC",
    "Siemens",
    "Automatización"
  ],
  "excerpt": "Automatización de la iluminación interior y exterior del edificio taller mediante un PLC Siemens LOGO!, contactores y programación en LOGO! Soft Comfort, estableciendo horarios automáticos para mejorar el control, la eficiencia energética y la seguridad de las instalaciones.",
  "coverImage": "assets\\images\\plc_iluminación_1.jpg",
  "images": [
    "assets\\images\\plc_iluminación_2.jpg",
    "assets\\images\\plc_iluminación_3.png",
    "assets\\images\\plc_iluminación_4.jpg",
    "assets\\images\\plc_iluminación_5.png"
  ],
  "content": [
    "Estudiantes de la V Promoción de Ingeniería Militar en Mecatrónica de la Universidad de Defensa de Honduras desarrollaron el proyecto “Automatización de la Iluminación Exterior e Interior del Edificio Taller del Instituto de Investigación de la UDH”, como parte de la asignatura Sistemas Mecatrónicos Aplicados.\nEl proyecto consistió en la implementación de un sistema automatizado de control de iluminación mediante un PLC Siemens LOGO!, programado con LOGO! Soft Comfort. La instalación permite gestionar de forma automática la iluminación exterior e interior del edificio taller, estableciendo horarios definidos para optimizar el consumo energético y mejorar la operatividad de las instalaciones.\nDurante el desarrollo se identificaron y reorganizaron los circuitos eléctricos existentes, se instaló un panel de control con fuente de alimentación, relés, elementos de protección y señalización, además de integrar una lógica de control automático y manual para mayor flexibilidad. La iluminación exterior fue programada para funcionar durante la noche, mientras que la iluminación interior opera en horarios establecidos para las actividades del taller.\nEsta iniciativa representa una aplicación práctica de los conocimientos adquiridos en automatización industrial, programación de PLC, diseño de sistemas de control y montaje mecatrónico, aportando una solución funcional, segura y eficiente al servicio de la comunidad universitaria."
  ],
  "links": [
    {
      "label": "https://1drv.ms/f/c/8a1b764025616097/IgBOOgyp-JzIRpkFRmlFCTQmAYXTn_AsmOJuyAkTkj1RMhA?e=yBW9Hs",
      "url": "#"
    }
  ]
},
  {
    id: "practica-sistemas-telecomunicaciones",
    title: "Práctica en Sistemas de Telecomunicaciones: Innovación y Aprendizaje Continuo",
    author: "Ingeniería Mecatrónica UDH",
    category: "Capacitaciones",
    tags: ["Telecomunicaciones", "Redes", "Práctica", "Innovación"],
    excerpt: "Práctica orientada a aplicar conceptos de redes, transmisión de datos y sistemas de comunicación en entornos técnicos.",
    coverImage: "assets/images/coms1.jpg",
    images: ["assets/images/coms1.jpg"],
    content: [
      "En la U.D.H., los estudiantes de Ingeniería Mecatrónica se encuentran inmersos en un proceso de aprendizaje constante, explorando diversos campos tecnológicos que son fundamentales para la innovación. Los sistemas de telecomunicaciones representan un área clave en esta búsqueda de conocimiento.",
      "Durante nuestras prácticas en telecomunicaciones, los estudiantes tienen la oportunidad de aplicar conceptos teóricos en un entorno práctico y avanzado. Aprendemos a diseñar, implementar y gestionar redes de comunicación, utilizando dispositivos de transmisión de datos y tecnologías de vanguardia.",
      "Cada sesión de laboratorio está diseñada para proporcionar una experiencia integral, donde se abordan desde la configuración de redes hasta la programación de sistemas de comunicación. Estas actividades permiten un enfoque crítico y analítico, preparando a los estudiantes para enfrentar desafíos técnicos complejos.",
      "La colaboración en equipos multidisciplinarios es un componente esencial de nuestra formación. Fomentamos un ambiente de comunicación efectiva y trabajo conjunto, lo que enriquece nuestro aprendizaje y nos capacita para resolver problemas de manera creativa y eficiente.",
      "Al finalizar cada práctica, los estudiantes no solo adquieren conocimientos técnicos, sino que también desarrollan habilidades prácticas altamente valoradas en el mercado laboral."
    ]
  },
  {
    id: "visita-tecnica-aeropuerto-palmerola",
    title: "Visita técnica en Aeropuerto Internacional Palmerola",
    author: "Ingeniería Mecatrónica UDH",
    category: "Capacitaciones",
    tags: ["Visita técnica", "Automatización", "Sistemas de control", "Logística"],
    excerpt: "Visita orientada a comprender sistemas de control, automatización y gestión logística en un aeropuerto.",
    coverImage: "assets/images/xpl1.jpg",
    images: [
      "assets/images/xpl1.jpg",
      "assets/images/xpl2.jpg",
      "assets/images/xpl3.jpg",
      "assets/images/xpl4.jpg",
      "assets/images/xpl5.jpg",
      "assets/images/xpl6.jpg"
    ],
    content: [
      "Durante esta visita, el enfoque principal fue comprender cómo funcionan los sistemas de control en un entorno tan dinámico como un aeropuerto. Los estudiantes aprendieron sobre la importancia de la automatización en la gestión de equipajes y la optimización de procesos logísticos.",
      "Los expertos del aeropuerto compartieron información sobre los sistemas de control que garantizan eficiencia y seguridad en la operación. Los estudiantes observaron cómo se integran tecnologías avanzadas para el monitoreo y la gestión de flujos de equipaje.",
      "Uno de los aspectos más destacados fue el recorrido por las instalaciones de las bandas transportadoras. Los estudiantes pudieron ver cómo estas estructuras optimizan el movimiento de equipajes y mejoran la eficiencia operativa.",
      "La visita incluyó sesiones interactivas con profesionales del aeropuerto, quienes compartieron experiencias y conocimientos sobre logística aeroportuaria."
    ]
  },
  {
    id: "visita-parque-eolico-honduras",
    title: "Visita al Parque Eólico de Honduras: Aprendiendo sobre Energías Renovables",
    author: "Ingeniería Mecatrónica UDH",
    category: "Capacitaciones",
    tags: ["Energía eólica", "Energías renovables", "Sostenibilidad", "Sistemas de control"],
    excerpt: "Experiencia técnica para conocer la generación eólica y su integración en la matriz energética del país.",
    coverImage: "assets/images/eolica1.jpg",
    images: ["assets/images/eolica1.jpg", "assets/images/parque1.jpg"],
    content: [
      "El objetivo principal de esta visita fue conocer los sistemas de generación de energía eólica y comprender cómo se integran en la matriz energética del país. Los estudiantes aprendieron sobre la importancia de las energías renovables en la lucha contra el cambio climático y en la búsqueda de un futuro más sostenible.",
      "Durante el recorrido, los estudiantes observaron de cerca los aerogeneradores y su funcionamiento. Se explicaron los principios de operación, desde la captación del viento hasta la conversión de energía cinética en energía eléctrica.",
      "Un aspecto clave de la visita fue la discusión sobre los sistemas de control utilizados para optimizar el rendimiento de los aerogeneradores. Los profesionales del parque compartieron conocimientos sobre monitoreo y gestión de operaciones en tiempo real.",
      "La visita permitió aplicar conocimientos sobre energías renovables en un contexto real y fortaleció la visión de los estudiantes como futuros ingenieros comprometidos con la sostenibilidad."
    ]
  },
  {
    id: "vehiculo-antichoque",
    title: "Vehículo antichoque",
    author: "Ingeniería Mecatrónica UDH",
    category: "Proyectos",
    tags: ["Arduino", "Robótica", "Sensor ultrasónico", "L293D"],
    excerpt: "Carro robot autónomo capaz de detectar obstáculos y evitar colisiones mediante sensores y control de motores.",
    coverImage: "assets/images/antichoque1.jpg",
    images: ["assets/images/antichoque1.jpg"],
    content: [
      "Un carro robot antichoque es un vehículo robótico que detecta obstáculos y evita colisiones ajustando su dirección. Usa sensores ultrasónicos o infrarrojos para medir la distancia a los objetos.",
      "El proyecto combina electrónica, programación y robótica básica para evitar obstáculos de forma autónoma utilizando un sensor ultrasónico. El sistema detecta objetos a su alrededor con un sensor HC-SR04, que mide la distancia al obstáculo más cercano.",
      "Con base en esta información, el Arduino UNO controla los motores a través de un controlador L293D, permitiendo que el carro se detenga, cambie de dirección y continúe con su camino.",
      "El objetivo es conocer conceptos básicos de electrónica mediante el uso de componentes electrónicos y construir una interfaz de software y hardware capaz de mover un objeto de forma autónoma."
    ]
  },
  {
  "id": "radar-detector-de-objetos",
  "title": "Radar Detector de Objetos",
  "author": "Rodolfo Zúniga",
  "date": "2025-02-20",
  "category": "Proyectos",
  "tags": [
    "Arduino",
    "Sensores"
  ],
  "excerpt": "Sistema de detección en tiempo real que integra sensores ultrasónicos, LEDs, alerta sonora y pantalla LCD.",
  "coverImage": "assets/images/detector1.jpg",
  "youtube": [
    "https://www.youtube.com/shorts/K49UOqTpCSE"
  ],
  "images": [
    "assets/images/detector1.jpg"
  ],
  "content": [
    "El Radar Detector de Objetos con Arduino es un sistema de detección diseñado para identificar obstáculos en tiempo real utilizando tecnología ultrasónica.\nEl sistema incluye tres sensores ultrasónicos, LEDs de diferentes colores, un zumbador para alertas sonoras y una pantalla LCD que muestra las distancias medidas en centímetros.",
    "El radar mide continuamente las distancias a través de los sensores ultrasónicos y activa diferentes respuestas según la proximidad. Cuando detecta menos de 10 cm, enciende un LED indicando la dirección y activa el zumbador.",
    "El proyecto demuestra utilidad en sistemas de seguridad, estacionamientos o monitoreo industrial, y evidencia la integración de distintas tecnologías en un sistema funcional.\""
  ]
},
  {
    id: "simulacion-iluminacion-aeroportuaria-arduino",
    title: "Simulación de Sistema de Iluminación Aeroportuaria con Arduino",
    author: "Elmer Johan López Amador",
    category: "Proyectos",
    tags: ["Arduino", "Iluminación", "Sensor ultrasónico", "Lógica digital"],
    excerpt: "Simulación de iluminación aeroportuaria usando Arduino, sensor ultrasónico, LEDs y lógica digital.",
    coverImage: "assets/images/iluminación1.jpg",
    images: ["assets/images/iluminación1.jpg"],
    content: [
      "El estudiante Elmer Johan López Amador, de tercer año de Ingeniería Mecatrónica, presenta un proyecto que simula el sistema de iluminación de un aeropuerto utilizando Arduino, un sensor ultrasónico, luces LED, cables jumpers, protoboard y resistencias de 330 ohmios.",
      "La simulación permite observar la gestión de la iluminación en función de la detección de objetos, representando un escenario práctico relacionado con sistemas aeroportuarios.",
      "El proyecto demuestra conocimiento práctico de sistemas binarios y lógica digital, aplicando conceptos teóricos a una solución visual y funcional.",
      "Los componentes principales incluyen Arduino, sensor ultrasónico, luces LED, cables jumpers, protoboard y resistencias de 330 ohmios."
    ]
  },
  {
    id: "medidor-velocidad-sensores-ultrasonicos-arduino",
    title: "Medidor de Velocidad con Sensores Ultrasónicos y Arduino",
    author: "Carlos Fernando Velásquez Chávez y Jahir Alejandro Durón Montoya",
    category: "Proyectos",
    tags: ["Arduino", "HC-SR04", "LCD", "Física"],
    excerpt: "Dispositivo que calcula velocidad usando dos sensores ultrasónicos, fórmula distancia/tiempo y pantalla LCD.",
    coverImage: "assets/images/medidordevelocidad1.jpg",
    images: ["assets/images/medidordevelocidad1.jpg"],
    content: [
      "Carlos Fernando Velásquez Chávez y Jahir Alejandro Durón Montoya, estudiantes de tercer año de Ingeniería Mecatrónica, presentan un medidor de velocidad que utiliza principios de física básica y programación en Arduino.",
      "El dispositivo emplea dos sensores ultrasónicos HC-SR04 para medir la distancia recorrida por un objeto en un intervalo de tiempo determinado.",
      "Aplicando la fórmula física de velocidad, distancia entre tiempo, el Arduino calcula y muestra la velocidad en una pantalla LCD 16x2 I2C.",
      "Este proyecto demuestra integración de física, programación y electrónica en un dispositivo funcional."
    ]
  },
  {
    id: "vehiculo-seguidor-linea",
    title: "Vehículo seguidor de línea",
    author: "Ingeniería Mecatrónica UDH",
    category: "Proyectos",
    tags: ["Sensores infrarrojos", "RFID", "HTTP", "Brazo robótico", "Automatización"],
    excerpt: "Vehículo seguidor de línea con brazo robótico identificador y recolector de paquetes.",
    coverImage: "assets/images/seguidor1.png",
    images: [
      "assets/images/seguidor1.png",
      "assets/images/seguidor2.jpg",
      "assets/images/seguidor3.png"
    ],
    content: [
      "El proyecto consiste en el desarrollo de un vehículo seguidor de línea equipado con un brazo robótico identificador y recolector de paquetes.",
      "El carro utiliza sensores infrarrojos para seguir una línea trazada en el suelo. Un sistema de control regula los motores para corregir la trayectoria cuando se detectan desviaciones.",
      "Una vez que el carro llega a una estación, un sistema RFID detecta si ese es el punto correspondiente de descarga. Esta identificación permite tomar decisiones automáticas sin intervención humana.",
      "Se usa el protocolo HTTP para establecer comunicación entre el vehículo y el brazo robótico. Una vez identificada la ubicación, el carro envía una señal al brazo para iniciar la descarga.",
      "Al completar la entrega, el sistema genera automáticamente un informe con detalles del evento y lo envía a Google Drive mediante Google Apps Script, para luego publicarlo automáticamente en una página web conectada al proyecto.",
      "Este proyecto representa una integración completa de sensores, actuadores, comunicaciones y automatización."
    ]
  }
];
