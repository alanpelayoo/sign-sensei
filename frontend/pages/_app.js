import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

export default function App({ Component, pageProps }) {
  return (
    <div className='main-container'>
      <Header className="header" />
      <div className="component-content">
        <Component {...pageProps} />
      </div>
      <Footer className="footer" />
    </div>
  )
}