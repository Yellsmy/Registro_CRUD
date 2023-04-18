
import './App.css';
import Ejemplo from './views/Ejemplo/Index';
import Genero from './views/Genero/Index'; //Almacenan vistas
//import PresentationCard from './Ejercicios/PresentationCard';
//import Ejercicio03 from './Ejercicios/Ejercicio03';
//import Ejercicio04 from './Ejercicios/Ejercicio04';
//import Ejercicio05 from './Ejercicios/Ejercicio05';
//import Ejercicio06 from './Ejercicios/Ejercicio06';
//import Ejercicio07 from './Ejercicios/Ejercicio07';
import Producto from './views/Producto/Index';
import Municipio from './views/Municipios/Index';
import Departamento from './views/Departamentos/Index';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";

function App() {

    return (
    <div className="App">
      <div className="container text-center">
        <div className="row">
          <div className="col">
            {/* Menu principal */}
            <Router>
              <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">HOLA LILIBETH </a>
                
                <div className="collapse navbar-collapse" id="navbarNav">

                  {/* EJEMPLO */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/">Ejemplo</Link>
                    </li>
                  </ul>

                  {/* PARA NUEVAS PANTALLAS */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/departamento">Departamento</Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/municipio">Municipio</Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/producto">Productos</Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/genero">Genero</Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/Ejercicios">Ejercicios</Link>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
              {/* CAMBIO DE RUTAS DEL NAVEGADOR */}
                <Routes >
                    {/* RUTA EJEMPLO */}
                    <Route path='/' element={<Ejemplo />} />

                    {/* RUTA GÉNERO */}
                    <Route path='/genero' element={<Genero />} />

                    {/* RUTA PRODUCTOS */}
                    <Route path='/producto' element={<Producto />} />

                    {/* RUTA MUNICIPIOS */}
                    <Route path='/municipio' element={<Municipio />} />

                    {/* RUTA DEPARTAMENTOS */}
                    <Route path='/departamento' element={<Departamento />} />

                    {/* PARA NUEVAS RUTAS */}
                    {/*<Route path='/Ejercicios' element={<PresentationCard />} />*/}

                    {/* PARA NUEVAS RUTAS */}
                    {/*<Route path='/Ejercicios' element={<Ejercicio03 />} />*/}
                    
                    {/* PARA NUEVAS RUTAS */}
                    {/*<Route path='/Ejercicios' element={<Ejercicio04 />} />*/}

                    {/* PARA NUEVAS RUTAS */}
                    {/*<Route path='/Ejercicios' element={<Ejercicio05 />} />*/}

                    {/* PARA NUEVAS RUTAS */}
                    {/*<Route path='/Ejercicios' element={<Ejercicio06 />} />*/}

                    
                </Routes >
              </div>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
