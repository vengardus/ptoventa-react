import { v } from "../styles/variables";
import {
    AiOutlineHome,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
// import { RiDashboard3Line } from "react-icons/ri";
import {TbReportAnalytics} from "react-icons/tb"

// import { TbPig } from "react-icons/tb";

export const APP_CONFIG = {
    companyName: 'EF2R',
    appName: 'My Website',
    appDesc: 'EF2R - Soluciones para tu empresa',

    type_user: {
      admin: 'superadmin'
    },

    states: {
      activo: 'activo'
    },

    table : {
      pageSize: 7
    },

    genericDescription : 'Genérica',

    whatsappData : {
        msgDefault: `Buen día`,
        msgConsult: 'Deseo mas información sobre los productos que ofrecen',
        text: {
            masInformacion: 'Mas información'
        }
    },

    movementType: {
        // ingreso: "I",
        // gasto: "G",
        incoming: "ingreso",
        outgoing: "salida"
    },
    actionCrud: {
        update: "update",
        insert: "insert",
    },
    theme: {
        light: "0",
        dark: "1",
    },

    breakpoints: {
        full: "94.2415183vw",   // se le resta el ancho del sidebar lateral: 65px
        card01: "44.2415183vw",
        card02: "45vw"
    },
    productDetailOptions: [
        {
            id: '01',
            desc: 'Descripción'
        },
        {
            id:'02',
            desc: 'Especificaciones'
        },
        {
            id: '03',
            desc: 'Descargas'
        }
    ],

    modules: {
      users: 'users',
      products: 'products',
      product_brand: 'product_brand',
      product_category: 'product_category',
      
    }
};

export const DesplegableUser = [
    {
        text: "Mi perfil",
        icono: v.iconoUser,
        tipo: "miperfil",
    },
    {
        text: "Configuracion",
        icono: v.iconoSettings,
        tipo: "configuracion",
    },
    {
        text: "Cerrar sesión",
        icono: v.iconoCerrarSesion,
        tipo: "cerrarsesion",
    },
];

// export const DataDesplegableTipo = [
//     {
//         text: "Categorias gastos",
//         color: v.colorGastos,
//         tipo: APP_CONFIG.movementType.gasto,
//         bgColor: v.colorbgGastos,
//     },
//     {
//         text: "Categorias ingresos",
//         color: v.colorIngresos,
//         tipo: APP_CONFIG.movementType.ingreso,
//         bgColor: v.colorbgingresos,
//     },
// ];

// export const DataDesplegableMovimientos = [
//     {
//         text: "Gastos",
//         color: v.colorGastos,
//         tipo: APP_CONFIG.movementType.gasto,
//         bgColor: v.colorbgGastos,
//     },
//     {
//         text: "Ingresos",
//         color: v.colorIngresos,
//         tipo: APP_CONFIG.movementType.ingreso,
//         bgColor: v.colorbgingresos,
//     },
// ];

//data SIDEBAR
export const LinksArray = [
    {
        label: "Home",
        icon: AiOutlineHome,
        to: "/",
    },
    {
        label: "Kardex",
        icon: MdOutlineAnalytics,
        to: "/kardex",
      },
      {
        label: "Reportes",
        icon: TbReportAnalytics,
        to: "/report",
      },
];
export const SecondarylinksArray = [
    {
        label: "Configuración",
        icon: AiOutlineSetting,
        to: "/config",
    },

];
//temas
export const TemasData = [
    {
        icon: "🌞",
        description: "light",
    },
    {
        icon: "🌚",
        description: "dark",
    },
];

//data configuracion
export const DataModulosConfiguracion =[
    {
      title:"Productos",
      subtitle:"registra tus productos",
      icono:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
      link:"/config/product",
     
    },
    {
      title:"Personal",
      subtitle:"ten el control de tu personal",
      icono:"https://i.ibb.co/5vgZ0fX/hombre.png",
      link:"/config/user",
     
    },
  
    {
      title:"Tu Empresa",
      subtitle:"configura tus opciones básicas",
      icono:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
      link:"/configurar/empresa",
      
    },
    {
      title:"Categoría de productos",
      subtitle:"asigna categorias a tus productos",
      icono:"https://i.ibb.co/VYbMRLZ/categoria.png",
      link:"/config/category",
      
    },
    {
      title:"Marca de Productos",
      subtitle:"gestiona tus marcas",
      icono:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
      link:"/config/brand",
     
    },
  
  ]
  //tipo usuario
  export const TypeUserData = [
    {
      description: "empleado",
      icon: "🪖",
    },
    {
      description: "administrador",
      icon: "👑",
    },
  ];
  //tipodoc
  export const TypeDocumentData = [
    {
      description: "Dni",
      icon: "🪖",
    },
    {
      description: "Libreta electoral",
      icon: "👑",
    },
    {
      description: "Otros",
      icon: "👑",
    },
  ];