import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';
import { useEffect } from 'react';

export const GifGrid = ({ category }) => {
    const { images, isLoading } = useFetchGifs(category);

    // useEffect(() => {
    //     if (!isLoading && images.length > 0) {
    //         // Detecta cuando todas las imágenes han cargado completamente
    //         const checkImagesLoaded = () => {
    //             const allImagesLoaded = images.every((image) => {
    //                 const img = document.querySelector(`img[src="${image.url}"]`);
    //                 return img && img.complete;
    //             });

    //             if (allImagesLoaded && onContentLoaded) {
    //                 console.log('Todas las imágenes han cargado');
    //                 onContentLoaded(); // Notifica al componente padre
    //             }
    //         };

    //         checkImagesLoaded(); // Revisa inmediatamente
    //     }
    // }, [isLoading, images, onContentLoaded]);

    return (
        <>
            <div className='wraper-cards'>
                <div>
                    <h3>{category}</h3>
                    {isLoading && (<h2>Cargando...</h2>)}
                </div>
                <div className="card-grid">
                    {
                        images.map((image) => (
                            <GifItem key={image.id} {...image} />
                        ))
                    }
                </div>
            </div>
        </>
    );
};
