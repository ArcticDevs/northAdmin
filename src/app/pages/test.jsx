import React, {useState, useEffect, useCallback} from 'react'
import Swal from 'sweetalert2'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const DashboardApp = () => {
  const [pdfFiles, setPdfFiles] = useState([])
  const [showDropArea, setShowDropArea] = useState(true)
  const [showUploadBtn, setShowUploadBtn] = useState(false)

  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)

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

      tempObj.name = Addedfile[0].name

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

        if (tempPdfFiles.length === 2) {
          setShowDropArea(false)
          setShowUploadBtn(true)
        }
      }
    }
  }, [])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.svg'],
    },
  })

  const handleRemoveFile = (id) => {
    let tempPdfFiles = pdfFiles

    tempPdfFiles.splice(id, 1)

    if (tempPdfFiles.length === 0) {
      setPdfFiles([])
    } else {
      setPdfFiles(tempPdfFiles)
    }

    setShowDropArea(true)
    setShowUploadBtn(false)
  }

  const handleUpload = () => {
    // console.log(orderDetails);
    // console.log(pdfFiles);
    setUploadLoading(true)

    let uploadedFileDetails = []

    pdfFiles.map((pdfFile) => {
      let uploadedFileObj = {
        name: '',
        url: '',
        id: '',
        type: 'image/*',
      }

      let dataSend = {
        dataReq: {
          data: pdfFile.file, 
          name: pdfFile.name,
          type: 'image/*',
        },
        fname: 'MySQLtoExcelProject',
      }

      fetch(
        'https://script.google.com/macros/s/AKfycbzC3VMv3bztoNtAhiPpyDB_m06JPv33q11AfpdjglpzJuPojZOioPMCU95oSb7UaN6bdw/exec',
        {
          method: 'POST',
          body: JSON.stringify(dataSend),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setUploadLoading(false)

          uploadedFileObj.name = pdfFile.name
          uploadedFileObj.url = data.url
          uploadedFileObj.id = data.id

          uploadedFileDetails.push(uploadedFileObj)
          setUploadedFiles(uploadedFileDetails)
        })
        .catch((err) => {
          console.log(err)

          Swal.fire({
            title: 'Error Occured , please try again',
            icon: 'error',
            confirmButtonText: 'Close',
          })

          setUploadLoading(false)
          setPdfFiles([])
          setUploadedFiles(null)
        })
    })

    console.log(uploadedFileDetails)
  }

  var tp = {
    url: 'https://drive.google.com/file/d/1Ap9vEjVx4qfWju3fTNVdUW5uUHm0gYQ2/view?usp=drivesdk',
    id: '1FlkS4i3gnDv1Uy-X14SIawheeUBqFxLO',
  }

  const handleDelete = () => {

    let dataSend = {
      fileId: tp.id,
    }

    fetch(
      'https://script.google.com/macros/s/AKfycbxi4PmbXUWSdRGLh3TSOB2yb20EbW2TZ4z_FyqqQjYz4ZEDlGZWHtB0hYeDbKFoAMsh9Q/exec',
      {
        method: 'POST',
        body: JSON.stringify(dataSend),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  //will listen if uploadedFiles state was updated with the rresponse data from google drive upload api
  //and according to it we will send those data to the backend
  //   useEffect(() => {
  //     // console.log(uploadedFiles);

  //     const handleUploadToDB = async () => {
  //       const res = await axios.put(`/api/order/upload/file/1`, uploadedFiles)

  //       // console.log(res);
  //       setUploadLoading(false)
  //       setUploadedFiles(null)

  //       if (res.status === 201) {
  //         Swal.fire({
  //           title: 'Files Uploaded Successfully!',
  //           icon: 'success',
  //           confirmButtonText: 'Close',
  //         })
  //       } else {
  //         Swal.fire({
  //           title: 'Error Occured , please try again',
  //           icon: 'error',
  //           confirmButtonText: 'Close',
  //         })

  //         setPdfFiles([])
  //       }
  //     }

  //     //adding set timeout so that both the pdf's url are acquired first , before making the api call to backend
  //     uploadedFiles && setTimeout(() => handleUploadToDB(), 5000)
  //   }, [uploadedFiles])

  return (
    <div className='d-flex flex-column align-items-center' style={{marginRight: '10%'}}>
      <h4>Attachments: (Invoices, PO, Shipping slips)</h4>

      {showDropArea && (
        <div
          {...getRootProps()}
          style={{
            width: '100%',
            height: '100px',
            color: '#707070',
            border: '2px dashed #fff',
            backgroundColor: 'grey',
            cursor: 'grab',
          }}
          className='d-flex justify-content-center align-items-center mb-2'
        >
          <input {...getInputProps()} />
          <div style={{color: '#fff', textAlign: 'center'}}>
            Click here or Drag & drop to upload the pdf file <br />
            (limit 5MB)
          </div>
        </div>
      )}

      {pdfFiles && pdfFiles.length > 0 && (
        <div>
          {pdfFiles.map((file, id) => (
            <div className='d-flex'>
              <p className='me-3' style={{color: 'blue'}}>
                {file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}
              </p>
              <svg
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'red',
                  cursor: 'pointer',
                }}
                viewBox='0 0 24 24'
                title='delete file'
                onClick={() => handleRemoveFile(id)}
              >
                <path
                  fill='currentColor'
                  d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
                />
              </svg>
            </div>
          ))}
        </div>
      )}
      {showUploadBtn && uploadLoading ? (
        <button class='btn btn-warning' type='button' disabled>
          <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
          Uploading...
        </button>
      ) : (
        showUploadBtn && (
          <button className='btn btn-warning mt-2' onClick={handleUpload}>
            Upload
          </button>
        )
      )}
      <button className='btn btn-warning mt-5' onClick={handleDelete}>
        Delete
      </button>
      {/* <div>
        {uploadedFiles?.length &&
          uploadedFiles.map((curr) => (
            <img src={`https://drive.google.com/uc?export=view&id=${curr.url.substring(32,65)}`} alt='drive' />
          ))} */}
      {/* "https://drive.google.com/file/d/1zN-F-iigMNwC8L7NSReo09kJI_oaOjb_/view?usp=drivesdk" */}
      {/* </div> */}
    </div>
  )
}

export default DashboardApp
