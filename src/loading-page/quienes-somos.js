import React, { useEffect } from 'react';
import './Css/styles.css'; // Asegúrate de que tu CSS esté en esta ruta
import './Css/quienes-somos.css'; // Asegúrate de que tu CSS esté en esta ruta
import Navbar from './Navbar';

// Importar imágenes desde la carpeta correcta
import logo from './imagenes/logo-2.png';
import twitterXLogo from './imagenes/Twitter-X-White-Logo-PNG-1.png';
import footerLogo from './imagenes/logo.jpg';

const QuienesSomos = () => {
  useEffect(() => {
    // Agregar Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    // Agregar Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    // Agregar Google Fonts
    const googleFontsLink = document.createElement('link');
    googleFontsLink.rel = 'preconnect';
    googleFontsLink.href = 'https://fonts.googleapis.com';
    document.head.appendChild(googleFontsLink);

    const googleFontsLink2 = document.createElement('link');
    googleFontsLink2.rel = 'preconnect';
    googleFontsLink2.href = 'https://fonts.gstatic.com';
    googleFontsLink2.crossOrigin = 'true';
    document.head.appendChild(googleFontsLink2);

    const googleFonts = document.createElement('link');
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    googleFonts.rel = 'stylesheet';
    document.head.appendChild(googleFonts);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(bootstrapLink);
      document.head.removeChild(googleFontsLink);
      document.head.removeChild(googleFontsLink2);
      document.head.removeChild(googleFonts);
    };
  }, []);

  return (
    <div>
      <Navbar title="Nosotros"/>
      <br />
      <div className="container-quienes-somos">
        <div className="row justify-content-center">
          <div className="col-6 col-sm-3">
            <div className="imagen-logo">
              <img src={logo} alt="logo" width="300" height="300" />
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="seccion-introduccion">
              <h1>Introducción</h1>
              <p>
                Somos <b>Digital Event Hub</b>, una empresa dedicada a eventos públicos y privados, donde
                mezclamos la tecnología y creatividad así como calidad, donde nuestra misión es crear un lugar
                (<b>plataforma</b>) que permita volver más ágil y dinámico el crear un evento.
              </p>
              <p>
                Donde creemos que la tecnología es una de las herramientas más poderosas y lo que buscamos es que
                usted tenga el poder de aprovechar esta ventaja y que sea tu aliado y no tu enemigo, <b>¡y si no
                  sabes nada acerca de la tecnología no te preocupes nosotros mismos te podemos guiar!</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="historia">
        <h2 className="titulo">Nuestra Historia</h2>
        <br />
        <div className="row justify-content-center">
          <div className="col-6 col-sm-4 columna-img">
            <div className="imagen-logo-2">
              <img className="d-block mx-auto" src={logo} alt="logo" width="300" height="300" />
            </div>
          </div>
          <div className="col-6 col-sm-4 columna">
            <div className="parrafo1">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quidem cum amet culpa illum. Itaque
                eos suscipit perspiciatis quaerat asperiores et at quasi aliquam quisquam. Perferendis tempore velit
                cumque pariatur?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum at totam dolore nisi eligendi nihil,
                excepturi molestiae voluptas cumque quidem vitae ducimus possimus fuga, laudantium, ipsa illo
                necessitatibus eveniet voluptatem!
              </p>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-6 col-sm-4 columna">
            <div className="parrafo2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis consectetur sint at eveniet
                accusamus incidunt beatae accusantium nesciunt sed? Doloribus alias omnis corrupti quisquam, in autem
                nesciunt ea optio.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, officiis recusandae. Inventore, omnis
                earum est iusto unde, dolorum fugiat ducimus atque, vitae nihil eum. Voluptatum commodi nam eius
                assumenda fuga.
              </p>
            </div>
          </div>
          <div className="col-6 col-sm-4 columna-img">
            <div className="imagen-logo-3">
              <img className="d-block mx-auto" src={logo} alt="logo" width="300" height="300" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="valores">
        <h3 className="titulo2">Valores</h3>
        <div className="container-texto">
          <p className="texto">
            En <b>Digital Event Hub</b>, nos enorgullece de nuestros valores fundamentales como el profesionalismo
            y la creatividad. Nos comprometemos a ofrecer experiencias únicas, innovando constantemente en el
            diseño y ejecución de cada evento. La calidad es nuestra prioridad, garantizando que cada detalle cumpla
            con las expectativas de nuestros clientes. Fomentamos el trabajo en equipo, colaborando tanto internamente
            como con nuestros clientes, para asegurar el éxito de cada evento.
          </p>
          <p className="texto">
            Además, valoramos la flexibilidad, adaptándonos a las necesidades y cambios que puedan surgir. Practicamos
            la sostenibilidad, incorporando métodos ecológicos y responsables en nuestras operaciones. La
            transparencia es vital para nosotros, manteniendo una comunicación abierta y honesta en todas las etapas
            del proceso. Estos valores no solo definen nuestra forma de trabajar, sino que también construyen
            relaciones de confianza y satisfacción a largo plazo con nuestros clientes.
          </p>
        </div>
      </div>
      <div className="Mision-vision">
        <h4 className="titulo2">Misión y visión</h4>
        <div className="row justify-content-center">
          <div className="col-6 col-sm-3 columna-texto">
            <div>
              <p>
                En <b>Digital Event Hub</b>, nuestra misión es crear experiencias inolvidables a través de la
                planificación y ejecución de eventos innovadores y personalizados, superando las expectativas de
                nuestros clientes con un enfoque de calidad, sostenibilidad y colaboración.
              </p>
            </div>
          </div>
          <div className="col-6 col-sm-3 columna-texto2">
            <div>
              <p>
                Ser líderes en la industria, reconocidos por nuestra creatividad y compromiso con la excelencia,
                estableciendo nuevos estándares en el diseño de eventos y fomentando relaciones duraderas con nuestros
                clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <footer>
        <div className="container-info">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 text-center">
              <img src={footerLogo} alt="Logo" width="150" height="150" />
            </div>
            <div className="col-12 col-md-4 text-center">
              <p>&copy; 2024 Digital Event Hub. Todos los derechos reservados.</p>
            </div>
            <div className="col-12 col-md-4 text-center">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <img src={twitterXLogo} alt="Twitter Logo" width="30" height="30" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuienesSomos;
