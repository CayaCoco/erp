import { off, on } from '@infini-soft/utils/lib/Events';
import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import StepFormModal from './StepForm';

const Createmodal = () => {
  const [state, setState] = React.useState<API.Item>();
  const [visible, setVisible] = React.useState(false);
  const handleClose = () => setVisible(false);
  const eventHandler = (payload: any) => {
    setState(payload?.detail);
    setVisible(true);
  };

  useEffect(() => {
    on('ui.open.create', eventHandler);
    return () => off('ui.open.create', eventHandler);
  }, []);
  return (
    <>
      <Button type="primary" key="primary" onClick={() => setVisible(true)}>
        Create
      </Button>
      <Modal
        title="Create"
        visible={visible}
        destroyOnClose
        width={730}
        onCancel={handleClose}
      >
        <StepFormModal />
      </Modal>
    </>
  );
};

export default Createmodal;
