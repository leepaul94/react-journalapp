

export const fileUpload = async( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/leepaul/upload'; // lo que voy a llamar en el fetch

    const formData = new FormData(); // formato del postman
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try { // por si algo sale mal
        
        const resp = await fetch( cloudUrl, { // vamos a obtener todo lo que responda cloudinary
            method: 'POST',
            body: formData
        });

        if( resp.ok ) { // si la respuesta se hace correctamente
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json(); // si no se muestra el error en consola. seria un error de cloudinary
        }
    } catch (error) {
        throw error; // Si no se cumple directamente me muestre el error. un error mio del codigo ej que este mal el url
    }
}