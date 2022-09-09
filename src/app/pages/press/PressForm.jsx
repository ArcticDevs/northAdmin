/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import ImageUpload from '../ImageUpload';
import Swal from 'sweetalert2';
import { postPressData, getPressData, deletePressData } from '../../ApiCalls/PressApiCalls';

const PressForm = () => {
    const intl = useIntl()

    const [checkboxValue, setCheckboxValue] = useState(false);

    const initialState = {
        videoLink: checkboxValue,
        imgId: "",
        imgURL: "",
        title: "",
        content: "",
        name: "",
        date: "",
        newLink: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { title, content, name, date, newLink } = formData;

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [imageState, setImageState] = useState(false);

    const handlePressImage = (image) => {
        console.log(image)
        if (image.status) {
            formData.imgId = image.data.id;
            formData.imgURL = image.data.url;
            const dateVal = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formData.date = dateVal.toLocaleDateString('en-GB', options);
            console.log(formData)
            // const teamsData = {
            //     teamsData: formData
            // }
            postPressData(formData);
            setImageState(false);
            setFormData(initialState);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setImageState(true)
        formData.videoLink = checkboxValue;
    };

    const [pressData, setPressData] = useState([])
    const [deleteCheck, setDeleteCheck] = useState({ state: false, id: "" })
    const [deleteId, setDeleteId] = useState("")

    useEffect(() => {
        const getTeamsDataFunc = async () => {
            const data = await getPressData();
            console.log(data)
            if (!data.error) {
                setPressData(data);
            }
        }
        getTeamsDataFunc();
    }, [deleteId])

    const handlePressDelete = async (id, imageId) => {
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
                const del = await deletePressData(id);
                if (del) {
                    Swal.fire({
                        title: 'Image Deleted Successfully!',
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
                    <h1>Press Data</h1>
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-md-6">
                            <ImageUpload imageFunc={handlePressImage} imageState={imageState} formName={"libraryPage"} isDisabled={!checkboxValue} />
                        </div>
                        <div className="col-md-6 m-xs-10">
                            <div className="mb-5">
                                <input className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} required />
                                <label className="form-check-label mx-3 required">
                                    Has Video Link
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Title</label>
                                <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Content</label>
                                <textarea required className="form-control" rows={7} id="content" disabled={checkboxValue ? true : false} name='content' value={checkboxValue ? "" : content} onChange={handleFormDataChange}></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Date</label>
                                <input required type="date" className="form-control" id="date" name='date' value={date} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Article Name</label>
                                <input required type="text" className="form-control" id="name" name='name' value={name} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Press News Link</label>
                                <input required type="text" className="form-control" id="newLink" name='newLink' value={newLink} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
                    <h1>Press Data</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Date</th>
                                    <th>Article Name</th>
                                    <th>Link</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pressData && pressData.length > 1 ?
                                    pressData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "80px", height: "50px", display: 'block' }} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Team_Image" /></td>
                                            <td>{val.title}</td>
                                            <td>{val.content}</td>
                                            <td>{val.date}</td>
                                            <td>{val.name}</td>
                                            <td>{val.link}</td>
                                            <td>
                                                {deleteCheck.state && deleteCheck.id === val._id ?
                                                    <button class='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handlePressDelete(val._id, val.imgId)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={7} className='text-center'>No Data</td>
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

export default PressForm;