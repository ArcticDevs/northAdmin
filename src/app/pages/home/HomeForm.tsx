/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'

const HomeForm: FC = () => {
    const intl = useIntl()

    const initialState = {
        category: "",
        name: "",
        testimonialContent: "",
        designation: "",
    }

    const [formData, setFormData] = useState(initialState)

    const {name, testimonialContent, designation} = formData;

    const handleSelect = (e:any) => {
        setFormData({...formData, category: e.target.value})
    }

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData)
        setFormData(initialState)
    };

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <h1>Testimonials</h1>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <select onChange={handleSelect} className="form-select" aria-label="Default select example" required>
                        <option value="">Select Category</option>
                        <option value="architecture">Architecture</option>
                        <option value="workshop">Workshop</option>
                        <option value="stay">Stay</option>
                        <option value="experience">Experience</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="form-label required">Name</label>
                    <input required type="text" className="form-control" name='name' id="name" value={name} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label required">Testimonial Content</label>
                    <textarea required className="form-control" rows={7} name='testimonialContent' id='testimonialContent' value={testimonialContent} onChange={handleFormDataChange}></textarea>
                </div>
                <div className="mb-5">
                    <label className="form-label required">Author Designation</label>
                    <input required type="text" className="form-control" value={designation} onChange={handleFormDataChange} id="designation" name='designation' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export { HomeForm }