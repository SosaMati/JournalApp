import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({    
    cloud_name: 'dapxymupf',  //cloud_name es una propiedad que se obtiene de cloudinary y se le pasa el nombre de la nube que se creo en cloudinary
    api_key: '452493618937567',  //api_key es una propiedad que se obtiene de cloudinary y se le pasa la llave que se creo en cloudinary
    api_secret: 'S3xYn_CdLuQwGCFrbOx6lMp5NAc',  //api_secret es una propiedad que se obtiene de cloudinary y se le pasa la llave secreta que se creo en cloudinary
    secure: true
});


describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async() => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'); 
        const blob = await resp.blob();   

        const file = new File([blob], 'image.png'); 
        const url = await fileUpload( file );

        expect( typeof url).toBe('string');

        //Borrar imagen por id
        const segment =url.split('/');
        const imageId = segment[segment.length - 1].replace('.png', '');
        await cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            
        });
    });

    // test('debe de cargar un archivo y retornar un error', async() => { 

    //     const file = new File([], 'image.png'); 
    //     const url = await fileUpload( file );

    //     expect( typeof url).toBe(null);

    
    // })
})