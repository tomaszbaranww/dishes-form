import 'assets/styles/global.scss';
import { Header } from 'components/Header/Header';
import { AddDishForm } from 'features/dishes/AddDishForm/AddDishForm';
import { Footer } from 'components/Footer/Footer';

export const App = () => {
    return (
        <>
            <Header />
            <main>
                <AddDishForm />
            </main>
            <Footer />
        </>
    );
};
