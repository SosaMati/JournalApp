import logo from '../../assets/journal.png';

export const LogoScreen = (img) => {
    return (
        <div className='auth__logo animate__animated animate__fadeInDown'>
            <img src= { logo } alt="Logo"/>
            <h1> Journal App</h1>
        </div>
    );
};