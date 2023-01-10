import {
    Box,
    Button,
    Link as MUILink,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import LoginLayout from '../../src/Components/Layouts/Login';
import { EmailSchema } from '../../src/schemas/EmailSchema';

import style from '../../styles/SignIn.module.css';
import { recoverPassword } from '../../src/api/auth';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OpenAlertContext } from '../../src/Components/Layouts/Snackbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 450,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '24px',
};

type IForm = {
    email: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();

    const { triggerOpen } = useContext(OpenAlertContext);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        router.push('/');
    };

    const handleRecover = (form: IForm) => {
        recoverPassword(form).then(data => {
            if (data.ok) {
                handleOpenModal();
            } else {
                triggerOpen({
                    severity: 'error',
                    text:
                        data.error || 'Error when trying to reset the password',
                });
            }

            formik.setSubmitting(false);
        });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: handleRecover,
        validationSchema: EmailSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <LoginLayout>
            <>
                <Typography variant='h2' component='h2'>
                    Enter email <br />
                    to recover password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            name='email'
                            placeholder='Email'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email !== undefined}
                            helperText={formik.errors.email}
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                            type='submit'
                            disabled={formik.isSubmitting}
                        >
                            Restore password
                        </Button>
                        <MUILink
                            className={style.helpLink}
                            href='/signin'
                            component={LinkBehaviour}
                        >
                            ← Retun to Sign in
                        </MUILink>
                    </Stack>
                </form>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={modalStyle} className={style.modalBox}>
                        <div className={style.modalTitle}>
                            <CheckCircleIcon className={style.modalDoneIcon} />
                            <Typography
                                id='modal-modal-title'
                                variant='h6'
                                component='h3'
                            >
                                Link to reset your password was sent to
                            </Typography>
                        </div>

                        <Typography
                            id='modal-modal-title'
                            variant='h5'
                            component='h2'
                        >
                            {formik.values.email}
                        </Typography>
                    </Box>
                </Modal>
            </>
        </LoginLayout>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SignIn;
