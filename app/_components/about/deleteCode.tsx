'use client'

import { useEffect, useState } from "react";

const DownloadDeleteCode = (props: { code: string | undefined }) => {


    const handleClick = () => {
        const fileContent = `Delete 2FA code: ${props.code}`;
        const fileName = 'delete2FAcode.txt';

        const fileBlob = new Blob([fileContent], { type: 'text/plain' });
        const fileUrl = URL.createObjectURL(fileBlob);

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();

    }


    return (
        <div className='mb-20'>
            <div>2FA delete code (if you can not sign in with 2FA, enter this code on log in page):
                <button className="ml-2 font-bold hover:text-gray-400 dark:hover:text-white" onClick={handleClick}>
                    Download as Text File
                </button>
            </div>
        </div>
    );
}


export default DownloadDeleteCode