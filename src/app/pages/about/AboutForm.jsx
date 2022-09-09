/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Slider from '../Slider'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import { postTeamsData, getTeamsData, deleteTeamData } from '../../ApiCalls/AboutTeamsDataApiCalls'
import Swal from 'sweetalert2'
import ImageUpload from '../ImageUpload'
import SlideShow from '../SlideShow'

const AboutForm = () => {
    const intl = useIntl()

    const [imageState, setImageState] = useState(false);
    const [trigger, setTrigger] = useState(false)

    const [checkboxValue, setCheckboxValue] = useState(false);

    const initialState = {
        default: checkboxValue,
        imgId: "",
        imgURL: "",
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

    const handleTeamImage = (image) => {
        console.log(image)
        if (image.status) {
            formData.imgId = image.data.id;
            formData.imgURL = image.data.url;
            console.log(formData)
            postTeamsData(formData);
            setImageState(false);
            setFormData(initialState);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setImageState(true)
        formData.default = checkboxValue;
    };

    const [teamsData, setTeamsData] = useState([])
    const [deleteCheck, setDeleteCheck] = useState({ state: false, id: "" })
    const [deleteId, setDeleteId] = useState("")

    useEffect(() => {
        const getTeamsDataFunc = async () => {
            const data = await getTeamsData();
            console.log(data)
            if (!data.error) {
                setTeamsData(data);
            }
        }
        getTeamsDataFunc();
    }, [deleteId,trigger])

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
                const del = await deleteTeamData(id);
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
                    <div className='mb-10'>
                        <h1>Slider 1 (Above Vision Section)</h1>
                        <Slider pageValue='aboutpage' sliderName={"aboveVision"} withForm={false} />
                    </div>
                    <div className='mb-10'>
                        <h1>Slider 2 (After Recognitions Table)</h1>
                        <Slider pageValue='aboutpage' sliderName={"afterRecog"} withForm={false} />
                    </div>
                    <h1>Teams Data</h1>
                    <form className='row g-5' onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <ImageUpload imageFunc={handleTeamImage} imageState={imageState} formName={"aboutPage"} />
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-5">
                                <input className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
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
                <Tab eventKey="TableTab" title="View Data" onEnter={()=>setTrigger(!trigger)}>
                    <h1>Slider 1 (Above Vision Section)</h1>
                    <SlideShow slideType={"aboveVision"} />
                    <h1>Slider 2 (After Recognitions Table)</h1>
                    <SlideShow slideType={"afterRecog"} />
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
                                {teamsData && teamsData.length > 1 ?
                                    teamsData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "80px", height: "50px", display: 'block' }} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Team_Image" /></td>
                                            <td>{val.name}</td>
                                            <td>{val.category}</td>
                                            <td>{val.job}</td>
                                            <td>{val.location}</td>
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
                                        <td colSpan={7}>No Data</td>
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

export default AboutForm;