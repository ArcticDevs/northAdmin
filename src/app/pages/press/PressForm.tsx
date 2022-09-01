/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'

const PressForm: FC = () => {
    const intl = useIntl()

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
        video: checkboxValue,
        pressImage: image,
        title: "",
        content: "",
        article: "",
        date: "",
        pressLink: "",
    }

    const [formData, setFormData] = useState(initialState)

    const { title, content, article, date, pressLink } = formData;

    const handleFormDataChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.video = checkboxValue;
        formData.pressImage = image;
        console.log(formData)
        setFormData(initialState)
    };

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <h1>Press Data</h1>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <input className="form-check-input" type="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} required />
                    <label className="form-check-label mx-3 required">
                        Has Video Link
                    </label>
                </div>
                <div className="mb-5">
                    <label className="form-label required">Video Thumbnail Image</label>
                    <input required type="file" className="form-control" id="pressImage" name="pressImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                </div>
                <div className="mb-5">
                    <label className="form-label required">Title</label>
                    <input required type="text" className="form-control" id="title" name='title' value={title} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label required">Content</label>
                    <textarea required className="form-control" rows={7} id="content" disabled={checkboxValue ? true : false} name='content' value={checkboxValue ? "" : content} onChange={handleFormDataChange}></textarea>
                </div>
                <div className="mb-5">
                    <label className="form-label required">Date</label>
                    <input required type="text" className="form-control" id="date" name='date' value={date} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label required">Article Name</label>
                    <input required type="text" className="form-control" id="article" name='article' value={article} onChange={handleFormDataChange} />
                </div>
                <div className="mb-5">
                    <label className="form-label required">Press News Link</label>
                    <input required type="text" className="form-control" id="pressLink" name='pressLink' value={pressLink} onChange={handleFormDataChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export { PressForm }