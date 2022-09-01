/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { Slider } from '../Slider'
import { PageTitle } from '../../../_metronic/layout/core'
import { ImageArray } from '../ImageArray'

const ArchitectureForm: FC = () => {
    const intl = useIntl()

    const [imageArray, setImageArray] = useState<string[]>([]);
    console.log(imageArray)

    const handleImageFunc = (n: any) => {
        setImageArray(n)
    }

    const [image, setImage] = useState("");
    // const [createObjectURL, setCreateObjectURL] = useState("");

    const handleImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            // setCreateObjectURL(URL.createObjectURL(i));
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
            <h1>Research Publications</h1>
            <form onSubmit={handleSubmitResearch} className='mb-10'>
                <div className="my-5">
                    <ImageArray imageFunc={handleImageFunc} />
                </div>
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
            </form>
            <div className='my-10'>
                <h1>Slider (Above Projects Section)</h1>
                <Slider imageFunc={handleImageFunc} withForm={false} pageValue='architecture' sliderNum={1} />
            </div>
            <div className='my-10'>
                <h1>Projects Data</h1>
                <form onSubmit={handleSubmitProject}>
                    <label className="form-label required">Project Image</label>
                    <input required type="file" className="form-control" id="projectImage" name="projectImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                    <div className="my-5">
                        <label className="form-label required">Title</label>
                        <input required type="text" className="form-control" id="projectTitle" name='projectTitle' value={projectTitle} onChange={handleFormDataProjectChange} />
                    </div>
                    <div className="mb-5">
                        <label className="form-label required">Content</label>
                        <textarea required className="form-control" rows={7} name='projectContent' value={projectContent} onChange={handleFormDataProjectChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className='my-10'>
                <h1>Client and Collaborations Logo</h1>
                {/* <form> */}
                    <Slider imageFunc={handleImageFunc} withForm={false} pageValue='architecture' sliderNum={0} />
                {/* </form> */}
            </div>
        </>
    )
}

export { ArchitectureForm }