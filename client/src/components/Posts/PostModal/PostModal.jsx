import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'shared/components';

const propTypes = {
  renderContent: PropTypes.func.isRequired,
  trigger: PropTypes.func,
};

const PostModal = ({ renderContent, buttonText, trigger, icon, ...props }) => (
  <Modal
    {...props}
    renderLink={({ open }) =>
      trigger ? (
        trigger(open)
      ) : (
        <Button onClick={open} icon={icon} iconSize='2rem'>
          {buttonText}
        </Button>
      )
    }
    renderContent={renderContent}
  />
);

PostModal.propTypes = propTypes;

export default PostModal;
