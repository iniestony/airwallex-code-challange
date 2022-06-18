import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

function InvitationModal(props) {
  const modalEl = useRef(document.createElement('div'));
  const containerRef = useRef(props.rootContainer);
  const hideModalRef = useRef(props.hideModal);
  
  useEffect(() => {
    const _m = modalEl.current;
    _m.classList.add(styles.modalEl);

    const handleHideModal = (e) => {
      const target = e.target;
      const currentTarget = e.currentTarget;
      if (target !== currentTarget) return;
      hideModalRef.current();
    };

    _m.addEventListener('click', handleHideModal, false);

    const _c = document.getElementById(containerRef.current)
    if (_c) _c.appendChild(_m);

    return () => {
      _m.removeEventListener('click', handleHideModal, false);
      _c.removeChild(_m);
    };
  }, []);

  return ReactDOM.createPortal(
    props.children,
    modalEl.current
  );
}

export default InvitationModal;