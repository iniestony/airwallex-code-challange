import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import InvitationModal from '../../components/invitationModal';
import InvitationRequestModal from '../../components/requestModal';
import InvitationConfirmModal from '../../components/confirmModal';

const modalRootContainer = 'invitation-modal-root';

function InvitationContent() {
  const [isShowRequestModal, setIsShowRequestModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const showRequestModal = useCallback(() => {
    setIsShowRequestModal(true);
  }, []);

  const hideRequestModal = useCallback(() => {
    setIsShowRequestModal(false);
  }, []);

  const showConfirmModal = useCallback(() => {
    setIsShowConfirmModal(true);
  }, []);

  const hideConfirmModal = useCallback(() => {
    setIsShowConfirmModal(false);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        A&nbsp;&nbsp;better&nbsp;&nbsp;way
      </div>

      <div className={styles.text}>
        to&nbsp;&nbsp;enjoy&nbsp;&nbsp;every&nbsp;&nbsp;day.
      </div>

      <div className={styles.sub}>
        Be&nbsp;&nbsp;the&nbsp;&nbsp;first&nbsp;&nbsp;to&nbsp;&nbsp;know&nbsp;&nbsp;when&nbsp;&nbsp;we&nbsp;&nbsp;launch.
      </div>

      <div className={styles.btn} onClick={showRequestModal}>
        Request&nbsp;&nbsp;an&nbsp;&nbsp;invite
      </div>

      {isShowRequestModal ? (
        <InvitationModal rootContainer={modalRootContainer} hideModal={hideRequestModal}>
          <InvitationRequestModal hideModal={hideRequestModal} />
        </InvitationModal>
      ) : null}

      {isShowConfirmModal ? (
        <InvitationModal rootContainer={modalRootContainer} hideModal={hideConfirmModal}>
          <InvitationConfirmModal hideModal={hideConfirmModal} />
        </InvitationModal>
      ) : null}
    </div>
  );
}

export default InvitationContent;