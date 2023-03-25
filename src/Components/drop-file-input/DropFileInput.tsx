import React, { useState } from 'react';

import styles from '../../../styles/drop-file-input.module.css';

import { ImageConfig } from './imageConfig';

interface IProps {
    onFileChange: (file: File[]) => void;
}

const DropFileInput: React.FC<IProps> = ({ onFileChange }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            onFileChange(updatedList);
        }
    };

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
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
                    <p>Drag & Drop your files here</p>
                </div>
                <input type='file' value='' onChange={onFileDrop} />
            </div>
            {fileList.length > 0 ? (
                <div className={styles.dropFilePreview}>
                    <p className={styles.dropFilePreviewTitle}>
                        Ready to upload
                    </p>
                    {fileList.map((item, index) => (
                        <div key={index} className={styles.dropFilePreviewItem}>
                            <img
                                src={
                                    ImageConfig[
                                        item.type.split('/')[1] as any
                                    ] || ImageConfig['default']
                                }
                                alt=''
                            />
                            <div className={styles.dropFilePreviewItemInfo}>
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span
                                className={styles.dropFilePreviewItemDel}
                                onClick={() => fileRemove(item)}
                            >
                                x
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default DropFileInput;
