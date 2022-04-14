import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";    
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar"; 
import Swal from "sweetalert2";


export const NoteScreen = () => {

    const dispatch = useDispatch(); 

    const { active:note } = useSelector(state => state.notes);  
    const [ formValues, handleInputChange, reset ] = useForm( note );   
    const { body, title, id } = formValues;  

    const activeId = useRef( note.id );  //redibuja solo si cambia el id

    useEffect(() => {  //cuando cambia el id, resetea el form  

        if( note.id !== activeId.current ) { 
            reset( note ); 
            activeId.current = note.id; 
        }
     
    }, [note, reset]); 

    useEffect(() => {
        dispatch( activeNote ( formValues.id, { ...formValues } ) ); 
   
    }, [formValues, dispatch]);  //si cambia el formValues, se ejecuta el dispatch
    

    const handleDelete = () => {

        if ( !id ) return;  //si no hay id, no se puede borrar

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( ( result ) => {

            if ( result.value ) {

                dispatch( startDeleting( id ) ); 
            }
        });

    };


    

    

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }  
                    onChange={ handleInputChange }  
                />

                <textarea
                    name="body"
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange } 
                ></textarea>

                {
                    (note.url)  //si existe url se muestra la imagen
                    &&  (
                        <div className="notes__image">
                            <img 
                                src={ note.url }
                                alt="foto"
                            
                            />
                        </div>
                    ) 

                }


            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
