import { useState, useEffect, useRef } from 'react';
import { AddCategory, GifGrid } from './components';

export const GifExpertApp = () => {
    const [category, setCategory] = useState(''); // Cambiado a una sola categoría (string)
    const containerRef = useRef(null); // Referencia al contenedor para calcular la altura

    /**
     * Función para agregar una nueva categoría
     * @param {string} newCategory - Nueva categoría a buscar
     */
    const onAddCategory = (newCategory) => {
        console.log('Adding category:', newCategory);
        if (category === newCategory) return; // Evita búsquedas duplicadas
        setCategory(newCategory); // Actualiza la categoría activa
    };

    /**
     * Enviar la altura dinámica al padre usando postMessage
     */
    const sendHeightToParent = () => {
        if (window.parent) {
            const height = containerRef.current.scrollHeight; // Calcula la altura total
            console.log('Sending height to parent:', height);
            window.parent.postMessage({ type: 'iframeHeight', height }, '*'); // Cambia '*' al dominio del padre
        }
    };

  /**
     * Usar ResizeObserver para detectar cambios en el tamaño del contenedor
     */
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            if (entry.target === containerRef.current) {
                const newHeight = entry.contentRect.height; // Nueva altura del contenedor
                sendHeightToParent(newHeight); // Envía la altura al padre
            }
        }
    });

    if (containerRef.current) {
        observer.observe(containerRef.current); // Observar el contenedor
    }

    return () => {
        if (containerRef.current) {
            observer.unobserve(containerRef.current); // Dejar de observar al desmontar
        }
    };
}, []); // Se ejecuta solo al montar/desmontar

    return (
        <div ref={containerRef} className='iframe-wrapper'>
            <AddCategory onNewCategory={onAddCategory} />
            <div className='container-grid'>
                <GifGrid
                    key={category} // Usa la categoría como clave única
                    category={category} // Pasa la categoría activa
                    //onContentLoaded={sendHeightToParent} // Llama a sendHeightToParent al cargar contenido
                />
            </div>
        </div>
    );
};
