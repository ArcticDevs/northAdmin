/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Slider } from '../Slider'

const AboutForm: FC = () => {
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

    const handleSelect = (e: any) => {
        setFormData({ ...formData, category: e.target.value })
    }

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.defaultTeamImage = checkboxValue;
        console.log(formData)
        setFormData(initialState)
    };

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <div className='mb-10'>
                <h1>Slider 1 (Above Vision Section)</h1>
                <Slider pageValue='about' sliderNum={1} withForm={false} imageFunc={handleImageFunc} />
            </div>
            <div className='mb-10'>
                <h1>Slider 2 (After Recognitions Table)</h1>
                <Slider pageValue='about' sliderNum={2} withForm={false} imageFunc={handleImageFunc} />
            </div>
            <h1>Teams Data</h1>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
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
                    <label className="form-label required">Team Image</label>
                    <input required type="file" className="form-control" id="image" name="teamImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                    <div className='my-5'>
                        <img style={{ width: "200px", height: "200px", display: 'block', borderRadius: '400px',objectFit: 'cover' }} src={createObjectURL} alt="upload_Image" />
                    </div>
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
            </form>
        </>
    )
}

export { AboutForm }