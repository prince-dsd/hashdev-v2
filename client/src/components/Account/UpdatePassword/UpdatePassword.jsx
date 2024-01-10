import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { updatePassword } from 'redux/auth';
import { createStructuredSelector } from 'reselect';
import { Modal, Form } from 'shared/components';
import { validators } from 'shared/utils';

const propTypes = {
    updatePassword: PropTypes.func.isRequired,
    renderLink: PropTypes.func.isRequired,
};

const UpdatePassword = ({ updatePassword, renderLink }) => {
    const updatePasswordValidation = Yup.object().shape({
        password: validators.password,
        current_password: validators.required('Current password is required'),
        password2: validators.password2,
    });

    return (
        <Modal
            renderLink={renderLink}
            renderContent={({ close }) => (
                <>
                    <h2>Update Password</h2>
                    <Form
                        validationSchema={updatePasswordValidation}
                        initialValues={{
                            current_password: '',
                            password: '',
                            password2: '',
                        }}
                        onSubmit={values => {
                            updatePassword(values);
                            close();
                        }}>
                        <Form.Element>
                            <Form.Field.Input
                                label="Current Password *"
                                name="current_password"
                                type="password"
                                tip="Please enter your current password to change it"
                                tipLocation="below"
                            />
                            <Form.Field.Input
                                label="Password *"
                                name="password"
                                type="password"
                                tip="Password must contain a mix of letters, numbers and symbols"
                                tipLocation="below"
                            />
                            <Form.Field.Input
                                label="Confirm Password *"
                                name="password2"
                                type="password"
                                tip="Please confirm your password"
                                tipLocation="below"
                            />
                            <Form.Buttons withCancel onCancel={close} />
                        </Form.Element>
                    </Form>
                </>
            )}
        />
    );
};

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {
    updatePassword,
};

UpdatePassword.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
