
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui"; 
import { startRegisterEmailPassword } from "../../actions/auth";


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui); // para obtener el state de ui
    

    const [ formValues, handleInputChange ] = useForm({
        name: 'Hector',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(name, email, password, password2);
        if ( isFormValid() ) {
            dispatch( startRegisterEmailPassword (name, email, password) ); 
        }
    }


    const isFormValid = () => {

        if ( name.trim().length === 0 ) { 
            dispatch( setError('Name is required') );
            return false; 
        } else if ( !validator.isEmail( email ) ) { //se importa Validator de react-validator
            dispatch( setError('Email is not valid') );
            return false; 
        } else if ( password !== password2 || password.length < 5 ) { 
            dispatch( setError('Passwords must match and be at least 6 characters') );
            return false;
        }

        dispatch( removeError() ); //se elimina el error


        return true; 
    }
    



    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                { 
                    msgError &&  //si hay un error se muestra:
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

               <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input" 
                    autoComplete="off" 
                    value={ name } 
                    onChange={ handleInputChange } 
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    autoComplete="off"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className= "btn btn-primary btn-block mb-5" 
                >
                    Register
                </button>


                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                
                </Link>

            </form>

        </>
    );
}