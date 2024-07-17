import './App.css'
import Navbar from './Navbar/Navbar.jsx'
import MainBanner from './MainBanner/MainBanner.jsx'
import Categories from './Categories/Categories.jsx'
import NuevoVideo from './NuevoVideo/NuevoVideo.jsx'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosCloseCircleOutline } from "react-icons/io";



const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null; // Early return if modal is not open

  console.log(item);
  const apiUrlCategorias = "http://localhost:3000/categorias";
  const [categorias, setCategorias] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [titulo, setTitulo] = useState(item.titulo);
  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const [categoria, setCategoria] = useState(item.categoria);
  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const [imagen, setImagen] = useState(item.imgUrl);
  const handleChangeImagen = (event) => {
    setImagen(event.target.value);
  };

  const [video, setVideo] = useState(item.videoUrl);
  const handleChangeVideo = (event) => {
    setVideo(event.target.value);
  };


  const [desc, setDesc] = useState(item.desc);
  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const limpiar = () => {

      setTitulo(item.titulo);
      setCategoria(item.categoria);
      setImagen(item.imgUrl);
      setVideo(item.videoUrl);
      setDesc(item.desc);
  }

  const guardar = (id,titulo,categoria,imagen,video,desc) => {

    const apiUrlUpdateVideo = "http://localhost:3000/videos/"+id;
    item.titulo = titulo;
    item.categoria = categoria;
    item.imagen = imagen;
    item.video = video;
    item.desc = desc;
  
    const handleUpdateVideo  = async () => {
        setIsLoading(true);
        try {
          const response = await axios.put(apiUrlUpdateVideo, item);
          setCategorias(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          //onClose();
        }
    };
    handleUpdateVideo();
  
  }
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrlCategorias);
        setCategorias(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);

      }
    };

    fetchData();
  }, []);


  return (
    <div className="modal">
        <div className="modal-content">
          <span className='closeButton' onClick={onClose}>
            <IoIosCloseCircleOutline size={40} />
          </span>
          <p className='editTitle'>Edit Card</p>
          <form className='formEdit'>
            <label for="titulo">Titulo</label>
            <input placeholder="ingrese el titulo" id="titulo" value={titulo} onChange={handleChangeTitulo}></input>

            <label for="categoria">Categoria</label>
            <select id="categoria" onChange={handleChangeCategoria}>
              {
                categorias && categorias.map(
                  (cat) => <option selected={item.categoria == cat.id } value={cat.id}>{cat.nombre}</option>
                )
              }
            </select>

            <label for="imagen">Imagen</label>
            <input placeholder="enlace a la imagen" id="imagen" value={imagen} onChange={handleChangeImagen}></input>

            <label for="desc">Url Video</label>
            <input placeholder="url del video" id="video" value={video} onChange={handleChangeVideo}></input>

            <label for="video">Descripcion</label>
            <textarea placeholder="descripcion" id="desc" rows={6} value={desc} onChange={handleChangeDesc}></textarea>

            <div className='botonesEdit'>
              <button type="reset" className='action' onClick={limpiar}>Limpiar</button>
              <button type="submit" className='action active' onClick={() => guardar(
                item.id,
                titulo,
                categoria,
                imagen,
                video,
                desc,
              )}>Guardar</button>
            </div>
            
          </form>
        </div>
      </div>
    );
};

const apiUrlCategorias = "http://localhost:3000/categorias";

function App({isNuevo, categories=[{},{},{}]}) {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (item) => {
    console.log("open");
    setIsOpen(true);
    setItem(item)
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };


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


  let content = ""
  if(isNuevo == true) {
    content = (
      <NuevoVideo />
    ) 
  }  else {
    content = (
      <div>
        <MainBanner/>
        {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data &&
            data.map( (item) => (
              <Categories tagBackgroundColor={item.labelColor} tagTitle={item.nombre} categoria={item.id} handleOpenModal={handleOpenModal}/>  
            ))
          }
          {isOpen && (
          <Modal isOpen={isOpen} onClose={handleCloseModal} item={item}/>
      )}
      </div>
    )
  }
  return (
    <>
      <Navbar/>
      {content}
    </>
  )
}

export default App
