import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Comments from './Comments'
import {api} from './../utils/api';
import CustomizedButtons from './layout/CustomizedButtons.tsx';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Movie = ({auth: {isAuthenticated, user}}) => {
    const { id } = useParams();
    const [movie_data, setMovie_data] = useState(null)
    const [comments, setComments] = useState([])
    const getData = async () => {
        try {
            let datos = await api.get(`/movie/${id}`)
            let comentarios = await api.get(`/review/${id}`)
            console.log("Que esta pasadno: ", comentarios)
            setMovie_data(datos.data)
            setComments(comentarios.data)
        } catch (error) {
            var message = error.message
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
        getData()
    }, [])
    return <div className="container-movie">
        
        <div className="grid-movie">
            <div className="title">
                <h2>{movie_data && movie_data.Title}</h2>
            </div>
            <div className="img">
                <img src="https://somoskudasai.com/wp-content/uploads/2020/10/Ek9eLUEWAAAs0xd.jpg" alt="" />
            </div>
            <div className="description">
                {movie_data && movie_data.Description}
            </div>
            <div className="rating">
                {comments.reduce((partialSum, a) => partialSum + a.Puntaje, 0)/comments.length}
            </div>
            <div className="fecha">
                {movie_data && Date.parse(movie_data.UpdatedAt) && movie_data.UpdatedAt.slice(0,10).replace('T', ' ')}
            </div>

        </div>
        
        <Comments id={id} comentarios={comments} user={user} isAuthenticated={isAuthenticated} />

        

    </div>
}


Movie.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {  })(Movie);