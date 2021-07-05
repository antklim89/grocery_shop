import styles from './Footer.module.scss';


export default function Footer(): JSX.Element {
    return (
        <footer className={`${styles.footer} bg-dark navbar`}>
            <p className="container">
                Footer
            </p>
        </footer>
    );
}
