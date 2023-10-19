export interface IRequest {
    id: number;
    URL: string;
    returnType: string;
    format: string;
    parameters: IParameter[];
    eliminado: boolean;
}

export interface IParameter {
    id: number;
    name: string;
    type: string;
    comment: string;
    requestId: number;
}

const arregloDeSolicitudes: IRequest[] = [
    {
        id: 1,
        URL: "https://ejemplo1.com",
        returnType: "JSON",
        format: "GET",
        parameters: [
            {
                id: 1,
                name: "param1",
                type: "string",
                comment: "Primer parámetro",
                requestId: 1,
            },
        ],
        eliminado: false,
    },
    {
        id: 2,
        URL: "https://ejemplo2.com",
        returnType: "XML",
        format: "POST",
        parameters: [
            {
                id: 1,
                name: "param1",
                type: "number",
                comment: "Primer parámetro",
                requestId: 2,
            },
        ],
        eliminado: false,
    },
    {
        id: 3,
        URL: "https://ejemplo3.com",
        returnType: "CSV",
        format: "GET",
        parameters: [
            {
                id: 1,
                name: "param1",
                type: "boolean",
                comment: "Primer parámetro",
                requestId: 3,
            },
        ],
        eliminado: false,
    },
];


function eliminarElementoPorID(
    arreglo: IRequest[],
    idAEliminar: number,
    callback: (elementoEliminado: IRequest | null) => void
) {
    const elementoEncontrado = arreglo.find((elemento) => elemento.id === idAEliminar);

    if (elementoEncontrado) {
        elementoEncontrado.eliminado = true;
        callback(elementoEncontrado);
    } else {
        callback(null);
    }
}


eliminarElementoPorID(arregloDeSolicitudes, 2, (elementoEliminado) => {
    if (elementoEliminado) {
        console.log("Elemento Eliminado:");
        console.log(elementoEliminado);
    } else {
        console.log("Elemento no encontrado.");
    }
});
//definir llamada usando prisma
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function crearSolicitudesEnBaseDeDatos() {
  try {
    
    for (const solicitud of arregloDeSolicitudes) {
      const nuevaSolicitud = await prisma.request.create({
        data: {
          URL: solicitud.URL,
          returnType: solicitud.returnType,
          format: solicitud.format,
          eliminado: solicitud.eliminado,
          parameters: {
            create: solicitud.parameters.map((param) => ({
              name: param.name,
              type: param.type,
              comment: param.comment,
            })),
          },
        },
      });
      console.log("Solicitud creada:", nuevaSolicitud);
    }
  } catch (error) {
    console.error("Error al crear las solicitudes en la base de datos:", error);
  } finally {
    await prisma.$disconnect(); 
  }
}
crearSolicitudesEnBaseDeDatos();