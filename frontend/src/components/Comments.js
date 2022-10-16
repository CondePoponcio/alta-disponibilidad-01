import '../sass/components/comments.scss'
import React, { Fragment, useState, useEffect } from 'react';
import Stars from './layout/Stars';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import CustomizedButtons from './layout/CustomizedButtons.tsx';
import { api } from '../utils/api';

const MySwal = withReactContent(Swal)

const Comment = ({item: {Title, Description, UpdatedAt, Username, Puntaje}}) => {
    return <div className="each-component">
        <div style={{"display":"flex"}}>
            <p>{Username}</p>
            <p>{UpdatedAt.slice(0,10).replace("T", " ")}</p>
        </div>
        <Stars star={Puntaje} setStar={(val)=>{}}/>
        <p>{Description}</p>
        
        <hr />
    </div>
}

const Comments = ({comentarios}) => {

    const [open, setOpen] = useState(true)
    const [star, setStar] = useState(0)
    const handleSubmitReview = async () => {
        try {
            let response = await api.post("/review/"+)
        } catch (error) {
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
    return <div className="container-comments">
        <div className="tabs">
            <input type="radio" className={`${open?"checked":''}`} id="radio-1" name="tabs" onChange={e=>setOpen(true)} />
            <label className="tab" htmlFor="radio-1">Comentarios<span className="notification">{Array.isArray(comentarios) && comentarios.length}</span></label>
            <input type="radio" className={`${!open?"checked":''}`} id="radio-2" name="tabs" onChange={e=>setOpen(false)} />
            <label className="tab" htmlFor="radio-2">Reseña</label>
            <span className="glider"></span>
        </div>

        {open?
	<div className="comments-container">
		<div>
            {Array.isArray(comentarios) && comentarios.map((item, index) => {
                return <Comment key={"comment-"+index} item={item} />
            })}
        </div>
	</div>:<div className="comments-container"> 
        <div>
            <div className="grid">
                <div>
                    <p>Escoge tu puntaje</p>
                    <Stars star={star} setStar={(val)=>{setStar(val)}}/>
                </div>
                <div>
                    <p>Déjenos su comentario</p>
                    <TextField
                        key={`text-flied`}
                        placeholder="Escriba  aquí"
                        multiline
                        fullWidth
                        //disabled={(consulta.fecha_respuesta != null && original)}
                        //value={pres.value ? pres.value : ''}
                        //error={(error || pres.error)}
                        /*helperText={(error || pres.error) ? "Formato Inválido" : ''}*/
                        minRows={3}
                        maxRows={14}
                        
                        onChange={async (event) => {
                            var data = event.target.value;
                            
                            
                            
                        }}
                    />
                    <CustomizedButtons text={"Publicar"} handleOpen={handleSubmitReview} />
                </div>
            </div>
        </div>
    </div>}
    </div>

}


export default Comments