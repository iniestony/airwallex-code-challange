import styles from './index.module.scss';

function InvitationConfirmModal(props) {
  return (
    <div className={styles.confirmModal}>
      <div className={styles.text}>
        All&nbsp;&nbsp;done!
      </div>

      <div className={styles.line} />

      <div className={styles.sub}>
        You will be one of the first to experience
      </div>

      <div className={styles.sub}>
        Broccoli & Co. when we launch.
      </div>

      <div className={styles.btn} onClick={props.hideModal}>
        OK
      </div>
    </div>
  );
}

export default InvitationConfirmModal;