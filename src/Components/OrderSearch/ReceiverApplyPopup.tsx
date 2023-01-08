import { Avatar, Button, Typography, TextField, Stack } from '@mui/material';
import React from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import ApplyPopup from './ApplyPopup';

interface IProps {
    closePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReceiverApplyPopup: React.FC<IProps> = ({ closePopup }) => {
    return (
        <ApplyPopup closePopup={closePopup}>
            <div>
                <Avatar />
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            {/* <Stack direction='row' spacing={3}>
                <div className={styles.inputItem}>
                    <label htmlFor='productName'>Short name</label>
                    <TextField
                        id='productName'
                        name='productName'
                        placeholder='Short name'
                        variant='outlined'
                        // value={formik.values.productName}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productName !== undefined}
                        // helperText={formik.errors.productName}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor='productName'>Short name</label>
                    <TextField
                        id='productName'
                        name='productName'
                        placeholder='Short name'
                        variant='outlined'
                        // value={formik.values.productName}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productName !== undefined}
                        // helperText={formik.errors.productName}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor='productWeight'>Weight</label>
                    <TextField
                        id='productWeight'
                        name='productWeight'
                        placeholder='Weight'
                        variant='outlined'
                        type='number'
                        // value={formik.values.productWeight}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productWeight !== undefined}
                        // helperText={formik.errors.productWeight}
                        className={styles.input}
                    />
                </div>
            </Stack> */}
            <div>
                <Typography variant='h6' component='h4'>
                    Description:
                </Typography>
                <TextField
                    placeholder='MultiLine with rows: 2 and rowsMax: 4'
                    multiline
                    rows={2}
                    maxRows={4}
                />
            </div>
            <Button>apply for order</Button>
        </ApplyPopup>
    );
};

export default ReceiverApplyPopup;
