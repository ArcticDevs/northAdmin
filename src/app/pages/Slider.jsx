/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react'
import { KTSVG } from "../../_metronic/helpers"
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { postImages } from '../ApiCalls/SliderApiCalls';

const Slider = ({ imageFunc, withForm, sliderNum, pageValue }) => {

  const [pdfFiles, setPdfFiles] = useState([])
  // const [showDropArea, setShowDropArea] = useState(true)
  // const [showUploadBtn, setShowUploadBtn] = useState(false)

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadLoading, setUploadLoading] = useState(false)

  const [image, setImage] = useState("");
  // const [imageArray, setImageArray] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [createObjectURLArray, setCreateObjectURLArray] = useState([]);
  //file upload
  const onDrop = useCallback((Addedfile) => {
    const reader = new FileReader()

    let tempPdfFiles = pdfFiles

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

      if (
        (tempPdfFiles && tempPdfFiles[0] && tempPdfFiles[0].name === tempObj.name) ||
        (tempPdfFiles && tempPdfFiles[1] && tempPdfFiles[1].name === tempObj.name)
      ) {
        Swal.fire({
          title: 'File is already added!',
          icon: 'info',
          confirmButtonText: 'Close',
        })
      } else {
        tempPdfFiles.push(tempObj)

        setPdfFiles(tempPdfFiles)

        // if (tempPdfFiles.length === 2) {
        //   setShowDropArea(false)
        //   setShowUploadBtn(true)
        // }
      }
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.svg'],
    },
  })

  const handleUpload = () => {
    // console.log(orderDetails);
    // console.log(pdfFiles);
    setUploadLoading(true)
    console.log(image)
    setCreateObjectURLArray([...createObjectURLArray, createObjectURL]);
    setCreateObjectURL("")

    let uploadedFileObj = {
      name: '',
      url: '',
      id: '',
      type: 'image/*',
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
        setUploadLoading(false)

        uploadedFileObj.name = image.name
        uploadedFileObj.url = data.url
        uploadedFileObj.id = data.id

        setUploadedFiles([...uploadedFiles,uploadedFileObj])
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
        setUploadedFiles([])
      })
  }

  console.log(uploadedFiles)

  function selectFewerProps(show) {
    const { id, url } = show;
    return { id, url };
  }

  const handleSliderSubmit = (e) => {
    e.preventDefault();
    const imageFiles = {
      sliderImages: uploadedFiles.map(selectFewerProps)
    }
    console.log(imageFiles)
    postImages(imageFiles)
    // console.log(imageArray)
    // setImage("")
    // setImageArray([])
    // setCreateObjectURL("")
    // setCreateObjectURLArray([])
  }

  return (
    <>
      <form className='row my-5' onSubmit={handleSliderSubmit}>
        <label {...getRootProps({ onClick: evt => evt.preventDefault() })} htmlFor={`sliderImage${sliderNum}`} className="form-label col-md-6">
          <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
            {createObjectURL === "" ?
              <>
                <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                <h3 className='text-center'>
                  Click here or Drag & drop to upload the Image file
                  <br />
                  (limit 5MB)
                </h3>
              </>
              :
              <img style={{ width: "100%", height: "100%", display: 'block', objectFit: 'cover' }} src={createObjectURL} alt="upload_Image" />
            }
          </div>
        </label>
        <input {...getInputProps()} hidden required type="file" className="form-control my-3" id={`sliderImage${sliderNum}`} name={`sliderImage${sliderNum}`} accept=".png, .jpg, .jpeg" />
        <div className='col-md-6 d-flex flex-column justify-content-between'>
          <div className='d-flex flex-row flex-wrap justify-content-start'>
            {createObjectURLArray.map((val, index) =>
              <img style={{ width: "80px", height: "50px", display: 'block' }} src={val} key={index} alt="upload_Image" />
            )}
          </div>
          <div className='d-flex flex-column align-self-end'>
            <button type="button" className="btn btn-secondary mb-5" onClick={handleUpload}>Add image to Slider</button>
            <button type="submit" className="btn btn-primary" style={{ display: "block" }} disabled={uploadLoading}>Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Slider;