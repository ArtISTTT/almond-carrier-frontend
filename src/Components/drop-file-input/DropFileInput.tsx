import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/drop-file-input.module.css';
import { ImageConfig } from './ImageConfig';

interface IProps {
    confirmPurchaseData: (fileList: File[]) => void;
    buttonText: string;
}

const DropFileInput: React.FC<IProps> = ({
    confirmPurchaseData,
    buttonText,
}) => {
    const wrapperRef = useRef<any>(null);
    const { t } = useTranslation();

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const sendData = () => confirmPurchaseData(fileList);

    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0];
        if (newFile && fileList.length <= 4) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    };

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={styles.dropFileInput}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={styles.dropFileInputLabel}>
                    <img
                        src='/static/images/drop-file-input/cloud-upload-regular-240.png'
                        alt=''
                    />
                    <p>{t('dragDropYourFilesHere')}</p>
                </div>
                <input
                    type='file'
                    value=''
                    onChange={onFileDrop}
                    accept='.pdf,.jpg,.jpeg,.png'
                />
            </div>
            {fileList.length > 0 ? (
                <div className={styles.dropFilePreview}>
                    <p className={styles.dropFilePreviewTitle}>
                        {t('uploadedFiles')}
                    </p>
                    {fileList.map((item, index) => (
                        <div key={index} className={styles.dropFilePreviewItem}>
                            <img
                                src={
                                    ImageConfig[
                                        item.type.split(
                                            '/'
                                        )[1] as keyof typeof ImageConfig
                                    ]?.src || ImageConfig['default']?.src
                                }
                                alt=''
                            />
                            <div className={styles.dropFilePreviewItemInfo}>
                                <p>{item.name}</p>
                            </div>
                            <span
                                className={styles.dropFilePreviewItemDel}
                                onClick={() => fileRemove(item)}
                            >
                                x
                            </span>
                        </div>
                    ))}
                    <Button
                        variant='contained'
                        onClick={sendData}
                        className={styles.confirmPurchaseButton}
                        color='primary'
                    >
                        {t(buttonText)}
                    </Button>
                </div>
            ) : null}
        </>
    );
};

export default DropFileInput;
