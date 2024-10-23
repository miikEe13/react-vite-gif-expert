import { useState } from 'react';
import { AddCategory, GifGrid, TitleApp } from './components';

export const GifExpertApp = () => {
    const [ categories, setCategories ] = useState([ 'Age of empires' ]);
    /**
     * esto es como un emit
     * @param {*} newCategory 
     * @returns 
     */
    const onAddCategory = ( newCategory ) => {
        ('newCategory', newCategory);
        if ( categories.includes(newCategory) ) return;
        setCategories([ newCategory, ...categories ]);
    }

     /**
      * Función para remover una categoría
      * @param {*} categoryToRemove 
      */
     const onRemoveCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    }

    return (
        <>
            <TitleApp />
            {/* <AddCategory onNewCategory={onAddCategory}/> */}
            <AddCategory onNewCategory={ (value) => onAddCategory(value) }/>
            <div className='container-grid'>
                { 
                    categories.map( ( category ) => (
                        <GifGrid 
                            key={ category }
                            category={ category }
                            onRemoveCategory={() => onRemoveCategory(category)} // Pasar la función de remover como prop
                        />
                    ))
                }
            </div>
        </>
    )
}
