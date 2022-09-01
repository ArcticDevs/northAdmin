/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'

const LibraryForm: FC = () => {
    const intl = useIntl()

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
        bookImage: image,
        title: "",
        author: "",
        year: "",
        link: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { title, author, year, link } = formData;

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.bookImage = image;
        console.log(formData)
        setFormData(initialState)
    };

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <h1>Books Data</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Book Image</label>
                <input required type="file" className="form-control" id="bookImage" name="bookImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                <div className="my-5">
                    <label className="form-label">Book Title</label>
                    <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label">Author</label>
                    <input required type="text" className="form-control" id="author" name='author' value={author} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label">Date/Year</label>
                    <input required type="text" className="form-control" id="year" name='year' value={year} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label">Link</label>
                    <input required type="text" className="form-control" id="link" name='link' value={link} onChange={handleFormDataChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export { LibraryForm }