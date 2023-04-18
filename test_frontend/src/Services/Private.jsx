import { RouteBase } from './BaseUrl'
/*Importación de la ruta */

export async function GetRoute(url) {

    const response = await fetch(`${RouteBase}/${url}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    )
        .then(function (data) {
            //StatusCode(data);
            return data.json()
        }).catch(function (data) {
            //StatusCode(data);
            return [];
        });
    return await response;
}


// **************************************************************************
// Funcion guardar registros json
// **************************************************************************
export async function PostRoute(url, form) {
    const data = JSON.stringify
        (
            {
                usuario: 1,
                ...form
            }
        );
    // elviamos el formulario con fetch por el metodo post
    const response = await fetch(`${RouteBase}/${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }
    )
        .then(function (data) {
            // StatusCode(data);
            return data.json()
        }).catch(function (data) {
            // StatusCode(data);
            return [];
        });

    return await response;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GetRoute,
    PostRoute
}