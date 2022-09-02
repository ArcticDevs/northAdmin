/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { Slider } from '../Slider'
import { PageTitle } from '../../../_metronic/layout/core'
import { ImageArray } from '../ImageArray'
import { KTSVG } from '../../../_metronic/helpers'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';

const ArchitectureForm: FC = () => {
    const intl = useIntl()

    const [imageArray, setImageArray] = useState<string[]>([]);
    console.log(imageArray)

    const handleImageFunc = (n: any) => {
        setImageArray(n)
    }

    const [image, setImage] = useState("");
    const [createObjectURL, setCreateObjectURL] = useState("");

    const handleImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const initialStateResearch = {
        researchImages: imageArray,
        title: "",
        content: "",
        link: "",
    }
    const initialStateProject = {
        projectImage: image,
        projectTitle: "",
        projectContent: "",
    }

    const [formDataResearch, setFormDataResearch] = useState(initialStateResearch)
    const [formDataProject, setFormDataProject] = useState(initialStateProject)

    const { title, content, link } = formDataResearch;

    const { projectTitle, projectContent } = formDataProject;

    const handleFormDataResearchChange = (e: any) => {
        setFormDataResearch({ ...formDataResearch, [e.target.name]: e.target.value });
    };

    const handleSubmitResearch = (e: any) => {
        e.preventDefault();
        formDataResearch.researchImages = imageArray
        console.log(formDataResearch)
        setFormDataResearch(initialStateResearch)
    };

    const handleFormDataProjectChange = (e: any) => {
        setFormDataProject({ ...formDataProject, [e.target.name]: e.target.value });
    };

    const handleSubmitProject = (e: any) => {
        e.preventDefault();
        formDataProject.projectImage = image
        console.log(formDataProject)
        setFormDataProject(initialStateProject)
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
                    <h1>Research Publications</h1>
                    <form onSubmit={handleSubmitResearch} className='row mb-10'>
                        <div className="col-6 my-5">
                            <ImageArray imageFunc={handleImageFunc} />
                        </div>
                        <div className="col-6 my-5">
                            <div className="mb-5">
                                <label className="form-label required">Title</label>
                                <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataResearchChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Content</label>
                                <textarea required className="form-control" rows={7} name='content' value={content} onChange={handleFormDataResearchChange}></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Link</label>
                                <input required type="text" className="form-control" id="link" name='link' value={link} onChange={handleFormDataResearchChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <div className='my-10'>
                        <h1>Slider (Above Projects Section)</h1>
                        <Slider imageFunc={handleImageFunc} withForm={false} pageValue='architecture' sliderNum={1} />
                    </div>
                    <div className='my-10'>
                        <h1>Projects Data</h1>
                        <form onSubmit={handleSubmitProject} className="row">
                            <label htmlFor='projectImage' className="form-label col-6">
                                <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                                    {createObjectURL === "" ?
                                        <>
                                            <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                                            <h3>Click To Add Project Image</h3>
                                        </>
                                        :
                                        <img style={{ width: "100%", height: "100%", display: 'block' }} src={createObjectURL} alt="upload_Image" />
                                    }
                                </div>
                            </label>
                            {/* <label className="form-label required">Project Image</label> */}
                            <input hidden required type="file" className="form-control" id="projectImage" name="projectImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                            <div className="col-6">
                                <div className="mb-5">
                                    <label className="form-label required">Title</label>
                                    <input required type="text" className="form-control" id="projectTitle" name='projectTitle' value={projectTitle} onChange={handleFormDataProjectChange} />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label required">Content</label>
                                    <textarea required className="form-control" rows={7} name='projectContent' value={projectContent} onChange={handleFormDataProjectChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='my-10'>
                        <h1>Client and Collaborations Logo</h1>
                        {/* <form> */}
                        <Slider imageFunc={handleImageFunc} withForm={false} pageValue='architecture' sliderNum={0} />
                        {/* </form> */}
                    </div>
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
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
                                <tr className='fs-5 border-bottom border-gray-500'>
                                    <td>1</td>
                                    <td><img style={{ width: "80px", height: "50px", display: 'block' }} src="" alt="Team_Image" /></td>
                                    <td>Mark</td>
                                    <td>Core</td>
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
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h1>Slider 1 (Above Projects)</h1>
                    {/* <div className='d-flex flex-row flex-wrap justify-content-start'>
                        {createObjectURLArray.map((val, index) =>
                            <img style={{ width: "80px", height: "50px", display: 'block' }} src={val} key={index} alt="upload_Image" />
                        )}
                    </div> */}
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
                                <tr className='fs-5 border-bottom border-gray-500'>
                                    <td>1</td>
                                    <td><img style={{ width: "80px", height: "50px", display: 'block' }} src="" alt="Team_Image" /></td>
                                    <td>Mark</td>
                                    <td>Core</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h1>Client and Collaborations</h1>
                    {/* <div className='d-flex flex-row flex-wrap justify-content-start'>
                        {createObjectURLArray.map((val, index) =>
                            <img style={{ width: "80px", height: "50px", display: 'block' }} src={val} key={index} alt="upload_Image" />
                        )}
                    </div> */}
                </Tab>
            </Tabs>
        </>
    )
}

export { ArchitectureForm }