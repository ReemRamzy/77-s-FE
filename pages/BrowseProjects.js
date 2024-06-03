import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Footer2 from "@/components/footer2";
import Link from "next/link";
import { BASE_URL, API_VERSION } from "@/config";
import {
  Logoidentity,
  Webdesign,
  ClothingMerchandise,
  ArtIllustration,
  Businessadvertising,
  industriesMenu,
} from "../components/consts";

// const BrowseProjects = () => {
//   const [AllIndustries, setAllIndustries] = useState("Industries");
//   const [IndustriesisOpen, setIndustriesOpen] = useState(false);
//   const [ProjectItems, setProjectItems] = useState([]);

  // useEffect(() => {
  //   fetch(`${BASE_URL}/${API_VERSION}/project/`, {})
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setProjectItems(data.results);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);


  const BrowseProjects = () => {
    const [isOpen, setOpen] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [categories, setCategories] = useState([]);
  
    const [selectedIndustry, setSelectedIndustry] = useState("Industries");
    const [isIndustryOpen, setIndustryOpen] = useState(false);
  
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [isCategoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${API_VERSION}/project/`);
        setListItems(response.data.results);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
  
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${API_VERSION}/core/industries/`);
        if (Array.isArray(response.data.results)) {
          setIndustries(response.data.results);
        } else {
          console.error("Industries data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${API_VERSION}/core/categories/`);
        if (Array.isArray(response.data.results)) {
          setCategories(response.data.results);
        } else {
          console.error("Categories data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchProjects();
    fetchIndustries();
    fetchCategories();
  }, []);





const handleIndustryClick = (item) => {
    setSelectedIndustry(item);
    setIndustryOpen(!isIndustryOpen);
  };

  const handleCategoryClick = (item) => {
    setSelectedCategory(item);
    setCategoryOpen(!isCategoryOpen);
  };

  const sortedIndustries = [...industries].sort((a, b) =>
    a.label > b.label ? 1 : -1
  );


  return (
    <div className="ProfilePage">
      <Navbar />

      <div className="mainscr  ">
        <div className=" w-101 pt-175 max">
          <div className=" ">
            <div className="disc-head2 " id="cyan">
              <h1>Browse Projects</h1>
            </div>
            <div className="">
              <div className="bgf5 fl h342 jst-SB">
                <div className="w-80 fl-col fl-gap32">
                  <div className=" disc-fil2 firstline">
                    <div className="head-w">
                      <div
                        style={{ width: "320px" }}
                        className="filter2 prel"
                        id="filter3"
                        onClick={() => {
                          setCategoryOpen(!isCategoryOpen);
                          setIndustryOpen(false);
                        }}
                      >
                        <p>{selectedCategory}</p>
                        <div
                      style={{ width: "320px" }}
                      className={`SelectMenu ${isCategoryOpen ? "" : "DN"}`}
                      onClick={() => setCategoryOpen(true)}
                    >
                          <ul>
                          {categories.map((category) => (
                          <CategoryButton
                            key={category.id}
                            category={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                            subCategories={category.subCategories} // assuming categories have subCategories
                          />
                        ))}
                          </ul>
                        </div>
                      </div>
            
                    <div
                      style={{ width: "320px" }}
                      className="filter2 prel"
                      id="filter3"
                      onClick={() => setIndustryOpen(!isIndustryOpen)}
                    >
                      <p>{selectedIndustry}</p>
                      <div
                        style={{ width: "320px" }}
                        className={`SelectMenu ${isIndustryOpen ? "" : "DN"}`}
                      >
                        <ul>
                          {sortedIndustries.map((industry) => (
                            <button key={industry.id} onClick={() => handleIndustryClick(industry.name)}>
                              {industry.name}
                            </button>
                          ))}
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="fl  mb-30">
                    <div className="secline fl fl-gap99 head-w2 BC">
                      <div className="">
                        <p className="cont-p2">Contest level</p>
                        <div className="fl-col">
                          <div className="fl fl-gap10 ">
                            <input
                              type="radio"
                              id="remember"
                              name="accounttype"
                            />
                            <label htmlFor="remember">Entry</label>
                          </div>
                          <div className="fl fl-gap10">
                            <input
                              type="radio"
                              id="remember2"
                              name="accounttype"
                            />
                            <label htmlFor="remember2">Mid</label>
                          </div>
                          <div className="fl fl-gap10">
                            <input
                              type="radio"
                              id="remember3"
                              name="accounttype"
                            />
                            <label htmlFor="remember3">Advance</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p className="cont-p ">Contest types</p>

                      <div className="cont-types fl jst-SB p22">
                        <div className="fl-col fl-gap99  jst">
                          <div className="fl fl-gap99 jst">
                            <input
                              type="checkbox"
                              id="Guaranteed"
                              name="accounttype"
                            />
                            <Image
                              src="dollar.svg"
                              width={30.85}
                              height={30.85}
                              alt=""
                            />
                          </div>

                          <label htmlFor="Guaranteed">Guaranteed</label>
                        </div>
                        <div className="fl-col fl-gap99 jst">
                          <div className="fl fl-gap99 jst">
                            <input
                              type="checkbox"
                              id="Urgent"
                              name="accounttype"
                            />
                            <Image
                              src="clock.svg"
                              width={26.31}
                              height={33}
                              alt=""
                            />
                          </div>

                          <label htmlFor="Urgent"> Urgent</label>
                        </div>
                        <div className="fl-col fl-gap99 jst">
                          <div className="fl fl-gap99 jst">
                            <input
                              type="checkbox"
                              id="NDA"
                              name="accounttype"
                            />
                            <Image
                              src="vector2.svg"
                              width={25}
                              height={30}
                              alt=""
                            />
                          </div>

                          <label htmlFor="NDA"> NDA</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="header-w30 fl-col fl-gap32 gap15 ali-cen mb-30">
                  <div className="BC-search">
                    <input />
                  </div>

                  <div className="w192">
                    <p className="PL-p">Price</p>
                    <div className="fl jst-SB prInp">
                      <div className="fl fl-gap98 ">
                        <input
                          type="text"
                          id="remember"
                          name="accounttype"
                          placeholder="Min"
                        />
                      </div>
                      <div className="fl fl-gap98">
                        <input
                          type="text"
                          id="remember2"
                          name="accounttype"
                          placeholder="Max"
                        />
                      </div>{" "}
                    </div>
                  </div>

                  <div className="BC-search">
                    <select>
                      <option>Newest first</option>
                      <option>oldest first</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-t20 ">
              <div>
                <div className="w-101">
                  {listItems.map((item) => (
                    <div key={item.id} className="disc-card-Proj">
                         <Link href="#">
                    <h3> { item.name } </h3>
                    <p> { item.description } </p>
                    <div> <span> <h4> Reference:  </h4>  { item.reference } </span> </div>
                    <Image src={item.img} alt="" width={783} height={147} />
                  </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
      <Footer />
    </div>
  );
};

const CategoryButton = ({ category, onClick, subCategories }) => (
  <>
    <button className="CatH4" onClick={onClick}>
      {category}
    </button>
    {subCategories && subCategories.map((item) => (
      <button key={item.id} onClick={() => onClick(item.name)}>
        {item.name}
      </button>
    ))}
  </>
);

export default BrowseProjects;
