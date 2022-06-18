import styles from './index.module.scss';

function InvitationFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.text} key="melbourne">
        Made with &#9829; in Melbourne.
      </div>
      <div className={styles.text} key="rights">
        &#169;&nbsp;&nbsp;2016&nbsp;&nbsp;Broccoli&nbsp;&nbsp;&&nbsp;&nbsp;co.&nbsp;&nbsp;All&nbsp;&nbsp;rights&nbsp;&nbsp;reserved.
      </div>
    </div>
  );
}

export default InvitationFooter;