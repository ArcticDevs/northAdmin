import React, { useState, useCallback, useEffect } from 'react'
import { KTSVG } from "../../_metronic/helpers"
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { postImages } from '../ApiCalls/SliderApiCalls';

const PdfUpload = ({ formName, pdfFunc, pageState, disabled }) => {

    const [uploadedFile, setUploadedFile] = useState()
    const [uploadLoading, setUploadLoading] = useState(true)

    const [pdf, setPdf] = useState("");

    //file upload
    const onDrop = useCallback((Addedfile) => {
        const reader = new FileReader()

        let tempObj = {
            name: '',
            file: null,
        }

        console.log(Addedfile[0])

        //5MB limit
        if (Addedfile[0].size > 5242880) {
            Swal.fire({
                title: 'File is too big!',
                icon: 'info',
                confirmButtonText: 'Close',
            })
        } else {
            reader.readAsDataURL(Addedfile[0])

            reader.onloadend = (e) => {
                tempObj.file = e.target.result.split(',')[1]
            }

            tempObj.name = Addedfile[0].name

            setPdf(tempObj);
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
    })

    const handleUpload = () => {
        setUploadLoading(true)

        let uploadedFileObj = {
            url: '',
        }

        let dataSend = {
            dataReq: {
                data: pdf.file,
                name: pdf.name,
                type: 'application/pdf',
            },
            fname: 'NorthAdminPanelAssets',
        }

        fetch(
            'https://script.google.com/macros/s/AKfycbwJBhbEFgQOxAkq1ubSbLLwDmu0QeF5H9TI2Q4yeTWDx6g_f3-d8BF11e8J5JuCI61pAQ/exec',
            {
                method: 'POST',
                body: JSON.stringify(dataSend),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)

                // uploadedFileObj.name = image.name
                uploadedFileObj.url = data.url

                setUploadedFile(uploadedFileObj)
                setUploadLoading(false)
            })
            .catch((err) => {
                console.log(err)

                Swal.fire({
                    title: 'Error Occured , please try again',
                    icon: 'error',
                    confirmButtonText: 'Close',
                })

                setUploadLoading(false)
                // setPdfFiles([])
                setUploadedFile({})
            })
    }

    useEffect(() => {
        if (pageState) {
            handleUpload();
        }
        else
            return
    }, [pageState])

    useEffect(() => {
        console.log(uploadedFile)
        if (!uploadLoading) {
            pdfFunc({ data: uploadedFile, status: true });
        }

    }, [uploadLoading])


    return (
        <>
            <label {...getRootProps({ onClick: evt => evt.preventDefault() })} className="form-label" htmlFor='bookPdf'>
                <h6 className='fw-normal mb-2'>Book PDF Upload</h6>
                <div className={`d-flex flex-row justify-content-center align-items-end border border-1 border-dark rounded p-5 ${disabled && "bg-secondary"}`} style={{ cursor: 'pointer' }}>
                    <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                    {
                        disabled ? <h3 className='text-muted'>Upload Disabled</h3> :
                            <h3 className='fs-5'>
                                Click here or Drag & drop to upload the PDF file
                            </h3>
                    }
                </div>
            </label>
            <input {...getInputProps()} hidden required type="file" className="form-control" id="bookPdf" name="bookPdf" disabled={disabled} accept=".pdf" />
        </>
    )
}

export default PdfUpload