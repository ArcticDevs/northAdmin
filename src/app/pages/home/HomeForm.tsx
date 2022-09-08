/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { postTestimonial, getHomeTestimonials, deleteTestimonial } from '../../ApiCalls/TestimonialApiCalls';
import Tab from 'react-bootstrap-v5/lib/Tab';
import Tabs from 'react-bootstrap-v5/lib/Tabs';
import Swal from 'sweetalert2'

const HomeForm: FC = () => {
    const intl = useIntl()

    const initialState = {
        category: "",
        name: "",
        content: "",
        designation: "",
    }

    const [deleteId, setDeleteId] = useState()

    const [formData, setFormData] = useState(initialState)

    const { name, content, designation } = formData;

    const handleSelect = (e: any) => {
        setFormData({ ...formData, category: e.target.value })
    }

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData)
        postTestimonial(formData)
        setFormData(initialState)
    };

    const [testimonialData, setTestimonialData] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getHomeTestimonials();
            if(data)
                setTestimonialData(data);
        }
        getData();
    }, [deleteId])

    const handleDelete = async (id: any) => {
        const del = await deleteTestimonial(id)
        if(del)
        {
            Swal.fire({
                title: 'Testimonial Deleted Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setDeleteId(id);
        }
        else {
            Swal.fire({
                title: 'Error Occured , please try again',
                icon: 'error',
                confirmButtonText: 'Close',
            })
        }
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
                            <textarea required className="form-control" rows={7} name='content' id='content' value={content} onChange={handleFormDataChange}></textarea>
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
                                {testimonialData && testimonialData.length < 1 ? <tr><td colSpan={5} className="text-center">No Data</td></tr> :
                                    testimonialData.map((val: any, index: number) =>
                                        <tr className='fs-5 border-bottom border-gray-500' key={val._id}>
                                            <td>{index + 1}</td>
                                            <td>{val.name}</td>
                                            <td>{val.content}</td>
                                            <td>{val.designation}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(val._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export { HomeForm }