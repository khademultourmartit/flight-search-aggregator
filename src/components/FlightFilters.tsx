"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import "../scss/FlightFilter/FlightFilter.scss";
import type {
  FlightFiltersState,
  SortOption,
  StopsFilter,
} from "@/types/flight";

interface FlightFiltersProps {
  airlines: string[];
  filters: FlightFiltersState;
  onFiltersChange: (filters: FlightFiltersState) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration-asc", label: "Duration: shortest first" },
  { value: "departure-asc", label: "Departure: earliest first" },
];

export default function FlightFilters({
  airlines,
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  resultCount,
}: FlightFiltersProps) {
  function toggleAirline(airline: string) {
    const isSelected = filters.airlines.includes(airline);
    const nextAirlines = isSelected
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onFiltersChange({ ...filters, airlines: nextAirlines });
  }

  function handleStopsChange(value: StopsFilter) {
    onFiltersChange({ ...filters, stops: value });
  }

  return (
    <Paper className="flight-filters" sx={{ p: 2.5 }} elevation={1}>
      <Box sx={{ mb: 3 }}>
        <Typography className="flight-showing">
          Showing {resultCount} {resultCount === 1 ? "flight" : "flights"}
        </Typography>
      </Box>

      <TextField
        select
        fullWidth
        size="small"
        label="Sort by"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        sx={{ mb: 3 }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "12px",
                  color: "#222222",
                },
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" sx={{ mb: 1 }} component="h3">
        Stops
      </Typography>
      <RadioGroup
        aria-label="Filter by number of stops"
        value={filters.stops}
        onChange={(e) => handleStopsChange(e.target.value as StopsFilter)}
      >
        <FormControlLabel
          value="any"
          control={<Radio size="small" />}
          label="Any"
        />
        <FormControlLabel
          value="nonstop"
          control={<Radio size="small" />}
          label="Nonstop"
        />
        <FormControlLabel
          value="1stop"
          control={<Radio size="small" />}
          label="1 stop"
        />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ mb: 1 }} component="h3">
        Airlines
      </Typography>
      <FormGroup aria-label="Filter by airline">
        {airlines.map((airline) => (
          <FormControlLabel
            key={airline}
            control={
              <Checkbox
                size="small"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
              />
            }
            label={airline}
          />
        ))}
      </FormGroup>
    </Paper>
  );
}
