

export const fileUpload = async ( file ) => {

    const cloudUrl = 'http://api.cloudinary.com/v1_1/dapxymupf/upload'; 

    const formData = new FormData(); //formData es una clase de javascript que nos permite enviar archivos a una url

    formData.append( 'upload_preset', 'react-journal' ); //upload_preset es una propiedad que se obtie  de cloudinary y se le pasa el preset que se creo en cloudinary para que se pueda subir un archivo a esa url 
    formData.append( 'file', file ); //file es una propiedad que se obtiene de formData y se le pasa el archivo que se va a subir a cloudinary 

    try {
        const resp = await fetch( cloudUrl, { //fetch es una funcion de javascript que nos permite hacer peticiones a una url
            method: 'POST',  
            body: formData  
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            return null;
        }


    } catch ( err ) {
        throw err;
    }
};