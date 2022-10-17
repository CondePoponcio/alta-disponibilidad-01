import '../sass/components/comments.scss'
import React, { Fragment, useState, useEffect, useRef } from 'react';
import Stars from './layout/Stars';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import CustomizedButtons from './layout/CustomizedButtons.tsx';
import { api } from '../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MySwal = withReactContent(Swal)

const Comment = ({item: {ID, Title, Description, UpdatedAt, Username, Puntaje}, isAuthenticated, user, id}) => {

    //temp
    const [texto, setTexto] = useState({value:''})
    const [star, setStar] = useState(0)
    const [edit, setEdit] = useState(false)
    

    const handleSubmitReview = async () => {
        try {
            let response = await api.put("/review/" + ID, {Puntaje: star, Description: texto.value, Username: user.Username})
            window.location.reload()
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

    const handleDeleteReview = async () => {
        try {
            let response = await api.delete("/review/" + ID, {Puntaje: star, Description: texto.value, Username: user.Username})
            window.location.reload()
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
    return <div className="each-component">
        <div style={{"display":"flex", "gap": "1rem", "justifyContent": "space-between"}}>
            <div style={{"display":"flex", "gap": "1rem"}}>
                <p>Usuario: {Username}</p>
                <p>Fecha: {UpdatedAt.slice(0,10).replace("T", " ")}</p>
            </div>
            <div>
                {isAuthenticated && user && user.Username == Username && <Fragment>
                    <EditIcon color={"primary"} onClick={()=>{
                        let val = edit
                        
                        setEdit(!val)
                    }} />
                    <DeleteIcon color={"error"} onClick={()=>{
                        handleDeleteReview()
                    }} />    
                </Fragment>}
            </div>
            
        </div>
        <Stars star={(isAuthenticated && edit && user && user.Username == Username)?star:Puntaje} setStar={(val)=>{
            
            setStar(val)
        }}/>
        <div className="text">
            {(isAuthenticated && edit && user && user.Username == Username) && <p>Déjenos su comentario</p>}
            <TextField
                key={`text-flied`}
                placeholder="Escriba  aquí"
                multiline
                disabled={!edit}
                fullWidth
                value={edit?(texto.value ? texto.value : ''):Description}
                minRows={3}
                maxRows={14}
                
                onChange={async (event) => {
                    var data = event.target.value;
                    
                    setTexto({value: data?data:''})
                    
                }}
            />

            {isAuthenticated && edit && user && user.Username == Username && <CustomizedButtons text={"Actualizar"} handleOpen={()=>{handleSubmitReview()}} />}
        </div>

        
        
        <hr />
    </div>
}

const Comments = ({comentarios, id, isAuthenticated, user}) => {

    const [open, setOpen] = useState(true)
    const [star, setStar] = useState(0)
    const [texto, setTexto] = useState({value:''})
    const handleSubmitReview = async () => {
        try {
            let response = await api.post("/review", {IdMovie: parseInt(id), Puntaje: star, Description: texto.value, Username: user.Username})
            window.location.reload()
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
                return <Comment id={id} isAuthenticated={isAuthenticated} user={user} key={"comment-"+index} item={item} />
            })}
        </div>
	</div>:<div className="comments-container"> 
        <div>
            <div className="grid">
                <div>
                    <p>Escoge tu puntaje</p>
                    <Stars star={star} setStar={(val)=>{setStar(val)}}/>
                </div>
                <div className="text">
                    <p>Déjenos su comentario</p>
                    <TextField
                        key={`text-flied`}
                        placeholder="Escriba  aquí"
                        multiline
                        fullWidth
                        value={texto.value ? texto.value : ''}
                        minRows={3}
                        maxRows={14}
                        
                        onChange={async (event) => {
                            var data = event.target.value;
                            
                            setTexto({value: data?data:''})
                            
                        }}
                    />
                    {isAuthenticated && <CustomizedButtons text={"Publicar"} handleOpen={()=>{handleSubmitReview()}} />}
                </div>
            </div>
        </div>
    </div>}
    </div>

}


export default Comments