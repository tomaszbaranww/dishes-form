import 'styles/global.scss';
import styles from 'styles/App.module.scss';
import { AddDishForm } from 'features/dishes/AddDishForm';

export const App = () => {
    return (
        <>
            <header>
                <h1 className={styles.mainTitle}>Dishes Form</h1>
            </header>
            <main className="App">
                <AddDishForm />
            </main>
        </>
    );
};
