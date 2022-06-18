import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { validateFullName, validateEmail, validateConfirmEmail } from '../../utils/validation';

function InvitationRequestModal(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [fieldValidation, setFieldValidation] = useState({
    vf: true,
    ve: true,
    vc: true
  });
  
  const handleFullNameChange = useCallback((e) => {
    const v = e.target.value;
    setFullName(v);
  }, []);

  const handleEmailChange = useCallback((e) => {
    const v = e.target.value;
    setEmail(v);
  }, []);

  const handleConfirmEmailChange = useCallback((e) => {
    const v = e.target.value;
    setConfirmEmail(v);
  }, []);

  const validateForm = useCallback(() => {
    const vf = validateFullName(fullName);
    const ve = validateEmail(email);
    const vc = validateConfirmEmail(confirmEmail, email);
    setFieldValidation({ vf, ve, vc });

    return vf && ve && vc;
  }, [fullName, email, confirmEmail]);

  const handleSubmit = useCallback(() => {
    const validationResult = validateForm();
    if (!validationResult) return;

    if (props.hideModal) props.hideModal();
  }, [validateForm, props]);

  return (
    <div className={styles.requestModal}>
      <div className={styles.text}>
        Request&nbsp;&nbsp;an&nbsp;&nbsp;invite
      </div>

      <div className={styles.line} />

      <input 
        type="text"
        className={`${styles.input}${fieldValidation.vf ? '' : ` ${styles.error}`}`}
        value={fullName}
        onChange={handleFullNameChange}
        spellCheck="false"
        placeholder="Full name"
        key="fullName" 
      />

      <input
        type="text"
        className={`${styles.input}${fieldValidation.ve ? '' : ` ${styles.error}`}`} 
        value={email}
        onChange={handleEmailChange}
        spellCheck="false"
        placeholder="Email"
        key="email"
      />

      <input
        type="text"
        className={`${styles.input}${fieldValidation.vc ? '' : ` ${styles.error}`}`} 
        value={confirmEmail}
        onChange={handleConfirmEmailChange}
        spellCheck="false"
        placeholder="Confirm email"
        key="confirmEmail"
      />

      <div className={styles.btn} onClick={handleSubmit}>
        Send
      </div>
    </div>
  );
}

export default InvitationRequestModal;