import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';

export const GifGrid = ({ category, onRemoveCategory }) => {
    const { images, isLoading } = useFetchGifs( category );

    ('isLoading', isLoading);
    return (
        <>
            <div className='wraper-cards'>
                <div>
                    <h3>{ category }</h3>
                    {
                        isLoading && ( <h2>Cargando...</h2> )
                    }
                <button onClick={onRemoveCategory}>Remover</button>
                </div>
                <div className="card-grid">
                    {
                        images.map( ( image ) => (
                            <GifItem key={ image.id } { ...image }/>
                        ))
                    }
                </div>
            </div>
        </>
    )
} 