import React, { useState } from "react";
import {
  TextField,
  CircularProgress,
  Avatar,
  Box,
  Typography,
  Paper,
  Checkbox,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetOption } from "../../core/hooks/useGetOption";
import { makeStyles } from "@mui/styles";
import { Character, Option } from "../../core/types/types";

const useStyles = makeStyles({
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#94A3B8",
        borderRadius: "20px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#94A3B8",
      },
    },
  },
  selectedValues: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    padding: "10px",
    borderRadius: "15px",
    backgroundColor: "#E1E8F0",
    marginRight: "3px",
  },
});

const SearchableInput: React.FC = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<Character[]>([]);

  const { data, isLoading, error } = useGetOption(searchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (index: number) => {
    const newValues = [...selectedValues];
    newValues.splice(index, 1);
    setSelectedValues(newValues);
  };

  const boldMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);
    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    );
  };

  return (
    <Autocomplete
      multiple
      options={data?.data?.results || []}
      getOptionLabel={(option: Option) => option.name}
      loading={isLoading}
      value={selectedValues}
      onChange={(e, newValue) => {
        console.log("e", e);
        setSelectedValues(newValue);
      }}
      renderTags={(value: any[], getTagProps: any) =>
        value.map((option: Option, index: number) => (
          <Box
            key={index}
            component="span"
            {...getTagProps({ index })}
            className={classes.selectedValues}
          >
            <Typography variant="body1">{option?.name}</Typography>
            <Box
              sx={{
                borderRadius: "5px",
                backgroundColor: "#94A3B8",
                cursor: "pointer",
              }}
            >
              <ClearIcon
                sx={{ color: "white" }}
                onClick={() => handleDelete(index)}
              />
            </Box>
          </Box>
        ))
      }
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            label=""
            variant="outlined"
            onChange={handleChange}
            className={classes.outlinedInput}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
          {error && (
            <Typography variant="body2" style={{ color: "red" }}>
              Error: Failed to fetch data.
            </Typography>
          )}
        </>
      )}
      renderOption={(props, option, { selected }) => (
        <Box
          component="li"
          {...props}
          sx={{ borderBottom: "1px solid #94A3B8", display: 'flex', alignItems: 'center' }}
        >
          <Checkbox checked={selected || selectedValues.some(value => value.name === option.name)} />
          <Avatar variant="rounded" src={option.image} sx={{ mr: 2 }} />
          <div>
            <Typography variant="body1">
              {boldMatch(option.name, searchTerm)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.episode.length} Episodes
            </Typography>
          </div>
        </Box>
      )}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{ borderRadius: "20px", borderColor: "#94A3B8" }}
        />
      )}
    />
  );
};

export default SearchableInput;
