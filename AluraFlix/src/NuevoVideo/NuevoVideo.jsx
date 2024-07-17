import "./NuevoVideo.css"

export default function NuevoVideo() {
    return (
        <section className="newVideo">
            <h1>Nuevo Video</h1>
            <h4> Completa el formulario para crear una nueva tarjeta de video.</h4>

            <hr></hr>
            <h3>Crear Tarjeta</h3>
            <hr></hr>

            <form className="formulario">
                <label for="titulo">Titulo</label>
                <input placeholder="ingrese el titulo" id="titulo"></input>

                <label for="categoria">Categoria</label>
                <select id="categoria">
                    <option>Desde el Servicio</option>
                </select>

                <label for="imagen">Titulo</label>
                <input placeholder="enlace a la imagen" id="imagen"></input>

                <label for="video">Titulo</label>
                <input placeholder="url del video" id="video"></input>

                <label for="video">Titulo</label>
                <textarea placeholder="url del video" id="video"></textarea>

               <button type="reset">Limpiar</button>
               <button type="submit">Guardar</button>
            </form>
        </section>
    )
}