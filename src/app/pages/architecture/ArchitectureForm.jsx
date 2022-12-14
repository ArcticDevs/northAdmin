/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Slider from '../Slider'
import { KTSVG } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import MultiImageUpload from '../MultiImageUpload'
import { postResearchData, getResearchData, deleteResearchData, postProjectData, getProjectData, deleteProjectData } from '../../ApiCalls/ArchPageApiCalls'
import ImageUpload from '../ImageUpload'
import Swal from 'sweetalert2'
import SlideShow from '../SlideShow';
import PdfUpload from '../PdfUpload'

const ArchitectureForm = () => {
    const intl = useIntl()

    const [imageState, setImageState] = useState(false);
    const [pdfState, setPdfState] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [uploadState, setUploadState] = useState({ pdf: false, image: false });
    const [trigger, setTrigger] = useState(false)

    const initialStateResearch = {
        sliderImages: [],
        title: "",
        content: "",
        hasPDF: checkboxValue,
        pdfFileURL: "",
        link: "",
    }
    const initialStateProject = {
        projectTitle: "",
        projectContent: "",
    }

    const [formDataResearch, setFormDataResearch] = useState(initialStateResearch)
    const [formDataProject, setFormDataProject] = useState(initialStateProject)

    const { title, content, link } = formDataResearch;

    const { projectTitle, projectContent } = formDataProject;

    const handleFormDataResearchChange = (e) => {
        setFormDataResearch({ ...formDataResearch, [e.target.name]: e.target.value });
    };

    const uploadResearch = () => {
        console.log(formDataResearch)
        const res = postResearchData(formDataResearch)
        if (res) {
            Swal.fire({
                title: 'Book Data Added Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setFormDataResearch(initialStateResearch);
            setImageState(false);
            setPdfState(false)
            setUploadState({ pdf: false, image: false });
        }
    }

    useEffect(() => {
        if (uploadState.pdf && uploadState.image) {
            uploadResearch();
        }
        else if(uploadState.image && !pdfState)
        {
            uploadResearch();
        }
    }, [uploadState.pdf, uploadState.image,pdfState])

    const handleBookPDF = (pdf) => {
        console.log(pdf)
        if (pdf.status && checkboxValue) {
            formDataResearch.pdfFileURL = pdf.data.url;
            setUploadState({ ...uploadState, pdf: true })
        }
    }

    const handleSubmitResearch = (e) => {
        e.preventDefault();
        setImageState(true)
        if(checkboxValue)
        {
            setPdfState(true)
        }
        formDataResearch.hasPDF = checkboxValue;
    };

    const handleImageFunc = (images) => {
        if (images.status) {
            formDataResearch.sliderImages = images;
            setUploadState({ ...uploadState, image: true })
        }
    }

    const handleFormDataProjectChange = (e) => {
        setFormDataProject({ ...formDataProject, [e.target.name]: e.target.value });
    };

    const [projectImgState, setProjectImgState] = useState(false)

    const handleSubmitProject = (e) => {
        e.preventDefault();
        setProjectImgState(true)
    };

    const handleProjectImage = (imageVal) => {
        if (imageVal.status) {
            console.log(formDataProject)
            const project = {
                imgId: imageVal.data.id,
                imgURL: imageVal.data.url,
                title: projectTitle,
                content: projectContent
            }
            postProjectData(project)
            setProjectImgState(false)
            setFormDataProject(initialStateProject)
        }
    }

    const [researchData, setResearchData] = useState([])
    const [deleteCheck, setDeleteCheck] = useState({ state: false, id: "" })
    const [deleteId, setDeleteId] = useState()

    useEffect(() => {
        const getResearchDataFunc = async () => {
            const data = await getResearchData();
            console.log(data)
            if (!data.error) {
                setResearchData(data.data);
            }
        }
        getResearchDataFunc();
    }, [deleteId, trigger])

    const [projectData, setProjectData] = useState([])
    const [deleteProjectCheck, setDeleteProjectCheck] = useState({ state: false, id: "" })
    const [deleteProjectId, setDeleteProjectId] = useState("")

    useEffect(() => {
        const getProjectDataFunc = async () => {
            const data = await getProjectData();
            console.log(data)
            if (!data.error) {
                setProjectData(data.data);
            }
        }
        getProjectDataFunc();
    }, [deleteProjectId, trigger])

    const handleProjectDelete = async (id, imageId) => {
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
                const del = await deleteProjectData(id);
                if (del) {
                    Swal.fire({
                        title: 'Project Deleted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    })
                    setDeleteProjectCheck({ state: false, id: "" });
                    setDeleteProjectId(id);
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error Occured , please try again',
                    icon: 'error',
                    confirmButtonText: 'Close',
                })
                console.log(err)
            })
    }

    const [imageDeleted, setImageDeleted] = useState(false)

    const handleDB = async () => {
        const del = await deleteResearchData(deleteId)
        console.log(del)
        if (del) {
            Swal.fire({
                title: 'Research Deleted!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setDeleteId("")
            setImageDeleted(false)
        }
        else {
            Swal.fire({
                title: 'Error Occured , please try again',
                icon: 'error',
                confirmButtonText: 'Close',
            })
            setImageDeleted(false)
        }
    }

    useEffect(() => {
        if (imageDeleted)
            handleDB();
    }, [imageDeleted])

    const handleResearchDelete = (sliderArray, id) => {
        console.log(sliderArray)
        setDeleteId(id)
        setImageDeleted(false)

        setDeleteCheck({ state: true, id: id })

        sliderArray.map((val) => {

            let dataSend = {
                fileId: val.id,
            }

            fetch(
                'https://script.google.com/macros/s/AKfycbx1ugXthrEUjcI4x2OcdgE0ln3cSvtEhP4jLHWAVKW3Ic63xIsKBZKauC76SbZNBrDa/exec',
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
        })
        Swal.fire({
            title: 'Image Deleted Successfully!',
            icon: 'success',
            confirmButtonText: 'Close',
        })
        setDeleteCheck({ state: false, id: "" })
        setImageDeleted(true);
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
                    <h1>Research Publications</h1>
                    <form onSubmit={handleSubmitResearch} className='row mb-10'>
                        <div className="col-md-6 my-5">
                            <MultiImageUpload imageFunc={handleImageFunc} imageState={imageState} sliderName={"research"} />
                        </div>
                        <div className="col-md-6 my-5">
                            <div className="mb-5">
                                <label className="form-label required">Title</label>
                                <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataResearchChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Content</label>
                                <textarea required className="form-control" rows={7} name='content' value={content} onChange={handleFormDataResearchChange}></textarea>
                            </div>
                            <div className="my-8">
                                <input className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
                                <label className="form-check-label mx-3 required">
                                    Has PDF FIle
                                </label>
                            </div>
                            <div className="mb-5">
                                <PdfUpload pdfFunc={handleBookPDF} pageState={pdfState} disabled={!checkboxValue} formName={"ResearchPDF"} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Link</label>
                                <input required type="text" className="form-control" id="link" name='link' value={link} disabled={checkboxValue ? true : false} onChange={handleFormDataResearchChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={imageState}>{imageState ? "Uploading..." : "Submit"}</button>
                        </div>
                    </form>
                    <div className='my-10'>
                        <h1>Slider (Above Projects Section)</h1>
                        <Slider pageValue='archPage' withForm={false} sliderName={"aboveProjects"} />
                    </div>
                    <div className='my-10'>
                        <h1>Projects Data</h1>
                        <form onSubmit={handleSubmitProject} className="row">
                            <div className="col-md-6">
                                <ImageUpload imageFunc={handleProjectImage} imageState={projectImgState} formName={"projectPage"} />
                            </div>
                            <div className="col-md-6">
                                <div className="mb-5">
                                    <label className="form-label required">Title</label>
                                    <input required type="text" className="form-control" id="projectTitle" name='projectTitle' value={projectTitle} onChange={handleFormDataProjectChange} />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label required">Content</label>
                                    <textarea required className="form-control" rows={7} name='projectContent' value={projectContent} onChange={handleFormDataProjectChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={projectImgState}>{projectImgState ? "Uploading..." : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                    <div className='my-10'>
                        <h1>Client and Collaborations Logo</h1>
                        <Slider pageValue='archPage' withForm={false} sliderName={"clientCollab"} />
                    </div>
                </Tab>
                <Tab eventKey="TableTab" title="View Data" onEnter={() => setTrigger(!trigger)}>
                    <h1>Research Publications</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Link</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {researchData && researchData < 1 ? <tr><td colSpan={6}>No Data</td></tr>
                                    :
                                    researchData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td className='d-flex flex-row gap-4 justify-content-start' style={{ overflow: 'hidden' }}>
                                                {val.sliderImages && val.sliderImages.length < 1 ? <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" /> :
                                                    val.sliderImages.map((val) =>
                                                        <img style={{ width: "80px", display: 'block' }} key={val.id} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Research_Image" />
                                                    )}
                                            </td>
                                            <td>{val.title}</td>
                                            <td>{val.content}</td>
                                            <td><a href={val.hasPDF ? val.pdfFileURL : val.link} target="_blank" rel="noopener noreferrer">link</a></td>
                                            <td>
                                                {deleteCheck.state && deleteCheck.id === val._id ?
                                                    <button className='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleResearchDelete(val.sliderImages[val.sliderImages.length-1].data, val._id)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <h1>Slider 1 (Above Projects)</h1>
                    <SlideShow triggerVal={trigger} slideType={"aboveProjects"} />
                    <h1>Projects</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectData && projectData.length < 1 ? <tr><td>No Data</td></tr> :
                                    projectData.map((val, index) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "80px", height: "50px", display: 'block' }} src={val.imgURL ? `https://drive.google.com/uc?export=view&id=${val.imgURL.substring(32, 65)}` : ""} alt="Team_Image" /></td>
                                            <td>{val.title}</td>
                                            <td>{val.content}</td>
                                            <td>
                                                {deleteProjectCheck.state && deleteProjectCheck.id === val._id ?
                                                    <button className='btn btn-danger btn-sm' type='button' disabled>
                                                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>{' '}
                                                        Deleting...
                                                    </button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleProjectDelete(val._id, val.imgId)}>Delete</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <h1>Client and Collaborations</h1>
                    <SlideShow triggerVal={trigger} slideType={"clientCollab"} />
                </Tab>
            </Tabs>
        </>
    )
}

export default ArchitectureForm;