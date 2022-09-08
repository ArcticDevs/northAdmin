/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Slider from '../Slider'
import { KTSVG } from "../../../_metronic/helpers"
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import { getImages, deleteImages } from '../../ApiCalls/SliderApiCalls';
import { postTeamsData, getTeamsData, deleteTeamData } from '../../ApiCalls/AboutTeamsDataApiCalls'
import Swal from 'sweetalert2'

const AboutForm = () => {
    const intl = useIntl()

    const [sliderArray_1, setSliderArray_1] = useState([]);
    const [sliderArray_2, setSliderArray_2] = useState([]);
    const [deleteId, setDeleteId] = useState()

    const [image, setImage] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState("");

    const handleImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const [checkboxValue, setCheckboxValue] = useState(false);

    const initialState = {
        defaultTeamImage: checkboxValue,
        teamImage: image,
        category: "",
        name: "",
        job: "",
        location: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { name, job, location } = formData;

    const handleSelect = (e) => {
        setFormData({ ...formData, category: e.target.value })
    }

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.defaultTeamImage = checkboxValue;
        console.log(formData)
        postTeamsData(formData);
        setFormData(initialState)
    };

    useEffect(() => {
        const getSliderImages = async () => {
            const data = await getImages("abovevision");
            if (data)
                setSliderArray_1(data[data.length - 1].sliderImages);
        }
        getSliderImages();
    }, [deleteId])

    useEffect(() => {
        const getSliderImages = async () => {
            const data = await getImages("aboveRecog");
            if (data)
                setSliderArray_2(data[data.length - 1].sliderImages);
        }
        getSliderImages();
    }, [deleteId])


    const handleDelete = async (id) => {
        const del = await deleteImages(id)
        if (del) {
            Swal.fire({
                title: 'Testimonial Deleted Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setDeleteId(id);
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
                    <div className='mb-10'>
                        <h1>Slider 1 (Above Vision Section)</h1>
                        <Slider pageValue='aboutpage' sliderNum={"aboutvision"} withForm={false} />
                    </div>
                    <div className='mb-10'>
                        <h1>Slider 2 (After Recognitions Table)</h1>
                        <Slider pageValue='aboutpage' sliderNum={"aboutrecog"} withForm={false} />
                    </div>
                    <h1>Teams Data</h1>
                    <form className='row g-5' onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor='teamImage' className="form-label" style={{ width: '100%' }}>
                                <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                                    {createObjectURL === "" ?
                                        <>
                                            <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                                            <h3>Click To Add Image</h3>
                                        </>
                                        :
                                        <img style={{ width: "100%", height: "100%", display: 'block' }} src={createObjectURL} alt="upload_Image" />
                                    }
                                </div>
                            </label>
                            <input hidden required type="file" className="form-control" id="teamImage" name="teamImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-5">
                                <input required className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
                                <label className="form-check-label mx-3 required">
                                    Is it a default Team-Image?
                                </label>
                            </div>
                            <div className="mb-5">
                                <select onChange={handleSelect} className="form-select" aria-label="Default select example" required>
                                    <option value="">Team Category</option>
                                    <option value="core">Core</option>
                                    <option value="intern">Intern</option>
                                    <option value="artist">Artist</option>
                                    <option value="karigar">Karigar</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Name</label>
                                <input required type="text" disabled={checkboxValue ? true : false} className="form-control" name='name' id="name" value={checkboxValue ? "" : name} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Job</label>
                                <input required type="text" disabled={checkboxValue ? true : false} className="form-control" name='job' id="job" value={checkboxValue ? "" : job} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Location</label>
                                <input required type="text" disabled={checkboxValue ? true : false} className="form-control" name='location' id="location" value={checkboxValue ? "" : location} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
                    <h1>Slider 1 (Above Vision Section)</h1>
                    <div className='d-flex flex-row flex-wrap gap-4 justify-content-start'>
                        {sliderArray_1 && sliderArray_1.length < 1 ? <h3>No Data</h3> :
                            sliderArray_1.map((val, index) =>
                                <div key={val.id}>
                                    <img style={{ width: "80px", height: "50px", display: 'block' }} src={`https://drive.google.com/uc?export=view&id=${val.url.substring(32, 65)}`} alt="upload_Image" />
                                    <div className='my-5'>
                                        <button className='btn btn-icon btn-sm btn-danger p-0' onClick={() => handleDelete(val.id)}><i className='bi bi-trash-fill'></i></button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <h1>Slider 2 (After Recognitions Table)</h1>
                    {sliderArray_2 && sliderArray_2.length < 1 ? <h3>No Data</h3> :
                        sliderArray_2.map((val, index) =>
                            <div key={val.id}>
                                <img style={{ width: "80px", height: "50px", display: 'block' }} src={`https://drive.google.com/uc?export=view&id=${val.url.substring(32, 65)}`} alt="upload_Image" />
                                <div className='my-5'>
                                    <button className='btn btn-icon btn-sm btn-danger p-0' onClick={() => handleDelete(val.id)}><i className='bi bi-trash-fill'></i></button>
                                </div>
                            </div>
                        )
                    }
                    <h1>Teams Data</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Team</th>
                                    <th>Job</th>
                                    <th>Location</th>
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
                                    <td>GR</td>
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
                                    <td>@mdo</td>
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

export default AboutForm;