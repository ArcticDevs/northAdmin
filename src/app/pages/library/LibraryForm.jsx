/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import ImageUpload from '../ImageUpload';
import PdfUpload from '../PdfUpload';
import Swal from 'sweetalert2';
import { postLibraryBook, getLibraryBooks, deleteLibraryBook } from '../../ApiCalls/LibraryApiCalls';

const LibraryForm = () => {
    const intl = useIntl()

    const [checkboxValue, setCheckboxValue] = useState(false);
    const [trigger, setTrigger] = useState(false)

    const initialState = {
        imgId: "",
        imgURL: "",
        title: "",
        author: "",
        dateYear: "",
        pdfFileURL: "",
        link: "",
        hasPDF: checkboxValue,
    }

    const [formData, setFormData] = useState(initialState)

    const { title, author, year, link } = formData;

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [imageState, setImageState] = useState(false);
    const [uploadState, setUploadState] = useState({ pdf: false, image: false });

    const uploadPdf = () => {
        console.log(formData)
        const res = postLibraryBook(formData)
        if (res) {
            Swal.fire({
                title: 'Book Data Added Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setFormData(initialState);
            setImageState(false);
            setUploadState({ pdf: false, image: false });
        }
    }

    useEffect(() => {
        if (uploadState.pdf && uploadState.image) {
            uploadPdf();
        }
    }, [uploadState.pdf, uploadState.image])

    const handleBookPDF = (pdf) => {
        console.log(pdf)
        if (pdf.status) {
            formData.pdfFileURL = pdf.data.url;
            setUploadState({ ...uploadState, pdf: true })
        }
    }

    const handleBookImage = (image) => {
        console.log(image)
        if (image.status) {
            formData.imgId = image.data.id;
            formData.imgURL = image.data.url;
            setUploadState({ ...uploadState, image: true })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        setImageState(true);
        formData.hasPDF = checkboxValue;
    };

    const [bookData, setBookData] = useState([])
    const [deleteCheck, setDeleteCheck] = useState({ state: false, id: "" })
    const [deleteId, setDeleteId] = useState("")

    useEffect(() => {
        const getLibraryFunc = async () => {
            const data = await getLibraryBooks();
            console.log(data)
            if (!data.error) {
                setBookData(data);
            }
        }
        getLibraryFunc();
    }, [deleteId, trigger])

    const handleBookDelete = async (id, imageId) => {
        let dataSend = {
            fileId: imageId,
        }

        setDeleteCheck({ state: true, id: id });

        fetch(
            'https://script.google.com/macros/s/AKfycbx1ugXthrEUjcI4x2OcdgE0ln3cSvtEhP4jLHWAVKW3Ic63xIsKBZKauC76SbZNBrDa/exec',
            {
                method: 'POST',
                body: JSON.stringify(dataSend),
            }
        )
            .then((res) => res.json())
            .then(async () => {
                const del = await deleteLibraryBook(id);
                if (del) {
                    Swal.fire({
                        title: 'Data Deleted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    })
                    setDeleteCheck({ state: false, id: "" });
                    setDeleteId(id);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <Tabs
                defaultActiveKey="FormTab"
                className="mb-10 justify-content-center"
                variant='pills'
                style={{ fontSize: '30px' }}
            >
                <Tab eventKey="FormTab" title="Form">
                    <h1>Books Data</h1>
                    <form onSubmit={handleSubmit} className='row'>
                        <div className="col-md-6">
                            <ImageUpload imageFunc={handleBookImage} imageState={imageState} formName={"libraryPage"} />
                        </div>
                        <div className="col-md-6">
                            <div className="mb-5">
                                <label className="form-label required">Book Title</label>
                                <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Author</label>
                                <input required type="text" className="form-control" id="author" name='author' value={author} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Date/Year</label>
                                <input type="text" className="form-control" id="year" name='year' value={year} onChange={handleFormDataChange} />
                            </div>
                            <div className="my-8">
                                <input className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
                                <label className="form-check-label mx-3 required">
                                    Has PDF FIle
                                </label>
                            </div>
                            <div className="mb-5">
                                <PdfUpload pdfFunc={handleBookPDF} pageState={imageState} disabled={!checkboxValue} formName={"libraryPage"} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Link</label>
                                <input type="text" required className="form-control" id="link" name='link' value={link} disabled={checkboxValue ? true : false} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={imageState}>{imageState ? "Uploading..." : "Submit"}</button>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="TableTab" title="View Data" onEnter={() => setTrigger(!trigger)}>
                    <h1>Books Data</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Year</th>
                                    <th>Link</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookData && bookData.length > 1 ?
                                    bookData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "80px", height: "50px", display: 'block' }} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Team_Image" /></td>
                                            <td>{val.name}</td>
                                            <td>{val.title}</td>
                                            <td>{val.author}</td>
                                            <td>{val.dateYear}</td>
                                            <td>{val.link === "" ? val.pdfFileURL : val.link}</td>
                                            <td>
                                                {deleteCheck.state && deleteCheck.id === val._id ?
                                                    <button className='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleBookDelete(val._id, val.imgId)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={7} className="text-center">No Data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default LibraryForm;