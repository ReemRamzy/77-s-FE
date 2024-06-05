import React, { useEffect, useState } from 'react';
import axiosInstance from '@/helpers/axios';
import { BASE_URL, API_VERSION } from '@/config';
import Image from 'next/image';
import UploadAndDisplayImage from '@/pages/UploadAndDisplayImage';
import useAuth from '@/contexts/auth.contexts';
import { Modal } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExperSettings = () => {
    const { authUser, loading } = useAuth();
    const [gInfo, setGInfo] = useState({
        sample_designs: []
    });
    const [CatExpr, setCatexpr] = useState([]);
    const [isOpen, setOpen] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tempDesigns, setTempDesigns] = useState([]); // Temporary state for designs

    useEffect(() => {
        if (authUser) {
            axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`)
                .then(response => {
                    setGInfo(response.data);
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        axiosInstance.post(`${BASE_URL}/${API_VERSION}/user/profile/designer/`, {
                            user: authUser.id,
                            sample_designs: []
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            }
                        }).then(response => {
                            setGInfo(response.data);
                        }).catch(createError => {
                            console.error('Error creating designer profile:', createError);
                        });
                    } else {
                        console.error('Error fetching designer profile:', error);
                    }
                });

            axiosInstance.get(`${BASE_URL}/${API_VERSION}/core/categories/`)
                .then(res => {
                    if (res.data.results) {
                        setCatexpr(res.data.results);
                    } else {
                        console.log(res.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, [authUser]);

    const handleClick = (id) => {
        setOpen(isOpen === id ? '' : id);
        setSelectedCategory(id);
    };

    const handleTempAddDesign = () => {
        const newDesign = {
            image: selectedImage,
            title,
            description,
            category: selectedCategory
        };

        setTempDesigns([...tempDesigns, newDesign]);
        handleCloseModal();
    };

    const handleSubmitAll = async () => {
        try {
            await axiosInstance.post(`${BASE_URL}/${API_VERSION}/user/profile/designer/samples/${authUser.id}`, {
                sample_designs: [...gInfo.sample_designs, ...tempDesigns]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setTempDesigns([]);
        } catch (error) {
            console.error('Error submitting all designs:', error);
        }
    };

    const handleShowModal = () => {
        const modal = new Modal(document.getElementById('addDesignModal'));
        modal.show();
    };

    const handleCloseModal = () => {
        const modal = Modal.getInstance(document.getElementById('addDesignModal'));
        modal.hide();
        setSelectedImage(null);
        setTitle('');
        setDescription('');
    };

    if (loading || !authUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-group-sett m-40 mb-172">
            <h1 className="pnew3">Category</h1>
            {CatExpr.map((item) => (
                <div key={item.id} className="fl-col">
                    <div className="fl exp fl-gap33">
                        <div className="expLogo-cont fl-col jst">
                            <img src={`data:image/svg+xml;base64,${item.icon}`} alt="" width={75} height={75} />
                            <p>{item.name}</p>
                        </div>
                        <button onClick={() => handleClick(item.id)}>View designs</button>
                        {isOpen === item.id && (
                            <div className="grycir">
                                <button id="kkkkkk" onClick={() => handleClick(item.id)}>
                                    <Image src="droparrow2.svg" alt="" width={20} height={11.5} />
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleShowModal();
                                setSelectedCategory(item.id);
                            }}
                        >
                            Add Design +
                        </button>
                    </div>
                    <div className={`fl gap2 exp-ex-cont ${isOpen === item.id ? 'flex' : ''}`}>
                        <div className="outofbox">
                            {gInfo.sample_designs.filter(desi => desi.category === item.id).map((desi, index) => (
                                <React.Fragment key={index}>
                                    <p className="pnew" id="approved">{desi.approved ? "Approved" : "Disapproved"}</p>
                                    <div className="exp-ex">
                                        <img width={"160px"} src={`data:image/png;base64,${desi.image}`} />
                                    </div>
                                </React.Fragment>
                            ))}
                            {/* Display temporarily added designs */}
                            {tempDesigns.filter(desi => desi.category === item.id).map((desi, index) => (
                                <React.Fragment key={index}>
                                    <p className="pnew" id="approved">Pending Approval</p>
                                    <div className="exp-ex">
                                        <img width={"160px"} src={URL.createObjectURL(desi.image)} />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div className="profile__submit-button mt-60">
                <button type="button" onClick={handleSubmitAll} className="btn btn-primary">Submit</button>
            </div>
 
        <div className="modal fade" id="addDesignModal" tabIndex="-1" aria-labelledby="addDesignModalLabel" aria-hidden="true" style={{display: 'none'}}>
            <div className="modal-dialog">
                <div className="modal-content" style={{maxWidth: '600px', margin: 'auto'}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="addDesignModalLabel">Add Design</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{textAlign: 'center'}}>
                        <UploadAndDisplayImage
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleTempAddDesign}>Upload Design</button>
                    </div>
                </div>
            </div>
        </div>
                </div>
    );
};

export default ExperSettings;
