import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {api} from '../../utils/api';
import CustomizedButtons from "./CustomizedButtons.tsx";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import getRandomNumber from '../../utils/getRandomNumber';
import getFotos from '../../utils/getFotos';
const MySwal = withReactContent(Swal)

const Landing = () => {
    let navigate = useNavigate();
    const [movies, setMovies] = useState([])
    
    const getData = async () => {
        try {
            let data = await api.get('/movies');
            
            
            setMovies(data.data)
        } catch (error) {
            var message = error.message;
            MySwal.fire({
                icon: 'error',
                title: "Ha ocurrido un error",
                heightAuto: false,
                showCloseButton: true, showConfirmButton: false,
                html: 
                <CustomizedButtons
                    text={"Ver detalles"}
                    handleOpen={() => {MySwal.showValidationMessage(message)}}
                />
                
            })
        }
    }
    useEffect(() => {
        getData();
    }, [])

    

    return <div className="movies-tvshow-cards-main-container">
        <div className="movies-tvshow-cards-container">
            
            {movies.map((item, index) => <div key={`card-container-${index}`} className="card-main-container" onClick={()=>{
                return navigate("/pelicula/" + item.ID);
            }}>
                <div className="card-container">
                    <div className="card-header-container">
                        {false && <div className="text-left">{item.Gender}</div>}
                        <div className="text-right">{Date.parse(item.UpdatedAt)?(new Date(item.UpdatedAt)).getFullYear():'Desconocida'}</div>
                    </div>
                    <div className="card-image-container">
                        <img src={item.Poster} className="card-image" />
                    </div>
                    <div className="card-footer-container">
                        <div className="card-title">{item.Title}</div>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
}

export default Landing