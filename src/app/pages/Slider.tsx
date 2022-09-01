/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'

interface Props {
    imageFunc: (n: string[]) => void,
    withForm: boolean,
    pageValue: string,
    sliderNum: number,
}

const Slider: FC<Props> = ({ imageFunc, withForm }) => {

    
    const [image, setImage] = useState("");
    const [imageArray, setImageArray] = useState<string[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState("");
    const [createObjectURLArray, setCreateObjectURLArray] = useState<string[]>([]);
    
    const [sliderData,setSliderData] = useState({
        images: imageArray,
        page: "",
        sliderNumber:1,
    })

    const handleImage = (event: any) => {
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const handleImageArray = () => {
        setImageArray([...imageArray, image])
        setCreateObjectURLArray([...createObjectURLArray, createObjectURL]);
    }

    const handleSliderSubmit = (e: any) => {
        e.preventDefault();
        imageFunc(imageArray)
        // console.log(imageArray)
        setImage("")
        setImageArray([])
        setCreateObjectURL("")
        setCreateObjectURLArray([])
    }

    return (
        <>
            <form onSubmit={handleSliderSubmit}>
                <label className="form-label">Images</label>
                <input required type="file" className="form-control my-3" id="sliderImage" name="sliderImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
                <button type="button" onClick={handleImageArray} className="btn btn-secondary mb-8">Add image to Slider</button>
                <button type="submit" className="btn btn-primary" style={{ display: "block" }}>Submit</button>
            </form>
            <div className='my-10' style={{ display: "flex", flexWrap: "wrap" }}>
                {createObjectURLArray.map((val, index) =>
                    <img style={{ width: "200px", height: "200px", display: 'block' }} src={val} key={index} alt="upload_Image" />
                )}
            </div>
        </>
    )
}

export { Slider }