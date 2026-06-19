import Link from "next/link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import type { Flight } from "@/types/flight";
import '../scss/flight-search-box/flight-card.scss'
import seat from "../../public/assests/searchIcon/seat.svg"
import baggage from "../../public/assests/searchIcon/baggage.svg"

import {
  arrivesNextDay,
  formatDuration,
  formatPrice,
  formatTime,
} from "@/utils/format";
import Image from "next/image";
import moment from "moment";
import { TRUE } from "sass";

interface FlightCardProps {
  flight: Flight;
  passengers?: number;
}

export default function FlightCard({ flight, passengers = 1 }: FlightCardProps) {
  const nextDay = arrivesNextDay(flight.departureTime, flight.arrivalTime);
  const stopsLabel =
    flight.stops === 0
      ? "Nonstop"
      : `${flight.stops} stop · ${flight.stopAirports.join(", ")}`;


  function formatDuration(minutes: number): string {
    const duration = moment.duration(minutes, "minutes");
    const totalHours = Math.floor(duration.asHours());
    const remainingMinutes = duration.minutes();
    return `${totalHours}h ${remainingMinutes}m`;
  }

  return (
    <Box
      className="flight-search-card"
    >

      {/* <Paper
      component="article"
      elevation={1}
      aria-label={`${flight.airline} flight ${flight.flightNumber}, ${formatPrice(flight.price, flight.currency)}`}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        transition: "box-shadow 0.15s ease",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={1}>
          <Avatar sx={{ bgcolor: "primary.main", fontSize: "0.8rem" }}>
            {flight.airlineCode}
          </Avatar>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {flight.airline}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {flight.flightNumber} · {flight.cabinClass}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(flight.departureTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.origin}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {formatDuration(flight.durationMinutes)} →
            </Typography>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(flight.arrivalTime)}
                {nextDay && (
                  <Typography component="sup" variant="caption" sx={{ ml: 0.3 }}>
                    +1
                  </Typography>
                )}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.destination}
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label={stopsLabel}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="h6" component="p" color="secondary.dark" sx={{ fontWeight: 700 }}>
            {formatPrice(flight.price, flight.currency)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            per passenger
          </Typography>
        </Grid>

        <Grid item xs={6} sm={2} sx={{ textAlign: { sm: "right" } }}>
          <Button
            component={Link}
            href={`/booking/${flight.id}?passengers=${passengers}`}
            variant="contained"
            color="primary"
            aria-label={`Select ${flight.airline} flight ${flight.flightNumber}`}
          >
            Select
          </Button>
        </Grid>
      </Grid>
    </Paper> */}

      <Grid container rowSpacing={0} columnSpacing={1.5}>
        <Grid item xs={12} md={10}>

          <Box py={1.5}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              display={"flex"}
              alignItems={"center"}
            >

              <Grid item xs={6} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    height: "100%",
                  }}
                >
                  <Box
                    pl={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "35px",
                    }}
                  >

                    <Image
                      width={35}
                      height={35}
                      src={`https://tourmart-assets.s3.ap-south-1.amazonaws.com/airline-logo/${flight?.airlineCode}.png`}
                      alt="flight-icon"

                    />

                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      className="flight-name"
                      sx={{
                        lineHeight: "1.2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {flight?.airline}
                    </Typography>

                    <Typography
                      className="flight-code"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: "1.2",
                      }}
                    >
                      {flight.airlineCode
                      } {' '}-{" "}

                      {flight?.flightNumber}
                    </Typography>
                  </Box>


                </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={2}>
                <Box
                  sx={{
                    textAlign: {
                      xs: "right",
                      sm: "left",
                    },
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <Typography className="search-flight-time">
                    {moment(
                      flight?.departureTime,
                      "HH:mm:ss",
                    ).format("HH:mm")}
                  </Typography>

                  <Typography className="flight-city-name">
                    {
                      flight?.originCity
                    }{" "}
                    (
                    {
                      flight?.origin
                    }
                    )
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={5}>
                <Box className="flight-timeline-wrapper">

                  <Box className="timeline-header">
                    <Typography className="timeline-date-left">
                      <Typography
                        className="timeline-date-left"
                        sx={{
                          fontWeight: 600,
                          display: {
                            xs: "block",
                            sm: "none",
                          },
                        }}
                      >
                        {
                          flight?.originCity
                        }{" "}
                        (
                        {moment(
                          flight?.departureTime,
                          "HH:mm:ss",
                        ).format("HH:mm")}
                        )
                      </Typography>

                      {moment(
                        flight?.departureTime,
                      ).format("ddd, DD MMM")}
                    </Typography>

                    <Typography className="timeline-stop">
                      {flight?.stops === 0
                        ? "DIRECT"
                        : `${flight?.stops} STOPS`}
                    </Typography>

                    <Typography className="timeline-date-right">
                      <Typography
                        className="timeline-date-right"
                        sx={{
                          fontWeight: 600,
                          display: {
                            xs: "block",
                            sm: "none",
                          },
                        }}
                      >
                        {
                          flight?.destinationCity

                        }{" "}
                        (
                        {moment(
                          flight?.arrivalTime,
                          "HH:mm:ss",
                        ).format("HH:mm")}
                        )
                      </Typography>
                      {moment(
                        flight?.arrivalTime,
                      ).format("ddd, DD MMM")}
                    </Typography>


                  </Box>


                  <Box className="flight-timeline-line">
                    <span className="timeline-dot start" />

                    <span

                      className="timeline-dot middle"
                    />

                    <span className="timeline-arrow" />
                  </Box>


                  <Box className="timeline-layover">

                    <Box className="layover-item">
                      <Typography className="layover-text">
                        {formatDuration(flight?.durationMinutes)}
                      </Typography>
                    </Box>
                  </Box>

                </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={2}>
                <Box
                  sx={{
                    textAlign: {
                      xs: "left",
                      sm: "right",
                    },
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <Typography className="search-flight-time">
                    {moment(
                      flight?.arrivalTime,
                      "HH:mm:ss",
                    ).format("HH:mm")}
                  </Typography>

                  <Typography className="flight-city-name">
                    {
                      flight?.destinationCity
                    }{" "}
                    (
                    {
                      flight?.destination
                    }
                    )
                  </Typography>
                </Box>
              </Grid>



            </Grid>
          </Box>

          <Box
            sx={{
              borderTop: "2px solid #c7cacf",
              width: "98%",
              margin: "0 auto",
              marginBottom: "10px",
            }}
          ></Box>

          <Box px={1.5}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <Box

                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}
                  >
                    <button className="flightSeat-btn">
                      <Image
                        src={seat}
                        alt="seat"
                        width={16}
                        height={16}
                      />{" "}
                      <span>
                        {
                          flight?.seatsAvailable
                        }{" "}

                        Seat
                      </span>
                    </button>


                    <button className="flightSeat-btn">
                      <Image
                        src={baggage}
                        alt="baggage"
                        width={16}
                        height={16}
                      />{" "}

                      <span
                        style={{
                          textTransform: "uppercase",
                          paddingLeft: "5px",
                        }}
                      >
                        {
                          flight?.baggageAllowanceKg
                        } {' '} KG
                      </span>
                    </button>




                  </Stack>
                </Box>
              </Grid>


              <Grid item xs={12} sm={6} md={6}>
                <Box

                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}
                  >
                    <button className="refund-btn">
                      {flight?.refundable === true ? (
                        <span className="paritially-refund-btn">
                          Partially Refundable
                        </span>
                      ) : (
                        <span className="non-refundable">
                          Non-Refundable
                        </span>
                      )}
                    </button>
                    <button className="flight-BookHold-btn">
                      {flight?.instantTicketIssueRequired === false
                        ? (
                          <span className="flight-BookHold">
                            Book & Hold
                          </span>
                        ) : (
                          <span className="flight-instantBooking">
                            Instant Ticket
                          </span>
                        )}
                    </button>


                  </Stack>
                </Box>
              </Grid>


            </Grid>


          </Box>

        </Grid>


        <Grid
          item
          xs={12}
          md={2}

        >
          <Box className="price-card">
            <Box
              pb={1}
            >
              <Typography className="flight-price" >
                {formatPrice(flight.price, flight.currency)}
              </Typography>
            </Box>

            <Button
              className="flight-book-button"
              component={Link}
              href={`/booking/${flight.id}?passengers=${passengers}`}

              aria-label={`Select ${flight.airline} flight ${flight.flightNumber}`}
            >
              Book
            </Button>


          </Box>
        </Grid>

      </Grid>


    </Box>
  );
}
