/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Slider } from '../Slider'

const WorkshopForm: FC = () => {
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

    const initialState = {
        courseImage: image,
        type: "",
        courseTitle: "",
        courseContent: "",
        date: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { courseTitle ,courseContent, date } = formData;

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (e:any) => {
        setFormData({...formData, type: e.target.value})
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
            <h1>Workshop Course Table Data</h1>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <select onChange={handleSelect} className="form-select" aria-label="Default select example" required>
                        <option value="">Select Course Type</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="form-label required">Project Image</label>
                    <input required type="file" className="form-control" id="workshopImage" name="workshopImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                </div>
                <div className="mb-5">
                    <label className="form-label">Course Title</label>
                    <input required type="text" className="form-control" id="courseTitle" name='courseTitle' value={courseTitle} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label">Course Data</label>
                    <textarea required className="form-control" rows={7} id="courseContent" name='courseContent' value={courseContent} onChange={handleFormDataChange}></textarea>
                </div>
                <div className="mb-5">
                    <label className="form-label">Date/Year</label>
                    <input required type="text" className="form-control" id="date" name='date' value={date} onChange={handleFormDataChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='my-10'>
                <h1>Slider</h1>
                <Slider imageFunc={handleImageFunc} withForm={false} pageValue='workshop' sliderNum={1} />
            </div>
        </>
    )
}

export { WorkshopForm }