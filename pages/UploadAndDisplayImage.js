import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const UploadAndDisplayImage = ({ selectedImage, setSelectedImage, title, setTitle, description, setDescription, handleAddDesign }) => {
  const router = useRouter();
 
  return (
        <div className="max3">
            <div style={{ height: "779.06px", display: "flex", width: "100%" }}>
                {selectedImage ? (
                    <div style={{ width: "70%", margin: "auto" }}>
                        <Image
                            alt="not found"
                            width={250}
                            height={250}
                            style={{ width: "90%", height: "90%" }}
                            src={URL.createObjectURL(selectedImage)}
                        />
                    </div>
                ) : (
                    <div style={{ width: "70%", margin: "auto" }}>
                        <input
                            type="file"
                            placeholder="Drag and drop to upload or click to browse to choose a file"
                            name="myImage"
                            className="inputfileupload"
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </div>
                )}
                <div style={{ width: "30%", height: "100%", display: "flex", flexDirection: "column", margin: "auto" }}>
                    <h3>Upload Sample</h3>
                    <div>
                        {/* {selectedImage && (
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                        )} */}
                        <div style={{ display: "flex", flexDirection: "column", margin: "30px 0" }}>
                            <label style={{ fontSize: "18px", color: "#3d3d3d" }}>Design Title</label>
                            <span style={{ fontSize: "14px", margin: "10px 0" }}>Choose a concise title for your design</span>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Design Title"
                                className="input-filed2"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", margin: "30px 0" }}>
                            <label style={{ fontSize: "18px", color: "#3d3d3d" }}>Description</label>
                            <span style={{ fontSize: "14px", margin: "10px 0" }}>A brief description of the design</span>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                placeholder="Description"
                                className="input-filed2"
                            />
                        </div>
                        {/* <button
                            onClick={handleAddDesign}
                            className="btn btn-primary"
                            style={{ marginTop: "20px" }}
                        >
                            Upload Design
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadAndDisplayImage;
