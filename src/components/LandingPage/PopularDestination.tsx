"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import moment from "moment";

import offer1 from "../../../public/assests/destinationOffer/destination1.png";
import offer2 from "../../../public/assests/destinationOffer/destination2.png";
import offer3 from "../../../public/assests/destinationOffer/destination3.png";
import offer4 from "../../../public/assests/destinationOffer/destination4.png";
import "../../scss/home-page/home-page.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const PopularDestination = () => {
  const router = useRouter();

  const offers = [
    {
      id: 1,
      name: "Cox's Bazar",
      price: 8000,
      currency: "BDT",
      image: offer1,
      origin: "DAC",
      originCityName: "Dhaka",
      originAirportName: "Hazrat Shahjalal International Airport",
      destination: "CXB",
      destinationCityName: "Cox's Bazar",
      destinationAirportName: "Cox's Bazar Airport",
    },
    {
      id: 2,
      name: "Dubai",
      price: 45000,
      currency: "BDT",
      image: offer2,
      origin: "DAC",
      originCityName: "Dhaka",
      originAirportName: "Hazrat Shahjalal International Airport",
      destination: "DXB",
      destinationCityName: "Dubai",
      destinationAirportName: "Dubai International Airport",
    },
    {
      id: 3,
      name: "Bangkok",
      price: 38000,
      currency: "BDT",
      image: offer3,
      origin: "DAC",
      originCityName: "Dhaka",
      originAirportName: "Hazrat Shahjalal International Airport",
      destination: "BKK",
      destinationCityName: "Bangkok",
      destinationAirportName: "Suvarnabhumi Airport",
    },
    {
      id: 4,
      name: "Saidpur",
      price: 6000,
      currency: "BDT",
      image: offer4,
      origin: "DAC",
      originCityName: "Dhaka",
      originAirportName: "Hazrat Shahjalal International Airport",
      destination: "SPD",
      destinationCityName: "Saidpur",
      destinationAirportName: "Saidpur Airport",
    },
  ];

  const handleSearch = async (offer: any) => {
    try {
      const date = moment().add(7, "days").format("YYYY-MM-DD");

      const params = new URLSearchParams({
        origin: offer.origin,
        originCityName: offer.originCityName || "",
        originAirportName: offer.originAirportName || "",

        destination: offer.destination,
        destinationCityName: offer.destinationCityName || "",
        destinationAirportName: offer.destinationAirportName || "",

        date: date,
        passengers: "1",
        adt: "1",
        chd: "0",
        inf: "0",
      });

      router.push(`/search?${params.toString()}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ mx: { xs: 2, md: 0 }, mt: 4 }}>
      <Typography className="home-page-popular-destination-title">
        Popular{" "}
        <span className="home-page-popular-destination-title-bold">
          Destinations
        </span>
      </Typography>

      <Box
        sx={{
          ".slick-slide > div": { margin: "0 10px" },
          ".slick-list": { margin: "0 -10px" },
        }}
      >
        <Slider {...settings}>
          {offers.map((offer) => (
            <Box
              key={offer.id}
              className="popular-destination-card"
              onClick={() => handleSearch(offer)}
              sx={{ cursor: "pointer" }}
            >
              <Box component="img" src={offer.image.src} alt={offer.name} />

              <Box className="popular-destination-content">
                <Typography component="h4">{offer.name}</Typography>
                <Typography component="p">{offer.price} BDT</Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default PopularDestination;
