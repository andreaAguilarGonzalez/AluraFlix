import './MainBanner.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrlFeatured = "http://localhost:3000/featured";

export default function MainBanner({}) {


    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(apiUrlFeatured);
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
    

    // TODO get data from service
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <section
        className='banner'
        style={{
            backgroundImage: `radial-gradient(
                rgba(255, 255, 255, 0.1) 10%,
                rgba(0, 0, 0, 1) 100%
            ) , url(${data.imgUrl})`
        }}>
            <div className='contenedor'>
                <p className='texto'>
                    <span className='tag' style={{
                        backgroundColor: data.categoria.labelColor
                    }}>{data.categoria.nombre}</span>
                    <span className='title'>{data.titulo}</span>
                    <span className='desc'>{data.desc}</span>
                </p>

                <iframe className='player'
                src={data.videoUrl}
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </section>}

        </div>
    )
}