import styles from 'components/Footer/Footer.module.scss';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__main}>
                <div className={styles.footer__content}>
                    <p>tomaszbaranww, Copyright &copy; {currentYear}</p>
                </div>
            </div>
        </footer>
    );
};
