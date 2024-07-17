import './Card.css'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Card({
    tagBackgroundColor,
    backgroundImage,
    item,
    onDelete,
    handleOpenModal
}) {

    const apiUrlDeleteId = "http://localhost:3000/videos/:id";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const deleteCategoria = async (id) => {
        setIsLoading(true);
        try {
          const response = await axios.delete(apiUrlDeleteId.replace(':id', item.id));
          onDelete()
        } catch (error) {
          setError(error);
          console.error('Error deleting categoria:', error); // Log the error for debugging
        } finally {
          setIsLoading(false);
        }
      };
    
      const editar = () => {
        handleOpenModal(item)
        console.log('Edit clicked!');
      };
    

    return (
        <div className='CardContainer'
        style={{
            borderColor: tagBackgroundColor
        }}
        >
            <div className='imgCard' style={{
            backgroundImage: `url(${backgroundImage})`
        }} />
            <div className='BotonesCard'
            
            >
                <p className='buttonsCards' onClick={() => deleteCategoria(item.id)}>
                    <MdOutlineDeleteForever size={28}/>                Borrar
                </p>
                <p className='buttonsCards' onClick={() => editar()}>
                    <CiEdit size={28}/>Editar
                </p>
            </div>
        </div>
    )
}