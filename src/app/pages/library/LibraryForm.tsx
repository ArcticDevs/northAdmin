/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';

const LibraryForm: FC = () => {
    const intl = useIntl()

    const [image, setImage] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState("");

    const handleImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const [pdfFile, setPdfFile] = useState("");

    const handlePDF = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setPdfFile(i);
        }
    };

    const initialState = {
        bookImage: image,
        title: "",
        author: "",
        year: "",
        pdf: pdfFile,
        link: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { title, author, year, link } = formData;

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.bookImage = image;
        console.log(formData)
        setFormData(initialState)
    };

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
                        <div className="col-6">
                            <label htmlFor='bookImage' className="form-label w-100">
                                <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                                    {createObjectURL === "" ?
                                        <>
                                            <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                                            <h3>Click To Add Book Image</h3>
                                        </>
                                        :
                                        <img style={{ width: "100%", height: "100%", display: 'block' }} src={createObjectURL} alt="upload_Image" />
                                    }
                                </div>
                            </label>
                            <input hidden required type="file" className="form-control" id="bookImage" name="bookImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="col-6">
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
                            <div className="mb-5">
                                <label className="form-label">Book PDF File</label>
                                <input type="file" className="form-control" id="bookPdf" name="bookPdf" onChange={handlePDF} accept=".pdf" />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Link</label>
                                <input type="text" className="form-control" id="link" name='link' value={link} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
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
                                <tr className='fs-5 border-bottom border-gray-500'>
                                    <td>1</td>
                                    <td><img style={{ width: "80px", height: "50px", display: 'block' }} src="" alt="Team_Image" /></td>
                                    <td>Mark</td>
                                    <td>Core</td>
                                    <td>Intern</td>
                                    <td>Intern</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export { LibraryForm }