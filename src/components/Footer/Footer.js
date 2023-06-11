import styles from '../Footer/FooterStyles.css'
const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>{`Copyright © Suparna Singha ${year}`}</footer>;
  };
  
  export default Footer;