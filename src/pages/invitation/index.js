import styles from './index.module.scss';
import InvitationHeader from '../../components/invitationHeader';
import InvitationContent from '../../components/invitationContent';
import InvitationFooter from '../../components/invitationFooter';

function Invitation() {
  return (
    <div className={styles.invitation}>
      <InvitationHeader />
      <InvitationContent />
      <InvitationFooter />
      <div id="invitation-modal-root"/>
    </div>
  );
}

export default Invitation;
