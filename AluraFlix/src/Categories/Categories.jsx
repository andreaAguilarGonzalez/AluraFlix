import './Categories.css'
import Card from '../Card/Card'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Categories(
    {
        tagBackgroundColor = "#6BD1FF",
        tagTitle = "Front end",
        categoria = 1,
        handleOpenModal
    }
){

    const apiUrlCategorias = "http://localhost:3000/videos?categoria="+categoria;
    const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrlCategorias);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);

      }
    };

    fetchData();
  }, []);
  
  const onDelete = async () => {
    setIsLoading(true);
    const response = await axios.get(apiUrlCategorias);
    setData(response.data);    
    setIsLoading(false);
  }
    
    return (
        <section className='category'>
            <p className='tagList' style={{
                        backgroundColor: tagBackgroundColor
                    }}>{tagTitle}</p>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data &&
            <div className='cardsContainer'>
                {
                    data.map( (item) => (
                    <Card tagBackgroundColor={tagBackgroundColor} backgroundImage={item.imgUrl} item={item} onDelete={onDelete} handleOpenModal={handleOpenModal}/>
                    ))
                }
            </div>
        }
        </section>
    )
}