/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Slider from '../Slider'
import SlideShow from '../SlideShow'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import ImageUpload from '../ImageUpload'
import Swal from 'sweetalert2'
import { postWorkshopCourse, getWorkshopCourses, deleteWorkshopCourse, postWorkshopTestimonial, getWorkshopTestimonials, deleteWorkshopTestimonial } from '../../ApiCalls/WorkshopApiCalls'

const WorkshopForm = () => {
    const intl = useIntl()

    const initialState = {
        imgId: "",
        imgURL: "",
        course: "",
        title: "",
        data: "",
        days: "",
        dateYear: "",
    }

    const [formData, setFormData] = useState(initialState)

    const [trigger, setTrigger] = useState(false)

    const { title, data, dateYear, days } = formData;

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (e) => {
        setFormData({ ...formData, type: e.target.value })
    }

    const [imageState, setImageState] = useState(false);
    const [teamsData, setTeamsData] = useState([])
    const [deleteCheck, setDeleteCheck] = useState({ state: false, id: "" })
    const [deleteId, setDeleteId] = useState("")

    const handleCourse = (image) => {
        console.log(image)
        if (image && image.status) {
            formData.imgId = image.data.id;
            formData.imgURL = image.data.url;
            const date = new Date(dateYear);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formData.dateYear = date.toLocaleDateString('en-GB', options);
            console.log(formData)
            // const Workshop = {
            //     Workshop: formData
            // }
            postWorkshopCourse(formData);
            setImageState(false);
            setFormData(initialState);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setImageState(true)
    };

    useEffect(() => {
        const getTeamsDataFunc = async () => {
            const data = await getWorkshopCourses();
            console.log(data)
            if (!data.error) {
                setTeamsData(data);
            }
        }
        getTeamsDataFunc();
    }, [deleteId, trigger])

    const handleTeamDelete = async (id, imageId) => {
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
                const del = await deleteWorkshopCourse(id);
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

    const testimonialInitialState = {
        name: "",
        content: "",
        designation: "",
    }

    const [formTestimonialData, setFormTestimonialData] = useState(testimonialInitialState)

    const { name, content, designation } = formData;

    const handleFormTestimonialDataChange = (e) => {
        setFormTestimonialData({ ...formTestimonialData, [e.target.name]: e.target.value });
    };

    const handleTestimonialSubmit = (e) => {
        e.preventDefault();
        console.log(formTestimonialData)
        postWorkshopTestimonial(formTestimonialData)
        setFormData(testimonialInitialState)
    };

    const [testimonialData, setTestimonialData] = useState([]);
    const [deleteTestimonialId, setDeleteTestimonialId] = useState()
    const [deleteTestimonialCheck, setDeleteTestimonialCheck] = useState({ state: false, id: "" })

    useEffect(() => {
        const getData = async () => {
            const data = await getWorkshopTestimonials();
            if (data)
                setTestimonialData(data);
        }
        getData();
    }, [deleteTestimonialId, trigger])

    const handleDelete = async (id) => {
        setDeleteTestimonialCheck({ state: true, id: id });
        const del = await deleteWorkshopTestimonial(id)
        if (del) {
            Swal.fire({
                title: 'Testimonial Deleted Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setDeleteTestimonialId(id);
        }
        else {
            Swal.fire({
                title: 'Error Occured , please try again',
                icon: 'error',
                confirmButtonText: 'Close',
            })
        }
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
                    <h1>Workshop Course Table Data</h1>
                    <form onSubmit={handleSubmit} className="row g-5 mt-5">
                        <div className="col-md-6 mb-5">
                            <ImageUpload imageFunc={handleCourse} imageState={imageState} formName={"workshopPage"} />                        </div>
                        <div className='col-md-6'>
                            <div className="mb-5">
                                <select onChange={handleSelect} className="form-select required" aria-label="Default select example" required>
                                    <option value="">Select Course Type</option>
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Course Title</label>
                                <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Course Data</label>
                                <textarea required className="form-control" rows={7} id="data" name='data' value={data} onChange={handleFormDataChange}></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Days for Course Completion</label>
                                <input required type="number" className="form-control" id="days" name='days' value={days} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Date/Year</label>
                                <input required type="date" className="form-control" id="dateYear" name='dateYear' value={dateYear} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <div className='my-10'>
                        <h1>Slider</h1>
                        <Slider sliderName={"workshopSlider"} />
                    </div>
                    <div className="mb-10">
                        <h1>Workshop Testimonials</h1>
                        <form onSubmit={handleTestimonialSubmit}>
                            <div className="mb-5">
                                <label className="form-label required">Name</label>
                                <input required type="text" className="form-control" name='name' id="name" value={name} onChange={handleFormTestimonialDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Testimonial Content</label>
                                <textarea required className="form-control" rows={7} name='content' id='content' value={content} onChange={handleFormTestimonialDataChange}></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Author Designation</label>
                                <input required type="text" className="form-control" value={designation} onChange={handleFormTestimonialDataChange} id="designation" name='designation' />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </Tab>
                <Tab eventKey="TableTab" title="View Data" onEnter={() => setTrigger(!trigger)}>
                    <h1>Course Data</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Course Time(Days)</th>
                                    <th>Date</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamsData && teamsData.length > 1 ?
                                    teamsData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "80px", height: "50px", display: 'block' }} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Team_Image" /></td>
                                            <td>{val.course}</td>
                                            <td>{val.title}</td>
                                            <td>{val.data}</td>
                                            <td>{val.days}</td>
                                            <td>{val.dateYear}</td>
                                            <td>
                                                {deleteCheck.state && deleteCheck.id === val._id ?
                                                    <button class='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleTeamDelete(val._id, val.imgId)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={8}>No Data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <h1>Slider 1</h1>
                    <SlideShow triggerVal={trigger} slideType={"workshopSlider"} />
                    <h1>Testimonials Table</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Name</th>
                                    <th>Testimonial Content</th>
                                    <th>Designation/Caption</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonialData && testimonialData.length < 1 ? <tr><td colSpan={5} className="text-center">No Data</td></tr> :
                                    testimonialData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td>{val.name}</td>
                                            <td>{val.content}</td>
                                            <td>{val.designation}</td>
                                            <td>
                                                {deleteTestimonialCheck.state && deleteTestimonialCheck.id === val._id ?
                                                    <button class='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(val._id)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default WorkshopForm;