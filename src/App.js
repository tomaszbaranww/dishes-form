import 'assets/styles/global.scss';
import { Header } from 'components/Header/Header';
import { AddDishForm } from 'features/dishes/AddDishForm/AddDishForm';

export const App = () => {
    return (
        <>
            <Header />
            <main className="App">
                <AddDishForm />
            </main>
        </>
    );
};
