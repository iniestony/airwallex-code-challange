import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { validateFullName, validateEmail, validateConfirmEmail } from '../../utils/validation';
import { requestInvitation } from '../../services/invitation';

function InvitationRequestModal(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [fieldValidation, setFieldValidation] = useState({
    vf: true,
    ve: true,
    vc: true
  });

  const [inSubmit, setInSubmit] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  
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

  const handleSubmit = useCallback(async () => {
    if (inSubmit) return;

    setServerError(false);
    setServerErrorMsg('');

    const validationResult = validateForm();
    if (!validationResult) return;

    setInSubmit(true);
    
    try {
      const res = await requestInvitation(fullName, email);
      if (res && res.status === 200) {
        setInSubmit(false);
        if (props.handleSuccess) props.handleSuccess();
      } else {
        setServerError(true);
        setServerErrorMsg((res && res.data && res.data.errorMessage) || '');
        setInSubmit(false);
      }
    } catch (e) {
      setServerError(true);
      setServerErrorMsg('Unknown error from server.');
      setInSubmit(false);
    }
  }, [validateForm, props, inSubmit, fullName, email]);

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

      <div className={`${styles.btn}${!inSubmit ? '' : ` ${styles.disabled}`}`} onClick={handleSubmit}>
        {inSubmit ? 'Sending, please wait...' : 'Send'}
      </div>

      {serverError ? (
        <div className={styles.errorMsg}>{serverErrorMsg}</div>
      ) : null}
    </div>
  );
}

export default InvitationRequestModal;