import React, { useState, useCallback, useEffect } from 'react'
import { KTSVG } from "../../_metronic/helpers"
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ formName, imageFunc, imageState, isDisabled }) => {

    const [uploadedFile, setUploadedFile] = useState()
    const [uploadLoading, setUploadLoading] = useState(true)
    const [uploadStatus, setUploadStatus] = useState(false)

    const [image, setImage] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState("");

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

                // console.log(e.target.result.split(',')[1])
            }

            setCreateObjectURL(URL.createObjectURL(Addedfile[0]));
            tempObj.name = Addedfile[0].name

            setImage(tempObj);
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.svg'],
        },
    })

    const handleUpload = () => {
        setUploadLoading(true)
        setUploadStatus(true)
        let uploadedFileObj = {
            url: '',
            id: '',
        }

        let dataSend = {
            dataReq: {
                data: image.file,
                name: image.name,
                type: 'image/*',
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
                uploadedFileObj.id = data.id

                setUploadedFile(uploadedFileObj)
                setUploadLoading(false)
                setUploadStatus(false)
            })
            .catch((err) => {
                console.log(err)

                Swal.fire({
                    title: 'Error Occured , please try again',
                    icon: 'error',
                    confirmButtonText: 'Close',
                })

                setUploadStatus(false)
                setUploadLoading(false)
                // setPdfFiles([])
                setUploadedFile({})
            })
    }

    useEffect(() => {
        if (imageState) {
            handleUpload();
        }
        else
            return
    }, [imageState])

    useEffect(() => {
        console.log(uploadedFile)
        if (!uploadLoading) {
            imageFunc({ data: uploadedFile, status: true });
            setUploadedFile({})
            setCreateObjectURL("")
        }

    }, [uploadLoading])


    return (
        <>
            <label {...getRootProps({ onClick: evt => evt.preventDefault() })} htmlFor={`uploadImage${formName}`} className={`form-label w-100 ${isDisabled || uploadStatus ? "bg-light" : "bg-transparent"}`}>
                <div className={`d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded ${isDisabled && "bg-secondary"}`} style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                    {createObjectURL === "" ?
                        <>
                            <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                            {
                                isDisabled ? <h3 className='text-muted'>Upload Disabled for non-video links</h3> :
                                    uploadStatus ? <h3 className='text-muted'>Uploading File...</h3> :
                                        <h3 className='text-center'>
                                            Click here or Drag & drop to upload the Image file
                                            <br />
                                            (limit 5MB)
                                        </h3>
                            }
                        </>
                        :
                        <img style={{ width: "100%", height: "100%", display: 'block', objectFit: 'cover' }} src={createObjectURL} alt="upload_Image" />
                    }
                </div>
            </label>
            <input {...getInputProps()} disabled={isDisabled || uploadStatus} hidden required type="file" className="form-control my-3" id={`uploadImage${formName}`} name={`uploadImage${formName}`} accept=".png, .jpg, .jpeg" />
        </>
    )
}

export default ImageUpload