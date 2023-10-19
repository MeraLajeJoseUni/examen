
import { IRequest, IParameter } from './examen/interfaz';


const arregloDeSolicitudes: IRequest[] = [
    {
        id: 1,
        URL: "https://ejemplo.com/solicitud1",
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
   
];


function eliminarElementoPorID(
    arreglo: IRequest[],
    idAEliminar: number
) {
    const elementoEncontrado = arreglo.find((elemento) => elemento.id === idAEliminar);

    if (elementoEncontrado) {
        elementoEncontrado.eliminado = true;
        console.log("Elemento Eliminado:");
        console.log(elementoEncontrado);
    } else {
        console.log("Elemento no encontrado.");
    }
}


eliminarElementoPorID(arregloDeSolicitudes, 2);