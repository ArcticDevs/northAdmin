/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';

const PropertyForm = () => {
    const intl = useIntl()

    const initialState = {
        name: "",
        testimonialContent: "",
        designation: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { name, testimonialContent, designation } = formData;

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                </Tab>
                <Tab eventKey="TableTab" title="View Data">
                    <h1>Testimonials Table</h1>
                    <div className="table-responsive mt-5">
                        <table className="table table-hover table-rounded table-striped border gy-7 gs-7 border-gray-500">
                            <thead>
                                <tr className='fs-3 fw-bold border-bottom-2'>
                                    <th>S.NO</th>
                                    <th>Name</th>
                                    <th>Testimonial Content</th>
                                    <th>Designation/Caption</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='fs-5 border-bottom border-gray-500'>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
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

export default PropertyForm;