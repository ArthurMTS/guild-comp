import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setKey, getKey } from "services/localStorage";
import "./styles.scss";

export const Home: React.FC = () => {
  const [apiKey, setApiKey] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getKey()) navigate("/account");
  }, [navigate]);

  const onApiKeyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    setApiKey(value);
  };
  const onSendButtonClick = () => {
    // have to validate the key
    setKey(apiKey);
    navigate("/account");
  };

  return (
    <Box className="pageContainer">
      <Typography>How to get create an API KEY</Typography>
      <Box component="ul">
        <Typography component="li">
          Access the{" "}
          <a
            href="https://www.guildwars2.com/en/"
            target="_blank"
            rel="noreferrer"
          >
            oficial site
          </a>
        </Typography>
        <Typography component="li">Go to ACCOUNT</Typography>
        <Typography component="li">Log in your account</Typography>
        <Typography component="li">Go to the Applications tab</Typography>
        <Typography component="li">Click in New Key</Typography>
        <Typography component="li">Give your key a name and mark all checkboxes</Typography>
        <Typography component="li">Click in CREATE API KEY</Typography>
        <Typography component="li">Copy your key</Typography>
      </Box>

      <Box className="inputWrapper">
        <Typography>Place your API KEY bellow</Typography>
        <TextField
          className="apiKeyInput"
          value={apiKey}
          onChange={onApiKeyInputChange}
          placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        />
        <Button variant="contained" color="primary" onClick={onSendButtonClick}>
          SEND
        </Button>
      </Box>
    </Box>
  );
};
