import { Home } from 'pages/Home';
import { Loan } from 'pages/Loan';
import { Routes, Route } from 'react-router-dom';
import './assets/lib/bootstrap/css/bootstrap-reboot.css';
import './assets/lib/bootstrap/css/bootstrap.css';
import './assets/lib/material/css/materialdesignicons.css';
import './assets/styles/style.scss';

const App = () => {
    return (
        <div className='wrapper h-100'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/loan' element={<Loan />} />
            </Routes>

            {/* <Home />
            <Loan /> */}
        </div>
    );
};

export default App;
