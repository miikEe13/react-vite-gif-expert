import { useState, useEffect, useRef } from 'react';
import { AddCategory, GifGrid, TitleApp } from './components';

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['Age of Empires']);
    const containerRef = useRef(null); // Para referenciar el contenedor y calcular la altura

    /**
     * Función para agregar una categoría
     * @param {*} newCategory
     */
    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;
        setCategories([ newCategory, ...categories ]);
    };

    /**
     * Función para remover una categoría
     * @param {*} categoryToRemove
     */
    const onRemoveCategory = (categoryToRemove) => {
        setCategories(categories.filter((category) => category !== categoryToRemove));
    };

    /**
     * Enviar la altura dinámica al padre usando postMessage
     */
    const sendHeightToParent = () => {
        if (window.parent) {
            const height = containerRef.current.scrollHeight;
            console.log('Sending height to parent:', height);
            window.parent.postMessage({ type: 'iframeHeight', height }, '*'); // Cambia '*' al dominio del padre
        }
    };

    // Monitorea cambios en las categorías y ajusta la altura
    useEffect(() => {
        sendHeightToParent();
    }, [categories]);

    return (
        <div ref={containerRef} className='iframe-wrapper'>
            {/* <TitleApp /> */}
            <AddCategory onNewCategory={(value) => onAddCategory(value)} />
            <div className='container-grid'>
                {categories.map((category) => (
                    <GifGrid
                        key={category}
                        category={category}
                        onRemoveCategory={() => onRemoveCategory(category)} // Pasar la función de remover como prop
                    />
                ))}
            </div>
        </div>
    );
};
