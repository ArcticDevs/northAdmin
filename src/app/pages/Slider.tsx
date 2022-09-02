/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'
import { KTSVG } from "../../_metronic/helpers"

interface Props {
    imageFunc: (n: string[]) => void,
    withForm: boolean,
    pageValue: string,
    sliderNum: number,
}

const Slider: FC<Props> = ({ imageFunc, withForm, sliderNum }) => {


    const [image, setImage] = useState("");
    const [imageArray, setImageArray] = useState<string[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState("");
    const [createObjectURLArray, setCreateObjectURLArray] = useState<string[]>([]);

    // const [sliderData, setSliderData] = useState({
    //     images: imageArray,
    //     page: "",
    //     sliderNumber: 1,
    // })

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
        setCreateObjectURL("")
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
            <form className='row my-5' onSubmit={handleSliderSubmit}>
                <label htmlFor={`sliderImage${sliderNum}`} className="form-label col-md-6">
                    <div className='d-flex flex-column justify-content-center align-items-center border border-3 border-dark rounded' style={{ height: 'calc(200px + 20vw)', cursor: 'pointer' }}>
                        {createObjectURL === "" ?
                            <>
                                <KTSVG path="/media/icons/duotune/general/gen005.svg" className="svg-icon-muted svg-icon-2hx" />
                                <h3>Click To Add Image</h3>
                            </>
                            :
                            <img style={{ width: "100%", height: "100%", display: 'block' }} src={createObjectURL} alt="upload_Image" />
                        }
                    </div>
                </label>
                <input hidden required type="file" className="form-control my-3" id={`sliderImage${sliderNum}`} name={`sliderImage${sliderNum}`} onChange={handleImage} accept=".png, .jpg, .jpeg" />
                <div className='col-md-6 d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-row flex-wrap justify-content-start'>
                        {createObjectURLArray.map((val, index) =>
                            <img style={{ width: "80px", height: "50px", display: 'block' }} src={val} key={index} alt="upload_Image" />
                        )}
                    </div>
                    <div className='d-flex flex-column align-self-end'>
                        <button type="button" onClick={handleImageArray} className="btn btn-secondary mb-5">Add image to Slider</button>
                        <button type="submit" className="btn btn-primary" style={{ display: "block" }}>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export { Slider }