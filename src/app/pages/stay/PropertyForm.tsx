/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'

const PropertyForm: FC = () => {
    const intl = useIntl()

    const initialState = {
        name: "",
        testimonialContent: "",
        designation: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { name, testimonialContent, designation } = formData;

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

export { PropertyForm }