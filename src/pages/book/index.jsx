import { useLocation, useSearchParams } from "react-router-dom";
import { callDetailBookById } from "../../services/apiNormalUser/apiBook";
import { useEffect, useState } from "react";
import DetailBook from "../../components/DetailBookId";

const BookPage = () => {
    const location = useLocation();
    console.log(location);
    let params = new URLSearchParams(location.search)
    const id = params.get('id');

    const [book, setBook] = useState({});
    const [images, setImages] = useState([])

    const fetchDetailBook = async (id) => {
        const res = await callDetailBookById(id);
        if (res && res.data) {
            setBook(res.data);
            getImages(res.data)
        }
    }

    const createImages = (value) => {
        return `${import.meta.env.VITE_BACKEND_URL}/images/book/${value}`;
    }


    const getImages = (raw) => {
        const images = [];
        if (raw.thumbnail) {
            images.push(
                {
                    original: createImages(raw.thumbnail),
                    thumbnail: createImages(raw.thumbnail),

                }
            )
        }
        if (raw.slider) {
            raw.slider.map(e => {
                images.push(
                    {
                        original: createImages(e),
                        thumbnail: createImages(e),

                    }
                )
            })
        }
        setImages(images)
    }


    useEffect(() => {
        fetchDetailBook(id);
    }, [id])

    return (
        <>
            <DetailBook book={book} images={images} />
        </>
    )
}

export default BookPage;