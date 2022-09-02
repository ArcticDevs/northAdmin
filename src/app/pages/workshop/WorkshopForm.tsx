/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Slider } from '../Slider'
import { KTSVG } from '../../../_metronic/helpers'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';

const WorkshopForm: FC = () => {
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

    const initialState = {
        courseImage: image,
        type: "",
        courseTitle: "",
        courseContent: "",
        date: "",
        courseDay: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { courseTitle, courseContent, date, courseDay } = formData;

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: any) => {
        setFormData({ ...formData, type: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.courseImage = image;
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
                    <h1>Workshop Course Table Data</h1>
                    <form onSubmit={handleSubmit} className="row g-5 mt-5">
                        <div className="col-md-6 mb-5">
                            <label htmlFor='workshopImage' className="form-label w-100">
                                <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                                    {createObjectURL === "" ?
                                        <>
                                            <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                                            <h3>Click To Add Course Image</h3>
                                        </>
                                        :
                                        <img style={{ width: "100%", height: "100%", display: 'block' }} src={createObjectURL} alt="upload_Image" />
                                    }
                                </div>
                            </label>
                            <input hidden required type="file" className="form-control" id="workshopImage" name="workshopImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                        </div>
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
                                <input required type="text" className="form-control" id="courseTitle" name='courseTitle' value={courseTitle} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Course Data</label>
                                <textarea required className="form-control" rows={7} id="courseContent" name='courseContent' value={courseContent} onChange={handleFormDataChange}></textarea>
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Days for Course Completion</label>
                                <input required type="number" className="form-control" id="courseDay" name='courseDay' value={courseDay} onChange={handleFormDataChange} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label required">Date/Year</label>
                                <input required type="text" className="form-control" id="date" name='date' value={date} onChange={handleFormDataChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <div className='my-10'>
                        <h1>Slider</h1>
                        <Slider imageFunc={handleImageFunc} withForm={false} pageValue='workshop' sliderNum={1} />
                    </div>
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
                    <h1>Press Data</h1>
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
                                <tr className='fs-5 border-bottom border-gray-500'>
                                    <td>1</td>
                                    <td><img style={{ width: "80px", height: "50px", display: 'block' }} src="" alt="Team_Image" /></td>
                                    <td>Mark</td>
                                    <td>Core</td>
                                    <td>Intern</td>
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
                </Tab>
            </Tabs>
        </>
    )
}

export { WorkshopForm }