import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { deleteImages, getImages } from '../ApiCalls/SliderApiCalls'

const SlideShow = ({ slideType, triggerVal }) => {
    
    const [sliderArray, setSliderArray] = useState({ slider: [], id: "" })
    const [imageDeleted, setImageDeleted] = useState(false)

    useEffect(() => {
        const getSliderImages = async () => {
            const data = await getImages(slideType);
            console.log(data)
            if (!data.error) {
                setSliderArray({ slider: data.data[data.data.length - 1].sliderImages, id: data.data[data.data.length - 1]._id });
            }
        }
        getSliderImages();
    }, [slideType,sliderArray,triggerVal,imageDeleted])

    const handleDB = async () => {
        const del = await deleteImages(sliderArray.id)
        console.log(del)
        if (del) {
            Swal.fire({
                title: 'Image Deleted!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
            setSliderArray({ slider: [], id: "" })
            setImageDeleted(false);
        }
        else {
            Swal.fire({
                title: 'Error Occured , please try again',
                icon: 'error',
                confirmButtonText: 'Close',
            })
            setImageDeleted(false);
        }
    }

    useEffect(() => {
        if (imageDeleted)
            handleDB();
    }, [imageDeleted])

    const handleDelete = () => {

        sliderArray.slider.map((val) => {

            let dataSend = {
                fileId: val.id,
            }

            fetch(
                'https://script.google.com/macros/s/AKfycbx1ugXthrEUjcI4x2OcdgE0ln3cSvtEhP4jLHWAVKW3Ic63xIsKBZKauC76SbZNBrDa/exec',
                {
                    method: 'POST',
                    body: JSON.stringify(dataSend),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => console.log(err))
        })
        setImageDeleted(true);
    }
    return (
        <>
            <div className='d-flex flex-row flex-wrap gap-4 justify-content-start'>
                {sliderArray.slider && sliderArray.slider.length < 1 ? <h3>No Data</h3> :
                    sliderArray.slider.map((val) =>
                        <img style={{ width: "80px", height: "50px", display: 'block' }} key={val.id} src={`https://drive.google.com/uc?export=view&id=${val.url.substring(32, 65)}`} alt="upload_Image" />
                    )
                }
            </div>
            <div className='my-5'>
                <button className='btn btn-icon btn-sm btn-danger p-0' onClick={handleDelete}><i className='bi bi-trash-fill'></i></button>
            </div>
        </>
    )
}

export default SlideShow