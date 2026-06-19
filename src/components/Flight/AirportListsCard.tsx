import { Box, Typography } from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "../../scss/flight-search-box/flight-search-box.scss";

export interface Airport {
  id: number;
  airportCode: string;
  airportName: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  airports?: Airport[];
}

const AirportListsCard = ({ airportData, getSuggestedText }: any) => {
  return (
    <Box className="airport-lists-card">
      {airportData?.length > 0 ? (
        airportData.map((item: any) => (
          <Box key={item?.id || item?.airportCode} className="airport-item">
            {/* CITY HEADER */}
            <Box
              className="airport-header"
              onClick={(e) => {
                e.stopPropagation();
                getSuggestedText({ ...item });
              }}
            >
              <Typography className="airport-title">
                <LocationOnOutlinedIcon />
                {item?.cityName}
              </Typography>
              <Typography className="airport-all">All Airport</Typography>
            </Box>

            <hr />

            {item?.airports ? (
              item.airports.map((data: any) => (
                <Box
                  key={data?.id || data?.airportCode}
                  className="airport-subitem"
                  onClick={(e) => {
                    e.stopPropagation();
                    getSuggestedText({ ...data });
                  }}
                >
                  <Box className="airport-code">
                    <span>{data?.airportCode}</span>
                  </Box>

                  <Box className="airport-info">
                    <Typography className="airport-city">
                      {data?.cityName}, {data?.countryName}
                    </Typography>
                    <Typography className="airport-name">
                      {data?.airportName}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                className="airport-subitem"
                onClick={(e) => {
                  e.stopPropagation();
                  getSuggestedText({ ...item });
                }}
              >
                <Box className="airport-code">
                  <span>{item?.airportCode}</span>
                </Box>

                <Box className="airport-info">
                  <Typography className="airport-city">
                    {item?.cityName}, {item?.countryName}
                  </Typography>
                  <Typography className="airport-name">
                    {item?.airportName}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Typography className="not-found">No Result</Typography>
      )}
    </Box>
  );
};

export default AirportListsCard;
