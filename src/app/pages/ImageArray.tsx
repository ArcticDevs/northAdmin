/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FC } from 'react'

interface Props {
    imageFunc: (n: string[]) => void,
}

const ImageArray: FC<Props> = ({ imageFunc }) => {


    const [image, setImage] = useState("");
    const [imageArray, setImageArray] = useState<string[]>([]);
    const [createObjectURL, setCreateObjectURL] = useState("");
    const [createObjectURLArray, setCreateObjectURLArray] = useState<string[]>([]);

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
        imageFunc([...imageArray, image]);
    }

    return (
        <>
            <label className="form-label">Images</label>
            <input required type="file" className="form-control my-3" id="sliderImage" name="sliderImage" onChange={handleImage} accept=".png, .jpg, .jpeg" />
            <button type="button" onClick={handleImageArray} className="btn btn-secondary mb-8">Add image to Slider</button>
            <div className='my-10' style={{ display: "flex", flexWrap: "wrap" }}>
                {createObjectURLArray.map((val, index) =>
                    <img style={{ width: "200px", height: "200px", display: 'block' }} src={val} key={index} alt="upload_Image" />
                )}
            </div>
        </>
    )
}

export { ImageArray }